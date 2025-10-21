import axios from 'axios';
import * as cheerio from 'cheerio';
import { writeFileSync } from 'fs';

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

// Lista de produtos para extrair - categoria health-wellness for-her
const products = [
  {
    url: 'https://www.amazon.ca/CeraVe-Salicylic-Cleanser-Exfoliating-Fragrance/dp/B08PR8YSBT?tag=callinow-20',
    name: 'cerave-salicylic-cleanser'
  },
  {
    url: 'https://www.amazon.ca/Italian-Skincare-Hydrating-Truffles-100ml/dp/B0BFQ9RD5B?tag=callinow-20',
    name: 'italian-skincare-truffles'
  },
  {
    url: 'https://www.amazon.ca/Under-Eye-Mask-Undereye-Cruelty-Free/dp/B014E2D6BY?tag=callinow-20',
    name: 'under-eye-mask'
  },
  {
    url: 'https://www.amazon.ca/Neutrogena-Makeup-Remover-Cleansing-Alcohol/dp/B01NBL6TV9?tag=callinow-20',
    name: 'neutrogena-makeup-remover'
  },
  {
    url: 'https://www.amazon.ca/Laneige-2019-Renewal-Sleeping-Berry/dp/B07XXPHQZK?tag=callinow-20',
    name: 'laneige-sleeping-mask'
  }
];

async function extractAmazonProduct(url, productName) {
  try {
    console.log(`Extraindo informações do produto: ${productName}...`);

    const response = await axios.get(url, {
      headers: {
        'User-Agent': USER_AGENT,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-CA,en-US;q=0.9,en;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
      },
      timeout: 15000,
    });

    const $ = cheerio.load(response.data);
    const productInfo = {};

    // Título do produto
    productInfo.title = $('#productTitle').text().trim() ||
                       $('#title').text().trim() ||
                       $('h1').first().text().trim();

    // Preço
    const priceSelectors = [
      '.a-price .a-offscreen',
      '#priceblock_ourprice',
      '#priceblock_saleprice',
      '.a-color-price',
      '#corePrice_feature_div .a-offscreen'
    ];

    for (const selector of priceSelectors) {
      const price = $(selector).first().text().trim();
      if (price) {
        productInfo.price = price;
        break;
      }
    }

    // Classificação e número de reviews
    const ratingText = $('.a-icon-star .a-size-medium').text() ||
                       $('.a-star-medium').text() ||
                       $('[data-cy="reviews-summary"]').find('.a-label').text();

    if (ratingText) {
      const ratingMatch = ratingText.match(/(\d+(?:\.\d+)?)/);
      if (ratingMatch) {
        productInfo.rating = ratingMatch[1];
      }
    }

    const reviewCount = $('#acrCustomerReviewText').text() ||
                        $('.a-size-base .a-link-normal').text() ||
                        $('[data-cy="reviews-summary"]').find('.a-size-base').text();

    if (reviewCount) {
      productInfo.reviewCount = reviewCount.replace(/[^\d,]/g, '');
    }

    // Descrição do produto (bullet points)
    productInfo.bulletPoints = [];
    $('#feature-bullets ul li, .a-list-item').each((i, el) => {
      const point = $(el).text().trim();
      if (point) {
        productInfo.bulletPoints.push(point);
      }
    });

    // Descrição detalhada
    productInfo.description = $('#productDescription').text().trim() ||
                             $('#aplus, #feature-bullets').text().trim().substring(0, 1000);

    // Imagens do produto
    productInfo.images = [];
    $('#imgTagWrapperId img, #altImages img, .a-dynamic-image').each((i, el) => {
      const src = $(el).attr('src') || $(el).attr('data-old-hires') || $(el).attr('data-a-dynamic-image');
      if (src && !src.includes('transparent-pixel')) {
        let imageUrl = src;
        if (src.includes('._AC_')) {
          imageUrl = src.replace(/\._AC_[^.]*/, '._AC_SL1500_');
        }
        productInfo.images.push(imageUrl);
      }
    });

    // Remover duplicatas de imagens
    productInfo.images = [...new Set(productInfo.images)].slice(0, 10);

    // ASIN
    const asinMatch = url.match(/\/dp\/([A-Z0-9]{10})/);
    if (asinMatch) {
      productInfo.asin = asinMatch[1];
    }

    // Marca
    productInfo.brand = $('#bylineInfo').text().trim() ||
                       $('#brand').text().trim();

    // Data da extração
    productInfo.extractedAt = new Date().toISOString();
    productInfo.sourceUrl = url;

    return productInfo;

  } catch (error) {
    console.error(`Erro ao extrair produto ${productName}:`, error.message);
    return {
      error: error.message,
      url,
      productName,
      extractedAt: new Date().toISOString()
    };
  }
}

async function extractAllProducts() {
  console.log('Iniciando extração de produtos da categoria Health & Wellness for Her...\n');

  const results = {};

  for (const product of products) {
    try {
      const productInfo = await extractAmazonProduct(product.url, product.name);

      // Salvar resultado individual
      const filename = `${product.name}-result.json`;
      writeFileSync(filename, JSON.stringify(productInfo, null, 2), 'utf8');

      results[product.name] = productInfo;

      console.log(`✅ Produto ${product.name} extraído com sucesso\n`);

      // Aguardar 2 segundos entre requisições para evitar bloqueio
      await new Promise(resolve => setTimeout(resolve, 2000));

    } catch (error) {
      console.error(`❌ Erro ao processar produto ${product.name}:`, error.message);
      results[product.name] = {
        error: error.message,
        url: product.url,
        extractedAt: new Date().toISOString()
      };
    }
  }

  // Salvar resultados consolidados
  writeFileSync('health-wellness-products-results.json', JSON.stringify(results, null, 2), 'utf8');

  console.log('\n=== EXTRAÇÃO CONCLUÍDA ===');
  console.log('Arquivos salvos:');
  products.forEach(product => {
    console.log(`- ${product.name}-result.json`);
  });
  console.log('- health-wellness-products-results.json');

  return results;
}

// Executar extração
extractAllProducts().catch(console.error);
