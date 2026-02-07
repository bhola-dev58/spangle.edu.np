# Spangle Education & Computer Institute

A modern, responsive web application for Spangle Education & Computer Institute built with React, Firebase, and Tailwind CSS.

## 🚀 Features

- **Modern UI/UX**: Clean, responsive design with Tailwind CSS
- **Authentication**: Firebase Authentication for secure user management
- **Course Management**: Browse and explore educational courses
- **Contact System**: Integrated contact form with Google Maps
- **Responsive Design**: Mobile-first approach, works on all devices
- **PWA Ready**: Progressive Web App with offline capabilities

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- Git
- Firebase account

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/bhola-dev58/spangle.edu.np.git
cd spangle.edu.np
```

### 2. Install Dependencies

```bash
cd frontend
npm install
```

### 3. Environment Setup

Create a `.env` file in the `frontend` directory:

```bash
cp .env.example .env
```

Update the `.env` file with your Firebase configuration:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## 🏃 Running Locally

### Development Mode

```bash
cd frontend
npm start
```

The application will open at `http://localhost:3000`

### Build for Production

```bash
cd frontend
npm run build
```

This creates an optimized production build in the `frontend/build` directory.

## 🚀 Deployment

### Deploy to Firebase Hosting

1. **Install Firebase CLI**:
```bash
npm install -g firebase-tools
```

2. **Login to Firebase**:
```bash
firebase login
```

3. **Initialize Firebase** (if not already done):
```bash
firebase init hosting
```

4. **Build the project**:
```bash
cd frontend
npm run build
```

5. **Deploy**:
```bash
firebase deploy --only hosting
```

### Deploy to Vercel

1. **Install Vercel CLI**:
```bash
npm install -g vercel
```

2. **Deploy**:
```bash
cd frontend
vercel
```

### Deploy to Netlify

1. **Build the project**:
```bash
cd frontend
npm run build
```

2. **Deploy via Netlify CLI**:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

Or drag and drop the `build` folder to Netlify's web interface.

## 📁 Project Structure

```
spangle.edu.np/
├── frontend/
│   ├── public/              # Static files
│   │   ├── favicon.png      # Favicon
│   │   ├── logo-192.png     # App icon (192x192)
│   │   ├── logo-512.png     # App icon (512x512)
│   │   ├── manifest.json    # PWA manifest
│   │   └── index.html       # HTML template
│   ├── src/
│   │   ├── assets/          # Images, fonts, etc.
│   │   ├── components/      # React components
│   │   ├── context/         # React context (Auth, etc.)
│   │   ├── firebase/        # Firebase configuration
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── utils/           # Utility functions
│   │   ├── App.js           # Main App component
│   │   ├── index.js         # Entry point
│   │   └── input.css        # Tailwind CSS input
│   ├── .env.example         # Environment variables template
│   ├── package.json         # Dependencies
│   └── tailwind.config.js   # Tailwind configuration
├── firestore.rules          # Firestore security rules
├── firestore.indexes.json   # Firestore indexes
├── firebase.json            # Firebase configuration
└── README.md                # This file
```

## 🔧 Configuration

### Tailwind CSS

Tailwind is configured in `tailwind.config.js`. To customize:

```javascript
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Add custom colors
      }
    }
  }
}
```

### Firebase

Firebase configuration is in `frontend/src/firebase/config.js`. Ensure your `.env` file has the correct credentials.

## 🧪 Testing

```bash
cd frontend
npm test
```

## 📱 PWA Features

The app includes:
- Offline support
- Add to home screen
- Custom app icons (circular logo)
- Optimized for mobile devices

## 🔒 Security

- Environment variables for sensitive data
- Firebase security rules configured
- HTTPS enforced in production
- Input validation and sanitization

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is private and proprietary to Spangle Education & Computer Institute.

## 👥 Contact

- **Website**: [spangle.edu.np](https://spangle.edu.np)
- **Email**: info@spangle.edu.np
- **Phone**: +977 980-4472777
- **Location**: Siddharthanagar, Rupandehi, Nepal

## 🙏 Acknowledgments

- React Team for the amazing framework
- Firebase for backend services
- Tailwind CSS for the utility-first CSS framework
- All contributors and supporters

---

**Made with ❤️ by Spangle Education & Computer Institute**
