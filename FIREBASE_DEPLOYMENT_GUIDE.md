# 🚀 Firebase Hosting Deployment Guide

## Complete Step-by-Step Instructions

Follow these steps carefully to deploy your Spangle Education website to Firebase Hosting.

---

## ✅ Prerequisites Checklist

Before you start, make sure you have:
- [ ] Node.js installed (v14 or higher)
- [ ] npm installed
- [ ] A Google account
- [ ] Firebase project created (or you'll create one in Step 2)
- [ ] Your `.env` file configured with Firebase credentials

---

## 📋 Step-by-Step Deployment

### **Step 1: Install Firebase CLI**

Open PowerShell or Command Prompt and run:

```bash
npm install -g firebase-tools
```

Verify installation:

```bash
firebase --version
```

You should see a version number (e.g., `13.0.0` or similar).

---

### **Step 2: Login to Firebase**

```bash
firebase login
```

This will:
1. Open your browser
2. Ask you to sign in with your Google account
3. Grant Firebase CLI access

**Note**: If you're already logged in, it will say "Already logged in as [your-email]"

---

### **Step 3: Check Your Firebase Project**

List your Firebase projects:

```bash
firebase projects:list
```

You should see your project. If not, create one:

1. Go to https://console.firebase.google.com/
2. Click "Add project"
3. Name it "spangle-education" (or your preferred name)
4. Follow the setup wizard

---

### **Step 4: Initialize Firebase (If Not Done)**

Navigate to your project directory:

```bash
cd g:\project\Window\spangle.edu.np
```

Check if Firebase is already initialized:

```bash
# Check if .firebaserc exists
dir .firebaserc
```

If it exists, you're good! If not, initialize:

```bash
firebase init hosting
```

When prompted:
- **Select project**: Choose your existing project or create new
- **Public directory**: Enter `frontend/build`
- **Configure as single-page app**: `Yes`
- **Set up automatic builds**: `No`
- **Overwrite index.html**: `No`

---

### **Step 5: Update Your .env File**

Make sure `frontend/.env` has your production Firebase credentials:

```env
REACT_APP_FIREBASE_API_KEY=your_actual_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

**Get these from**: Firebase Console → Project Settings → General → Your apps → Web app config

---

### **Step 6: Build Your Project**

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies (if not already done):

```bash
npm install
```

Build the production version:

```bash
npm run build
```

This will:
1. Compile Tailwind CSS
2. Create optimized React build
3. Generate files in `frontend/build` folder

**Wait for it to complete** - it may take 1-2 minutes.

You should see:
```
Compiled successfully.
File sizes after gzip:
...
The build folder is ready to be deployed.
```

---

### **Step 7: Test the Build Locally (Optional but Recommended)**

Install serve (if not installed):

```bash
npm install -g serve
```

Test your build:

```bash
serve -s build
```

Open http://localhost:3000 in your browser and verify everything works.

Press `Ctrl + C` to stop the server when done.

---

### **Step 8: Deploy to Firebase**

Go back to the root directory:

```bash
cd ..
```

Deploy:

```bash
firebase deploy --only hosting
```

You'll see:
```
=== Deploying to 'your-project-id'...

i  deploying hosting
i  hosting[your-project-id]: beginning deploy...
i  hosting[your-project-id]: found 20 files in frontend/build
✔  hosting[your-project-id]: file upload complete
i  hosting[your-project-id]: finalizing version...
✔  hosting[your-project-id]: version finalized
i  hosting[your-project-id]: releasing new version...
✔  hosting[your-project-id]: release complete

✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/your-project-id/overview
Hosting URL: https://your-project-id.web.app
```

---

### **Step 9: Verify Your Deployment**

1. **Open the Hosting URL** shown in the terminal
2. **Test all features**:
   - [ ] Homepage loads
   - [ ] Navigation works
   - [ ] All pages accessible
   - [ ] Forms work
   - [ ] Authentication works (if applicable)
   - [ ] Mobile responsive
   - [ ] No console errors (F12 → Console)

---

### **Step 10: Deploy Firestore Rules (Important!)**

Your database security rules need to be deployed:

```bash
firebase deploy --only firestore:rules
```

This ensures your Firestore database is secure.

---

### **Step 11: Set Up Custom Domain (Optional)**

If you want to use `spangle.edu.np` instead of `your-project.web.app`:

1. Go to Firebase Console → Hosting
2. Click "Add custom domain"
3. Enter `spangle.edu.np`
4. Follow the DNS configuration instructions
5. Add the provided DNS records to your domain registrar

**Note**: DNS propagation can take 24-48 hours.

---

## 🔄 Future Deployments

After the initial setup, deploying updates is simple:

```bash
# 1. Make your code changes
# 2. Commit to Git
git add .
git commit -m "Your update message"
git push

# 3. Build and deploy
cd frontend
npm run build
cd ..
firebase deploy --only hosting
```

Or use the shortcut script:

```bash
cd frontend
npm run deploy
```

---

## 🆘 Troubleshooting

### **Error: "Firebase CLI not found"**
```bash
npm install -g firebase-tools
```

### **Error: "Not authorized"**
```bash
firebase logout
firebase login
```

### **Error: "Build failed"**
- Check for errors in the terminal
- Make sure all dependencies are installed: `npm install`
- Check your `.env` file is correct

### **Error: "Deployment failed"**
- Make sure you're in the correct directory
- Check `firebase.json` is configured correctly
- Verify your Firebase project exists

### **Website shows old version**
- Clear browser cache (Ctrl + Shift + R)
- Wait a few minutes for CDN to update
- Check you deployed the latest build

---

## 📊 Monitoring Your Site

### **Firebase Console**
Visit: https://console.firebase.google.com/

- **Hosting**: View deployment history, traffic
- **Analytics**: See user activity (if configured)
- **Firestore**: Manage database
- **Authentication**: Manage users

### **Check Deployment History**
```bash
firebase hosting:channel:list
```

### **Rollback to Previous Version**
If something goes wrong:

1. Go to Firebase Console → Hosting
2. Click on "Release history"
3. Find the previous working version
4. Click "..." → "Rollback"

---

## 🎯 Quick Reference Commands

```bash
# Login
firebase login

# List projects
firebase projects:list

# Build
cd frontend && npm run build

# Deploy hosting only
firebase deploy --only hosting

# Deploy everything
firebase deploy

# Deploy rules only
firebase deploy --only firestore:rules

# View deployment
firebase hosting:channel:list

# Logout
firebase logout
```

---

## 📝 Deployment Checklist

Before each deployment:

- [ ] Code is tested locally
- [ ] `.env` has production credentials
- [ ] `npm run build` completes successfully
- [ ] No console errors in local build
- [ ] All features work in local build
- [ ] Git is committed and pushed
- [ ] Firestore rules are updated (if changed)

After deployment:

- [ ] Live site loads correctly
- [ ] All pages accessible
- [ ] Forms work
- [ ] Authentication works
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Performance is good

---

## 🎉 Success!

Your website is now live at:
- **Firebase URL**: `https://your-project-id.web.app`
- **Custom Domain** (if configured): `https://spangle.edu.np`

---

## 📞 Need Help?

- **Firebase Documentation**: https://firebase.google.com/docs/hosting
- **Firebase Support**: https://firebase.google.com/support
- **Community**: https://stackoverflow.com/questions/tagged/firebase

---

**Last Updated**: 2026-02-07
**Project**: Spangle Education & Computer Institute
**Platform**: Firebase Hosting

---

Made with ❤️ for Spangle Education & Computer Institute
