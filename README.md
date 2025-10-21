# Accessible Astro Starter - E-commerce Project

A fully accessible, modern e-commerce website built with Astro, featuring product categories, reviews, and an organized image management system.

## 📋 Table of Contents

- [🏠 Project Overview](#-project-overview)
- [🏗️ Architecture](#️-architecture)
- [📦 Product Categories](#-product-categories)
- [🖼️ Image Management](#️-image-management)
- [🧩 Components](#-components)
- [🚀 Getting Started](#-getting-started)
- [📖 Development Guide](#-development-guide)
- [🔧 Contributing](#-contributing)

## 🏠 Project Overview

This project is a modern e-commerce website showcasing:

- **Accessible by default** - WCAG 2.2 AA compliant
- **Product reviews** with detailed analysis
- **Category organization** for easy browsing
- **Responsive design** for all devices
- **Dark mode support** with elegant transitions
- **SEO optimized** with proper meta tags

### 🚀 Recent Improvements

**✅ Custom URL System**: URLs now use product names instead of IDs
- **Before**: `/product/home-garden-2`
- **After**: `/category/home-garden/product/ninja-foodi-10-qt-6-in-1-dualzone-smart-xl-air-fryer`

**✅ Enhanced Product Presentation**:
- Improved spacing and typography
- Better image positioning
- Enhanced visual hierarchy
- Professional product details section

**✅ Improved Navigation**:
- Clean breadcrumb navigation
- Consistent link structure across all pages
- Better category organization

### ✨ Key Features

- **Product Categories**: Electronics, Fashion, Sports & Fitness, Home & Garden
- **Image Carousel**: Interactive product galleries with autoplay
- **Content Collections**: MDX-based product reviews
- **Component Library**: Reusable accessible components
- **Asset Optimization**: Organized image management
- **Custom URL Slugs**: SEO-friendly URLs based on product names
- **Breadcrumb Navigation**: Clear site navigation structure
- **Responsive Design**: Optimized for all devices

## 🏗️ Architecture

```
accessible-astro-starter/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images and styles
│   │   └── images/
│   │       ├── posts/    # Blog post images
│   │       ├── projects/ # Portfolio images
│   │       └── products/ # Product images
│   ├── components/       # Reusable components
│   ├── content/          # MDX content collections
│   │   ├── products/     # Product reviews
│   │   └── projects/     # Portfolio items
│   ├── layouts/          # Page layouts
│   ├── pages/            # Routes and pages
│   └── styles/           # Global styles
└── README.md
```

## 📦 Product Categories

The website features a comprehensive product catalog organized into categories:

### 🏷️ Available Categories

| Category | Products | Description | Route |
|----------|----------|-------------|-------|
| **Electronics** | 2 products | Smartphones, accessories, gadgets | `/categories/electronics` |
| **Fashion** | 1 product | Clothing, shoes, accessories | `/categories/fashion` |
| **Sports** | 3 products | Sports equipment, outdoor gear | `/categories/sports` |

### 📝 Product Structure

Each product includes:
- **Title** and description
- **Price** and affiliate links
- **Category** classification
- **Tags** for filtering
- **Detailed review** content
- **Organized images**

## 🖼️ Image Management

Comprehensive image organization system with carousel support.

### 🎯 Features

- **Multiple Image Support**: Products can have single or multiple images
- **Carousel Mode**: Interactive slideshow for multiple images
- **Fallback Handling**: Beautiful placeholder when no image exists
- **Responsive Design**: Optimized for all screen sizes

### 📁 Image Structure

```
src/assets/images/products/
├── yeti-rambler-tumbler.webp      # Main product image
├── yeti-rambler-tumbler-2.webp    # Alternative view
├── yeti-rambler-tumbler-3.webp    # Additional angle
├── black-diamond-headlamp.webp     # Single product image
└── README.md                       # Image documentation
```

### 🚀 Usage Examples

```astro
<!-- Single Image -->
<ProductImages
  productSlug="black-diamond-headlamp"
  alt="Black Diamond Spot 400 Headlamp"
/>

<!-- Carousel Mode -->
<ProductImages
  productSlug="yeti-rambler-tumbler"
  alt="Yeti Rambler 20 oz Tumbler"
  showCarousel={true}
  autoplay={true}
/>
```

### 📷 Supported Image Formats

| Format | Extension | Best For | Browser Support |
|--------|-----------|----------|-----------------|
| **WebP** | `.webp` | ✅ **Recommended** - Best compression | Modern browsers |
| **PNG** | `.png` | Transparency, logos | Universal |
| **JPEG** | `.jpg`, `.jpeg` | Photos, complex images | Universal |
| **AVIF** | `.avif` | Future standard, excellent compression | Modern browsers |
| **SVG** | `.svg` | Icons, vector graphics | Universal |

> 💡 **Recomendação:** Use **WebP** como formato principal para melhor compressão e qualidade.

📖 **[Detailed Image Documentation →](src/assets/images/products/README.md)**

### 🎨 Image Demo Page

- **[Product Images Demo](src/pages/image-demo.astro)** - Interactive demonstration of all image modes
- **[Categories Index](src/pages/categories/index.astro)** - Browse all product categories
- **[Product Details Template](src/pages/product/[...slug].astro)** - Individual product pages

## 🧩 Components

### Core Components

| Component | Purpose | Features |
|-----------|---------|----------|
| **ProductImages** | Image display | Carousel, single, fallback modes |
| **ProductGallery** | Product grid | Uses organized images |
| **PageHeader** | Page titles | Consistent styling |
| **Card** | Content cards | Accessible, responsive |

### 🚀 Getting Started

#### Prerequisites

- **Node.js** 18+
- **npm** or **yarn**
- **Git**

#### Installation

```bash
# Clone the repository
git clone <repository-url>
cd accessible-astro-starter

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

#### Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📖 Development Guide

### 🆕 Receita Completa: Adicionando Novos Produtos

Siga esta receita passo-a-passo para adicionar novos produtos de forma rápida e consistente:

#### 📝 **Passo 1: Criar Arquivo do Produto**

1. **Criar arquivo MDX** na pasta `src/content/products/`:
   ```bash
   src/content/products/nome-da-categoria-3.mdx
   ```

2. **Adicionar Frontmatter completo**:
   ```yaml
   ---
   title: "Nome Completo do Produto"
   description: "Descrição atraente do produto em português (máx 160 caracteres para SEO)"
   price: "$XX.XX"
   category: "categoria-do-produto" # Ex: electronics, fashion, sports-outdoors, home-garden
   tags: ["tag1", "tag2", "tag3"] # Tags relevantes para filtros
   affiliateUrl: "https://www.amazon.com/link-do-produto"
   image: "/src/assets/images/products/nome-da-imagem.webp"
   ---
   ```

#### 🖼️ **Passo 2: Configurar Imagens**

1. **Adicionar imagens** na pasta `src/assets/images/products/`:
   - **Arquivo principal**: `nome-do-produto.webp`
   - **Imagens adicionais**: `nome-do-produto-2.webp`, `nome-do-produto-3.webp` (opcional)

2. **Formatos recomendados**:
   - ✅ **WebP** (recomendado) - melhor compressão
   - ✅ **PNG** para transparência
   - ✅ **JPEG** para fotos

#### 📝 **Passo 3: Escrever Conteúdo**

**Estrutura recomendada do conteúdo**:

```markdown
Introdução breve e atraente do produto.

## Características Principais

### Recurso 1
Descrição detalhada do recurso mais importante.

### Recurso 2
Explicação de outro aspecto relevante.

## Por que Escolher Este Produto

Razões convincentes para o leitor comprar o produto.

## Conclusão

Resumo final e chamada para ação.
```

#### 🔗 **Passo 4: URLs Automáticas**

As URLs são **geradas automaticamente** baseado no título:
- **Entrada**: `"Nome Completo do Produto"`
- **Saída**: `/category/categoria/product/nome-completo-do-produto`

**Exemplo prático**:
```yaml
---
title: "Ninja Foodi 10 QT 6-in-1 DualZone Smart XL Air Fryer"
category: "home-garden"
---
```
- **URL gerada**: `/category/home-garden/product/ninja-foodi-10-qt-6-in-1-dualzone-smart-xl-air-fryer`

#### ⚡ **Passo 5: Testar Produto**

1. **Iniciar servidor**: `npm run dev`
2. **Verificar página**: `http://localhost:4321/categories/sua-categoria`
3. **Testar produto**: Clicar no produto deve levar à página correta
4. **Verificar imagens**: Todas as imagens devem carregar
5. **Testar responsividade**: Verificar em diferentes telas

### 📋 **Categorias Disponíveis**

| Categoria | Slug | Descrição | Exemplo |
|-----------|------|-----------|---------|
| **Casa e Jardim** | `home-garden` | Utensílios domésticos, cozinha | Air Fryer, aspirador |
| **Eletrônicos** | `electronics` | Smartphones, gadgets, acessórios | iPhone, fones de ouvido |
| **Moda** | `fashion` | Roupas, calçados, acessórios | Tênis, relógios |
| **Esportes** | `sports-outdoors` | Equipamentos esportivos | Mochila, garrafa térmica |
| **Livros** | `books` | Livros físicos e digitais | Guias, manuais |
| **Artes e Artesanato** | `arts-crafts` | Materiais para arte e DIY | Tintas, pincéis |
| **Saúde e Bem-estar** | `health-wellness` | Suplementos, produtos de saúde | Vitaminas, equipamentos |

### 🏷️ **Tags Recomendadas por Categoria**

#### **Casa e Jardim** (`home-garden`)
- `kitchen-appliance` - Utensílios de cozinha
- `air-fryer` - Fritadeiras elétricas
- `smart-cooking` - Cozinha inteligente
- `large-capacity` - Grande capacidade

#### **Eletrônicos** (`electronics`)
- `smartphone` - Celulares
- `wireless` - Sem fio
- `premium` - Produto premium
- `latest-model` - Modelo mais recente

#### **Esportes** (`sports-outdoors`)
- `outdoor-gear` - Equipamento para exterior
- `fitness` - Produtos para fitness
- `camping` - Camping e aventura
- `water-bottle` - Garrafas de água

### 🚨 **Problemas Comuns e Soluções**

#### ❌ **Imagem não aparece**
```yaml
# ✅ Correto
image: "/src/assets/images/products/ninja-air-fryer.webp"

# ❌ Incorreto
image: "ninja-air-fryer.webp"
image: "./ninja-air-fryer.webp"
```

#### ❌ **URL não funciona**
- Verificar se o título não tem caracteres especiais
- Confirmar se a categoria existe
- Testar se o arquivo MDX está correto

#### ❌ **Produto não aparece na categoria**
- Verificar se a categoria no frontmatter está correta
- Confirmar se o arquivo está em `src/content/products/`
- Reiniciar o servidor: `npm run dev`

### ⚡ **Template Rápido para Novos Produtos**

```yaml
---
title: "NOME COMPLETO DO PRODUTO"
description: "DESCRIÇÃO EM PORTUGUÊS (máx 160 caracteres)"
price: "$XX.XX"
category: "categoria-correta"
tags: ["tag1", "tag2", "tag3"]
affiliateUrl: "https://www.amazon.com/LINK-AFILIADO"
image: "/src/assets/images/products/nome-da-imagem.webp"
---

Introdução atraente do produto destacando os principais benefícios.

## Características Técnicas

### Recurso Principal
Descrição detalhada do que torna este produto especial.

### Recursos Adicionais
- Benefício 1
- Benefício 2
- Benefício 3

## Vantagens Competitivas

Explique por que este produto é melhor que os concorrentes.

## Recomendações de Uso

Quando e como usar o produto para obter melhores resultados.

## Conclusão

Resumo final reforçando a qualidade e utilidade do produto.
```

### 📖 **[Component Documentation →](#-components)**

## 🔧 Contributing

### Code Style

- **TypeScript** for type safety
- **ESLint** for code quality
- **Prettier** for formatting
- **Accessible components** throughout

### Commit Guidelines

```
feat: add new product category
fix: resolve image loading issue
docs: update component documentation
style: improve carousel animations
```

### Testing

- **Accessibility testing** with screen readers
- **Responsive testing** across devices
- **Performance testing** for image loading
- **Cross-browser testing** for compatibility

---

## 📚 Additional Resources

- **[Astro Documentation](https://docs.astro.build)**
- **[Accessible Astro Components](https://github.com/incluud/accessible-astro-components)**
- **[WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)**
- **[Tailwind CSS](https://tailwindcss.com/docs)**

---

## 🔗 Quick Links

| Section | Description | Link |
|---------|-------------|------|
| **🏠 Homepage** | Main website | `http://localhost:4321/` |
| **📦 Categories** | Browse all categories | `http://localhost:4321/categories` |
| **🏷️ Sports Category** | Sports & Fitness products | `http://localhost:4321/categories/sports` |
| **🖼️ Image Demo** | Component demonstration | `http://localhost:4321/image-demo` |
| **📚 Image Docs** | Detailed image documentation | `src/assets/images/products/README.md` |
| **🧩 Components** | Available components | `src/components/` |

### 📁 Key Files

- **`src/pages/index.astro`** - Homepage with category cards
- **`src/pages/categories/index.astro`** - Categories listing page
- **`src/pages/product/[...slug].astro`** - Individual product pages
- **`src/components/ProductImages.astro`** - Image carousel component
- **`src/content/products/`** - Product review files

---

**Built with ❤️ using Astro, Accessibility, and Modern Web Standards**
