# Spangle Education and Computer Institute Website

A modern, responsive website for Spangle Education and Computer Institute Pvt. Ltd. built with React.js and Tailwind CSS.

## Features

- 🎨 Modern and professional design
- 🌓 Dark/Light mode toggle
- 📱 Fully responsive layout
- ⚡ Fast and optimized performance
- 🎯 User-friendly navigation
- 📝 Contact form
- 📚 Course listings
- ℹ️ About section
- 📞 Contact information

## Tech Stack

- React.js
- Tailwind CSS
- React Router
- Heroicons
- Context API for theme management

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/bhola-dev58/spangle.edu.np.git
   cd spangle.edu.np
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Project Structure

```
spangle.edu.np/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Footer.js
│   │   └── ErrorBoundary.js
│   ├── context/
│   │   └── ThemeContext.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Courses.js
│   │   ├── About.js
│   │   └── Contact.js
│   ├── App.js
│   └── index.js
├── tailwind.config.js
├── package.json
└── README.md
```

## Features in Detail

### Dark Mode
- Toggle between light and dark themes
- Theme preference is saved in localStorage
- Smooth transitions between themes
- Consistent styling across all components

### Responsive Design
- Mobile-first approach
- Responsive navigation menu
- Adaptive layouts for all screen sizes
- Optimized images and content

### Course Management
- Detailed course listings
- Course duration and fee information
- Easy enrollment process
- Course categories and descriptions

### Contact Information
- Contact form with validation
- Institute location and map
- Business hours
- Multiple contact methods

## Customization

### Colors
Colors can be customized in `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#4F46E5',
        dark: '#4338CA',
      },
      secondary: {
        DEFAULT: '#7C3AED',
        dark: '#6D28D9',
      },
      // ... other colors
    }
  }
}
```

### Content
- Update course information in `src/pages/Courses.js`
- Modify contact details in `src/components/Footer.js`
- Edit about section in `src/pages/About.js`

## Deployment

The website can be deployed to any static hosting service:

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the contents of the `build` folder to your hosting service.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Spangle Education and Computer Institute Pvt. Ltd.
- Address: Siddharthanagar-13, Devkota Chowk, Rupandehi, Nepal
- Email: info@spangle.edu.np
- Phone: +977-XXXXXXXXXX

## Acknowledgments

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Heroicons](https://heroicons.com/)
- [React Router](https://reactrouter.com/) 