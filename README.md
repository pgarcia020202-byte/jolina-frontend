# EcoVoice - Environmental Advocacy Web App

A React web application for environmental advocacy, migrated from static HTML/CSS/JS to a modern React framework.

## 🌍 About

EcoVoice is a platform dedicated to environmental advocacy, providing resources, community engagement, and actionable initiatives for protecting our planet.

## ✨ Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark Mode**: Toggle between light and dark themes
- **Modern React Architecture**: Built with React 18 and modern hooks
- **Routing**: Client-side navigation with React Router
- **Component-Based**: Modular, reusable components
- **Form Validation**: Client-side form validation with error handling
- **Accessibility**: WCAG compliant with proper focus management

## 🛠️ Technology Stack

- **React 18.2.0** - UI framework
- **React Router DOM 7.13.1** - Client-side routing
- **CSS3** - Styling with CSS custom properties
- **React Context** - Theme management
- **Modern JavaScript (ES6+)**

## 📁 Project Structure

```
frontend/
├── public/
│   ├── assets/           # Static images and assets
│   │   ├── hero-nature.jpg
│   │   ├── climate-action.jpg
│   │   ├── ocean-conservation.jpg
│   │   ├── sustainable-living.jpg
│   │   ├── environmental-community.jpg
│   │   ├── nature-exploration.jpg
│   │   └── community-garden.jpg
│   ├── index.html        # HTML template
│   └── README.md         # Assets documentation
├── src/
│   ├── components/        # Reusable components
│   │   ├── Header.js
│   │   ├── Header.css
│   │   ├── Footer.js
│   │   └── Footer.css
│   ├── contexts/         # React contexts
│   │   └── ThemeContext.js
│   ├── pages/           # Page components
│   │   ├── Home.js       # Uses: hero-nature.jpg, climate-action.jpg, ocean-conservation.jpg, sustainable-living.jpg
│   │   ├── Home.css
│   │   ├── About.js      # Uses: environmental-community.jpg, nature-exploration.jpg, community-garden.jpg
│   │   ├── About.css
│   │   ├── Contact.js
│   │   ├── Contact.css
│   │   ├── Login.js
│   │   ├── Login.css
│   │   ├── Register.js
│   │   └── Register.css
│   ├── hooks/           # Custom hooks (future)
│   ├── App.js          # Main app component
│   ├── App.css         # Global styles
│   ├── index.js        # Entry point
│   └── index.css       # Base styles
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## 🎨 Design System

### Color Palette

- **Primary Green**: `#2d5a27`
- **Secondary Teal**: `#1a7a6c`
- **Accent Gold**: `#d4a853`
- **Neutral Dark**: `#2c3e50`
- **Light Background**: `#f8f9f5`

### Typography

- **Headings**: Playfair Display (serif)
- **Body**: Open Sans (sans-serif)

### Components

#### Header
- Logo and navigation
- Theme toggle button
- Responsive design

#### Footer
- Multi-column layout
- Contact information
- Quick links

#### Pages
- **Home**: Hero section, highlights, feature cards
- **About**: Mission, values, story
- **Contact**: Contact form, information
- **Login**: Authentication with validation
- **Register**: User registration with interests

## 🔧 Customization

### Adding New Pages

1. Create a new component in `src/pages/`
2. Add the route in `src/App.js`
3. Update the navigation in `src/components/Header.js`

### Theme Customization

Modify the CSS custom properties in `src/App.css`:

```css
:root {
  --primary-green: #your-color;
  --secondary-teal: #your-color;
  /* ... other variables */
}
```

### Adding New Components

1. Create component files in `src/components/`
2. Follow the naming convention: `ComponentName.js` and `ComponentName.css`
3. Export and import where needed

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## ♿ Accessibility Features

- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- High contrast mode support
- Reduced motion support

## 📱 Responsive Design

- Mobile-first approach
- Flexible grid layouts
- Responsive typography
- Touch-friendly interactions

## 🔒 Security Considerations

- Form validation
- XSS prevention
- Secure routing
- Input sanitization (to be implemented)

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized build in the `build/` folder.

### Environment Variables

Create a `.env` file in the root:

```
REACT_APP_API_URL=your-api-url
REACT_APP_ENVIRONMENT=production
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Contact

- Email: info@ecovoice.org
- Website: https://ecovoice.org

---

Built with ❤️ for the environment
