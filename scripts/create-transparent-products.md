# Create Transparent Background Product Images

## Overview
This guide explains how to create product images with transparent backgrounds using PixelLab's map object tool. These images will show just the product without any background, perfect for overlaying on different backgrounds in your app.

## Method: PixelLab Map Objects

The `create_map_object` tool creates pixel art objects with **transparent backgrounds by default**, which is exactly what we need for product images.

## Product Descriptions

Use these descriptions when creating each product:

### 1. Comet Cookies & Cream
```
pixel art ice cream product - cookies and cream flavor with cookie chunks in creamy white ice cream, freeze-dried ice cream packaging style, high top-down view
```

### 2. Galactic Graham Slam
```
pixel art ice cream product - galactic graham slam flavor with honey graham cracker pieces and marshmallow swirls, freeze-dried ice cream packaging style, high top-down view
```

### 3. Nebula Neapolitan
```
pixel art ice cream product - nebula neapolitan flavor with three distinct layers strawberry pink, vanilla white, and chocolate brown, freeze-dried ice cream packaging style, high top-down view
```

### 4. Galactic Green Tea
```
pixel art ice cream product - galactic green tea matcha flavor with mochi chunks, vibrant green color, freeze-dried ice cream packaging style, high top-down view
```

### 5. Dark Matter Dark Chocolate
```
pixel art ice cream product - dark matter dark chocolate flavor, rich dark chocolate, very dark brown almost black, freeze-dried ice cream packaging style, high top-down view
```

### 6. Praline Planet
```
pixel art ice cream product - praline planet flavor with caramelized pecan pieces and creamy vanilla base, freeze-dried ice cream packaging style, high top-down view
```

### 7. Strawberry Supernova
```
pixel art ice cream product - strawberry supernova flavor with explosive strawberry clusters in pink ice cream, freeze-dried ice cream packaging style, high top-down view
```

### 8. Meteor Mint Chip
```
pixel art ice cream product - meteor mint chip flavor with frozen mint green ice cream and chocolate chip meteorites, freeze-dried ice cream packaging style, high top-down view
```

## Recommended Settings

- **Size**: 400x400 pixels (or 300x300 for smaller file sizes)
- **View**: `high top-down` (product photography angle)
- **Shading**: `medium shading` or `detailed shading`
- **Detail**: `high detail`
- **Outline**: `single color outline` (for clean pixel art look)

## Steps to Create

1. Use PixelLab MCP tool `create_map_object` with:
   - Description: (use one from above)
   - Width: 400
   - Height: 400
   - View: "high top-down"
   - Shading: "medium shading"
   - Detail: "high detail"
   - Outline: "single color outline"

2. Wait for generation (~15-30 seconds)

3. Use `get_map_object` with the returned object_id to check status

4. Once completed, download the PNG (it will have transparent background)

5. Save to `/public/assets/` with naming:
   - `product-cookies-hero-transparent.png`
   - `product-graham-hero-transparent.png`
   - etc.

## Alternative: Manual Creation

If the API has issues, you can:
1. Use PixelLab web interface at pixellab.ai
2. Create map objects with the descriptions above
3. Download the transparent PNG files
4. Save them to `/public/assets/`

## Integration

After creating transparent versions, update `src/lib/flavors.ts` to use the new image paths:

```typescript
image: '/assets/product-cookies-hero-transparent.png',
```

The transparent backgrounds will work seamlessly with your existing `object-contain` CSS classes and will look great on any background color!

