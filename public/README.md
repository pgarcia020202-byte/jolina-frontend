# Public Assets

This folder contains static assets that are served directly by the React application.

## 📁 Assets Structure

```
public/
├── assets/
│   ├── hero-nature.jpg           # Home page hero image
│   ├── climate-action.jpg        # Climate action feature card
│   ├── ocean-conservation.jpg    # Ocean conservation feature card
│   ├── sustainable-living.jpg   # Sustainable living feature card
│   ├── environmental-community.jpg # About page community image
│   ├── nature-exploration.jpg   # About page exploration image
│   └── community-garden.jpg    # About page community image
├── index.html                  # HTML template
└── README.md                  # This file
```

## 🖼️ Image Usage

### Home Page
- **Hero Section**: `hero-nature.jpg`
- **Climate Action Card**: `climate-action.jpg`
- **Ocean Conservation Card**: `ocean-conservation.jpg`
- **Sustainable Living Card**: `sustainable-living.jpg`

### About Page
- **Community Section**: `environmental-community.jpg`
- **Exploration Section**: `nature-exploration.jpg`
- **Community Garden**: `community-garden.jpg`

## 📐 Image Specifications

- **Format**: JPEG
- **Optimization**: Web-optimized for fast loading
- **Responsive**: Used with CSS object-fit for proper scaling
- **Alt Text**: Comprehensive descriptions for accessibility

## 🚀 Usage in React Components

Images are referenced from the public folder using absolute paths:

```jsx
<img 
  src="/assets/hero-nature.jpg" 
  alt="Lush green forest with sunlight streaming through trees"
/>
```

## ♿ Accessibility

All images include:
- **Descriptive alt text** for screen readers
- **Semantic meaning** within content context
- **Proper contrast** and visibility considerations

## 📱 Performance

- Images are optimized for web delivery
- Lazy loading can be implemented for performance
- Responsive images can be added for different screen sizes

## 🔄 Adding New Images

1. Place images in the `public/assets/` folder
2. Use descriptive filenames (kebab-case)
3. Add appropriate alt text in components
4. Update this README with new image information

## 🌐 Browser Support

All images are compatible with:
- Chrome/Edge (WebP/JPEG fallback)
- Firefox (WebP/JPEG fallback)
- Safari (JPEG format)
- Mobile browsers (optimized formats)
