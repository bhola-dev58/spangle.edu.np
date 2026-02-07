# 🚀 Quick Deployment Reference

## One-Page Cheat Sheet for Firebase Deployment

---

## 🎯 First Time Setup (Do Once)

```bash
# 1. Install Firebase CLI
npm install -g firebase-tools

# 2. Login
firebase login

# 3. Verify project
firebase projects:list
```

---

## 📦 Deploy Commands (Every Time)

```bash
# Navigate to project
cd g:\project\Window\spangle.edu.np

# Build the project
cd frontend
npm run build

# Deploy
cd ..
firebase deploy --only hosting
```

**Or use the shortcut:**

```bash
cd frontend
npm run deploy
```

---

## ⚡ Quick Deploy (3 Steps)

```bash
1. cd g:\project\Window\spangle.edu.np\frontend
2. npm run build
3. npm run deploy
```

---

## 🔍 Verify Deployment

After deployment, check:
- ✅ Open the URL shown in terminal
- ✅ Test all pages
- ✅ Check mobile view
- ✅ Test forms
- ✅ Check console for errors (F12)

---

## 🆘 Common Issues

### Build Fails
```bash
cd frontend
npm install
npm run build
```

### Not Logged In
```bash
firebase logout
firebase login
```

### Old Version Shows
- Clear cache: `Ctrl + Shift + R`
- Wait 2-3 minutes

---

## 📍 Important URLs

- **Firebase Console**: https://console.firebase.google.com/
- **Your Live Site**: https://[your-project-id].web.app
- **Documentation**: See `FIREBASE_DEPLOYMENT_GUIDE.md`

---

## 🔄 Update Workflow

```bash
# 1. Make changes to code
# 2. Test locally (npm start)
# 3. Commit changes
git add .
git commit -m "Your message"
git push

# 4. Deploy
cd frontend
npm run deploy
```

---

## 📞 Help

Full guide: `FIREBASE_DEPLOYMENT_GUIDE.md`
Checklist: `DEPLOYMENT.md`

---

**That's it! You're ready to deploy! 🎉**
