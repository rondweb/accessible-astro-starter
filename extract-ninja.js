import axios from 'axios';
import * as cheerio from 'cheerio';
import { writeFileSync } from 'fs';

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const extractNinjaProduct = async () => {
  const url = 'https://www.amazon.ca/Ninja-DZ550-Independent-Thermometer-Dehydrate/dp/B0B15Q3HCQ';

  try {
    console.log('Extraindo informações do produto...', url);

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
        // Converter para URL de alta qualidade se necessário
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

    const result = JSON.stringify(productInfo, null, 2);

    // Escrever no arquivo
    writeFileSync('ninja-product-result.json', result, 'utf8');

    console.log('Extração concluída! Dados salvos em ninja-product-result.json');
    console.log('\n=== INFORMAÇÕES EXTRAÍDAS ===');
    console.log(result);

    return productInfo;

  } catch (error) {
    console.error('Erro ao extrair produto:', error.message);
    const errorInfo = {
      error: error.message,
      url,
      extractedAt: new Date().toISOString()
    };
    writeFileSync('ninja-product-result.json', JSON.stringify(errorInfo, null, 2), 'utf8');
    throw error;
  }
};

// Executar extração
extractNinjaProduct().catch(console.error);
