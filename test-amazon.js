import axios from 'axios';
import * as cheerio from 'cheerio';

const testAmazonUrl = async () => {
  try {
    const url = 'https://www.amazon.ca/Ninja-DZ550-Independent-Thermometer-Dehydrate/dp/B0B15Q3HCQ';
    console.log('Testando URL:', url);

    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-CA,en-US;q=0.9,en;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      },
      timeout: 15000,
    });

    console.log('Status:', response.status);
    console.log('Content-Type:', response.headers['content-type']);
    console.log('Content Length:', response.data.length);

    const $ = cheerio.load(response.data);

    console.log('\n=== ANÁLISE DO CONTEÚDO ===');

    // Verificar título da página
    const title = $('title').text();
    console.log('Título da página:', title);

    // Verificar se é uma página de produto ou de erro
    if (response.data.includes('Sorry, we just need to make sure you')) {
      console.log('❌ Amazon está bloqueando - página de captcha');
    } else if (response.data.includes('temporarily unavailable')) {
      console.log('❌ Produto temporariamente indisponível');
    } else if (response.data.includes('Ninja')) {
      console.log('✓ Página contém "Ninja"');
    }

    // Procurar por elementos específicos
    const productTitle = $('#productTitle').text();
    if (productTitle) {
      console.log('✓ Título do produto encontrado:', productTitle.trim());
    } else {
      console.log('✗ Título do produto não encontrado');
    }

    const price = $('.a-price .a-offscreen').first().text();
    if (price) {
      console.log('✓ Preço encontrado:', price);
    } else {
      console.log('✗ Preço não encontrado');
    }

    console.log('\n=== PRIMEIRAS LINHAS DO HTML ===');
    const lines = response.data.split('\n').slice(0, 20);
    lines.forEach((line, i) => {
      if (line.trim()) console.log(`${i + 1}: ${line.trim()}`);
    });

  } catch (error) {
    console.error('Erro:', error.message);
    if (error.response) {
      console.log('Status de erro:', error.response.status);
      console.log('Headers de erro:', error.response.headers);
    }
  }
};

testAmazonUrl();
