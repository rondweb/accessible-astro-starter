# Product Images Organization

This directory contains organized product images following Astro's best practices for asset management.

## Structure

```
src/assets/images/products/
├── README.md                           # This documentation
├── yeti-rambler-tumbler.webp          # Yeti Rambler 20 oz Tumbler (Main)
├── yeti-rambler-tumbler-2.webp        # Yeti Rambler 20 oz Tumbler (Alt 1)
├── yeti-rambler-tumbler-3.webp        # Yeti Rambler 20 oz Tumbler (Alt 2)
├── black-diamond-headlamp.webp         # Black Diamond Spot 400 Headlamp
├── owala-freesip-bottle.webp           # Owala FreeSip Water Bottle
├── iphone-15-pro.webp                  # iPhone 15 Pro
└── nike-air-max-shoes.webp             # Nike Air Max 270
```

## Features

- **🎠 Carousel Support**: Products with multiple images show as interactive carousel
- **🖼️ Single Image Mode**: Products with one image show as static image
- **❌ No Image Fallback**: Beautiful placeholder when no images are available
- **⌨️ Keyboard Navigation**: Full accessibility support for carousel
- **🎯 Touch/Swipe Support**: Mobile-friendly carousel navigation

## Usage in Components

### Using the ProductImages Component

```astro
---
import ProductImages from '@components/ProductImages.astro'
---

<!-- Single Image Mode (Default) -->
<ProductImages
  productSlug="yeti-rambler-tumbler"
  alt="Yeti Rambler 20 oz Tumbler - Insulated stainless steel tumbler"
/>

<!-- Carousel Mode (Multiple Images) -->
<ProductImages
  productSlug="yeti-rambler-tumbler"
  alt="Yeti Rambler 20 oz Tumbler"
  showCarousel={true}
  autoplay={true}
  autoplayDelay={4000}
/>
```

### Direct Import (Alternative)

```astro
---
import yetiRambler from '@assets/images/products/yeti-rambler-tumbler.webp'
---

<img src={yetiRambler.src} alt="Yeti Rambler 20 oz Tumbler" />
```

## Product Mapping

| Product Slug | Files | Description |
|-------------|-------|-------------|
| `yeti-rambler-tumbler` | 3 images | Yeti Rambler 20 oz Tumbler (Carousel) |
| `black-diamond-headlamp` | 1 image | Black Diamond Spot 400 Headlamp (Single) |
| `owala-freesip-bottle` | 1 image | Owala FreeSip Water Bottle (Single) |
| `iphone-15-pro` | 1 image | iPhone 15 Pro (Single) |
| `nike-air-max-shoes` | 1 image | Nike Air Max 270 (Single) |

## Adding New Products

1. **Add image file(s)** to this directory with proper naming convention
2. **Update ProductImages.astro** component to include new product in mapping
3. **Add product to table** in this README
4. **Update product MDX** file to reference the organized image structure

## Image Optimization

- Use **WebP format** for better compression and quality
- **Multiple formats supported**: `.webp`, `.png`, `.jpg`, `.jpeg`, `.avif`, `.svg`
- Optimize images for **different screen sizes** when possible
- Consider using **responsive images** with `srcset` for better performance
- Keep file sizes **under 200KB** when possible for faster loading

## Supported Image Formats

The ProductImages component supports multiple image formats:

| Format | Extension | Best For | Browser Support |
|--------|-----------|----------|-----------------|
| **WebP** | `.webp` | ✅ **Recommended** - Best compression | Modern browsers |
| **PNG** | `.png` | Transparency, logos | Universal |
| **JPEG** | `.jpg`, `.jpeg` | Photos, complex images | Universal |
| **AVIF** | `.avif` | Future standard, excellent compression | Modern browsers |
| **SVG** | `.svg` | Icons, vector graphics | Universal |

### Format Recommendations

- **🖼️ WebP**: Primary choice for product images (best compression/quality ratio)
- **📸 JPEG**: Fallback for older browsers or photos
- **🖼️ PNG**: When transparency is needed
- **🎨 SVG**: For logos and simple graphics

## Carousel Features

- **Auto-play**: Optional automatic slide progression
- **Navigation Dots**: Click to jump to specific images
- **Arrow Buttons**: Previous/Next navigation
- **Keyboard Support**: Left/Right arrow keys
- **Touch Support**: Swipe gestures on mobile
- **Hover Pause**: Auto-play pauses when hovering
- **Accessibility**: Full ARIA labels and screen reader support

## Migration from Old Structure

The project was migrated from using generic project images (`/project-image-1.png`) to organized product-specific images with carousel support. All products now reference their dedicated images in this directory.
