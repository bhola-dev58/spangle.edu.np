# Environment Variables Setup Guide

This guide explains how to properly configure environment variables for the Spangle Education project.

## 🔐 Security First

**IMPORTANT**: Never commit your `.env` file to Git. It contains sensitive credentials.

✅ `.env` is already in `.gitignore`  
✅ `.env.example` provides a template for others

---

## 📋 Setup Instructions

### 1. Copy the example file

```bash
cd frontend
cp .env.example .env
```

### 2. Get Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **spangle-edu-1fef0**
3. Click on Settings (⚙️) → Project Settings
4. Scroll down to "Your apps" section
5. Select your web app or create one
6. Copy the config values

### 3. Update your `.env` file

Replace the placeholder values in `frontend/.env`:

```env
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your_actual_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id

# API Configuration (if using backend)
REACT_APP_API_URL=http://localhost:5000/api

# App Configuration
REACT_APP_NAME=Spangle Education Institute
REACT_APP_VERSION=1.0.0
```

---

## 🏗️ How It Works

### Frontend (React App)

The React app automatically loads environment variables from `.env` file:

**File**: `src/firebase/config.js`
```javascript
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // ... other config
};
```

### Scripts (Node.js)

Node scripts use `dotenv` package to load variables:

**File**: `src/scripts/insertTeamManually.js`
```javascript
require('dotenv').config({ path: '../../.env' });

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // ... other config
};
```

---

## 🚀 Running the App

### Development

```bash
cd frontend
npm start
```

The app will automatically load variables from `.env`.

### Running Scripts

```bash
cd frontend
node src/scripts/insertTeamManually.js
```

---

## ✅ Validation

The Firebase config includes validation:

```javascript
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  throw new Error('Firebase configuration is missing!');
}
```

If you see this error:
1. Check that `.env` file exists in `frontend/` directory
2. Verify all `REACT_APP_FIREBASE_*` variables are set
3. Restart the development server

---

## 🔄 For New Team Members

When cloning the repository:

1. Copy `.env.example` to `.env`
2. Request Firebase credentials from the project admin
3. Update `.env` with actual values
4. Never commit `.env` file

---

## 📝 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_FIREBASE_API_KEY` | Firebase API Key | `AIzaSy...` |
| `REACT_APP_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain | `project.firebaseapp.com` |
| `REACT_APP_FIREBASE_PROJECT_ID` | Firebase Project ID | `my-project-123` |
| `REACT_APP_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket | `project.firebasestorage.app` |
| `REACT_APP_FIREBASE_MESSAGING_SENDER_ID` | Firebase Messaging Sender ID | `123456789` |
| `REACT_APP_FIREBASE_APP_ID` | Firebase App ID | `1:123:web:abc` |
| `REACT_APP_FIREBASE_MEASUREMENT_ID` | Firebase Analytics ID (optional) | `G-XXXXXXXXXX` |
| `REACT_APP_API_URL` | Backend API URL (if applicable) | `http://localhost:5000/api` |
| `REACT_APP_NAME` | Application Name | `Spangle Education` |
| `REACT_APP_VERSION` | Application Version | `1.0.0` |

---

## 🛡️ Security Best Practices

### ✅ DO:
- Keep `.env` file in `.gitignore`
- Use `.env.example` for documentation
- Rotate credentials if exposed
- Use different credentials for dev/prod
- Restrict Firebase rules appropriately

### ❌ DON'T:
- Commit `.env` to version control
- Share credentials in chat/email
- Use production credentials in development
- Hardcode credentials in source code
- Push credentials to public repositories

---

## 🐛 Troubleshooting

### Error: "Firebase configuration is missing"

**Solution**: Check that `.env` file exists and contains all required variables.

```bash
# Verify .env file exists
ls -la frontend/.env

# Check contents (be careful not to share output)
cat frontend/.env
```

### Error: Variables are undefined

**Solution**: Restart the development server after changing `.env`.

```bash
# Stop the server (Ctrl+C)
# Start again
npm start
```

### Scripts can't find .env

**Solution**: Ensure the path in `require('dotenv').config()` is correct.

```javascript
// Correct path relative to script location
require('dotenv').config({ 
  path: require('path').resolve(__dirname, '../../.env') 
});
```

---

## 📚 Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Create React App Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/)
- [dotenv Package](https://www.npmjs.com/package/dotenv)

---

## 🔄 Updating Credentials

If you need to update Firebase credentials:

1. Update `.env` file
2. Restart development server
3. Clear browser cache if needed
4. Update `.env.example` documentation (without actual values)
5. Notify team members to update their local `.env`

---

**Last Updated**: November 3, 2025  
**Maintained By**: Spangle Education Development Team
