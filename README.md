# 🎓 Spangle Education & Computer Institute Website

<div align="center">
  <h3>A modern, responsive website for <strong>Spangle Education and Computer Institute Pvt. Ltd.</strong></h3>
  <p>Built with React.js, Tailwind CSS, and modern web technologies</p>
  
  ![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.1-38B2AC?style=flat-square&logo=tailwind-css)
  ![React Router](https://img.shields.io/badge/React%20Router-6.22.1-CA4245?style=flat-square&logo=react-router)
</div>

---

## 🌟 **About the Institute**

**Spangle Education and Computer Institute Pvt. Ltd.** is a premier educational institution located in Siddharthanagar-13, Devkota Chowk, Rupandehi, Nepal. We provide quality education and computer training to empower students for academic and professional success.

**📍 Location:** Siddharthanagar-13, Devkota Chowk, Rupandehi, Nepal  
**📞 Contact:** +977-9804400140  
**📧 Email:** info@spangle.edu.np  
**🕒 Hours:** Sunday-Friday (6:00 AM - 6:00 PM), Saturday (6:00 AM - 2:00 PM)

---

## ✨ **Key Features**

### 🎨 **Design & User Experience**
- 🌓 **Dark/Light Mode Toggle** - Persistent theme switching with smooth transitions
- 📱 **Fully Responsive Design** - Mobile-first approach with adaptive layouts
- 🎭 **Modern UI Components** - Professional design with hover effects and animations
- 🎨 **Custom Color Palette** - Branded color scheme with primary/secondary variants
- ⚡ **Optimized Performance** - Fast loading with React best practices

### 🧭 **Navigation & Pages**
- 🏠 **Home Page** - Hero section, career paths, mentors showcase
- 📚 **Courses Page** - 6 comprehensive courses with pricing and duration
- ℹ️ **About Page** - Institute story, mission, and facilities
- 📞 **Contact Page** - Interactive contact form and detailed information
- 🔗 **Smooth Navigation** - React Router with mobile-friendly hamburger menu

### 🛡️ **Technical Features**
- 🚨 **Error Boundary** - Graceful error handling and recovery
- 💾 **State Management** - React Context API for theme persistence
- 🔄 **CI/CD Ready** - GitHub Actions workflow with security scanning
- 📱 **PWA Ready** - Optimized for progressive web app features

---

## 🛠 **Tech Stack**

### **Frontend Framework & Libraries**
- **React.js** `v18.2.0` - Modern React with hooks and functional components
- **React Router DOM** `v6.22.1` - Client-side routing and navigation
- **React Scripts** `v5.0.1` - Create React App build tools

### **Styling & UI**
- **Tailwind CSS** `v3.4.1` - Utility-first CSS framework
- **Heroicons React** `v2.1.1` - Beautiful SVG icons
- **Custom Design System** - Branded colors and component library
- **Inter Font** - Modern typography from Google Fonts

### **Development & Build Tools**
- **Autoprefixer** `v10.4.17` - CSS vendor prefixing
- **PostCSS** `v8.5.6` - CSS processing and optimization
- **ESLint** - Code quality and consistency

---

## 📚 **Course Offerings**

| Course | Duration | Fee | Description |
|--------|----------|-----|-------------|
| **Basic Computer Course** | 3 months | Rs. 5,000 | MS Office, Internet, basic troubleshooting |
| **Advanced Computer Course** | 6 months | Rs. 10,000 | Advanced applications, programming basics |
| **Web Development** | 4 months | Rs. 15,000 | HTML, CSS, JavaScript, modern frameworks |
| **Graphic Design** | 3 months | Rs. 12,000 | Photoshop, Illustrator, CorelDRAW |
| **Digital Marketing** | 3 months | Rs. 8,000 | SEO, social media, online advertising |
| **Hardware & Networking** | 6 months | Rs. 15,000 | Computer hardware, networking, maintenance |

---

## 🚀 **Career Paths**

Our website showcases **18 different tech career paths** including:
- 💻 Software Developer, Frontend/Backend Developer
- 📊 Data Analyst, Data Scientist
- 🤖 AI Engineer, Machine Learning Engineer
- 🔒 Cyber Security Engineer
- 📱 Mobile/iOS Developer
- ☁️ Cloud Developer, DevOps Engineer
- 🔗 Blockchain Engineer
- 🎨 UX Designer
- And more...

---

## 🧑‍💻 **Getting Started**

### ✅ **Prerequisites**

Ensure you have the following tools installed:

| Tool | Minimum Version | Purpose |
|------|----------------|----------|
| **Node.js** | v14 or higher | JavaScript runtime |
| **npm** | v6 or higher | Package manager |
| **Git** | Latest | Version control |

### 💻 **Installation**

1. **Clone the Repository**
```bash
git clone https://github.com/bhola-dev58/spangle.edu.np.git
cd spangle.edu.np
```

2. **Install Dependencies**
```bash
npm install
```

3. **Start Development Server**
```bash
npm start
```

4. **Build for Production**
```bash
npm run build
```

The application will be available at `http://localhost:3000`

---

## 📁 **Project Structure**

```
spangle.edu.np/
├── .github/                 # GitHub workflows and configurations
│   ├── dependabot.yml      # Dependency updates configuration
│   └── workflows/
│       └── codeql.yml      # Security analysis workflow
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── assets/             # Team photos and images (11 files)
│   │   ├── Amit_parjapati.jpg
│   │   ├── Bharat_Giri.jpg
│   │   ├── bridge-course-team.jpg
│   │   └── ...
│   ├── components/         # Reusable UI components
│   │   ├── ErrorBoundary.js
│   │   ├── Footer.js
│   │   └── Navbar.js
│   ├── context/            # React Context providers
│   │   └── ThemeContext.js
│   ├── pages/              # Main application pages
│   │   ├── About.js
│   │   ├── Contact.js
│   │   ├── Courses.js
│   │   └── Home.js
│   ├── App.js              # Main application component
│   ├── index.js            # Application entry point
│   ├── index.css           # Global styles
│   ├── input.css           # Tailwind imports
│   └── output.css          # Compiled CSS
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind configuration
└── README.md              # Project documentation
```

---

## 🎨 **Design System**

### **Color Palette**
```javascript
colors: {
  primary: { DEFAULT: '#4F46E5', dark: '#4338CA' },    // Indigo
  secondary: { DEFAULT: '#7C3AED', dark: '#6D28D9' },  // Violet
  accent: { DEFAULT: '#EC4899', dark: '#DB2777' },     // Pink
  dark: { DEFAULT: '#1F2937', light: '#374151' }       // Gray
}
```

### **Component Classes**
- `.btn` - Base button styling with transitions
- `.btn-primary` - Primary button with brand colors
- `.container` - Responsive container with max-width

---

## 🌐 **Pages Overview**

### **Home Page**
- **Hero Section** - Welcome message with call-to-action buttons
- **About Preview** - Brief institute introduction
- **Features Grid** - Expert faculty, modern facilities, career support
- **Career Showcase** - 18 different tech career paths
- **Mentors Section** - Featured mentors with ratings and profiles
- **Location & Enrollment** - Contact information and enrollment CTA

### **Courses Page**
- **Course Grid** - 6 comprehensive courses with details
- **Course Information** - Duration, fees, and descriptions
- **Enrollment CTA** - Direct enrollment buttons

### **About Page**
- **Institute Story** - History and establishment
- **Mission Statement** - Educational goals and values
- **Facilities Overview** - 4 key facility highlights
- **Modern Design** - Professional layout with imagery

### **Contact Page**
- **Contact Information** - Address, phone, email, hours
- **Interactive Form** - Name, email, phone, message fields
- **Location Details** - Comprehensive business information

---

## 🔧 **Available Scripts**

| Command | Description |
|---------|-------------|
| `npm start` | Runs the app in development mode |
| `npm run build` | Builds the app for production |
| `npm test` | Launches the test runner |
| `npm run eject` | Ejects from Create React App (one-way) |

---

## 🚀 **Deployment**

### **Build the Project**
```bash
npm run build
```

This creates an optimized production build in the `build` folder.

### **Deployment Options**
- **Netlify** - Connect GitHub repository for automatic deployments
- **Vercel** - Zero-configuration deployment for React apps
- **GitHub Pages** - Free hosting for static sites
- **Traditional Hosting** - Upload build folder to any web server

---

## 🤝 **Contributing**

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 **Support & Contact**

**Spangle Education and Computer Institute Pvt. Ltd.**

- **Address:** Siddharthanagar-13, Devkota Chowk, Rupandehi, Nepal
- **Phone:** +977-9804400140
- **Email:** info@spangle.edu.np
- **Hours:** 
  - Sunday - Friday: 6:00 AM - 6:00 PM
  - Saturday: 6:00 AM - 2:00 PM
  - Public Holidays: Closed

**Development Team:**
- GitHub: [@bhola-dev58](https://github.com/bhola-dev58)

---

## 🙏 **Acknowledgments**

- **React Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Heroicons** - For beautiful SVG icons
- **Create React App** - For the excellent build setup
- **Our Students & Faculty** - For inspiring this project

---

<div align="center">
  <p><strong>Made with ❤️ for education and community empowerment</strong></p>
  <p>© 2024 Spangle Education and Computer Institute Pvt. Ltd. All rights reserved.</p>
</div>
