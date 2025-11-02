# 🔥 Firebase Setup Instructions

## ✅ Firebase Integration Complete!

Your Admin Dashboard and Courses page are now connected to Firebase Firestore database.

---

## 📋 Step-by-Step Firebase Configuration

### 1️⃣ Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add Project"** or **"Create a project"**
3. Enter project name: `spangle-edu` (or your choice)
4. Disable Google Analytics (optional, not needed)
5. Click **"Create Project"**

### 2️⃣ Register Web App

1. In Firebase Console, click the **Web icon** (</>) to add a web app
2. Enter app nickname: `Spangle Website`
3. Check **"Also set up Firebase Hosting"** (optional)
4. Click **"Register app"**

### 3️⃣ Copy Firebase Configuration

You'll see a configuration object like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "spangle-edu.firebaseapp.com",
  projectId: "spangle-edu",
  storageBucket: "spangle-edu.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

### 4️⃣ Update Your Config File

Open `frontend/src/firebase/config.js` and replace with your credentials:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 5️⃣ Enable Firestore Database

1. In Firebase Console, go to **"Build" → "Firestore Database"**
2. Click **"Create database"**
3. Choose **"Start in test mode"** (for development)
4. Select location: **asia-south1 (Mumbai)** (closest to Nepal)
5. Click **"Enable"**

### 6️⃣ Set Firestore Security Rules

Go to **"Rules"** tab and paste this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all courses
    match /courses/{courseId} {
      allow read: if true;
      allow write: if request.auth != null; // Only authenticated users can write
    }
    
    // Allow read access to all staff
    match /staff/{staffId} {
      allow read: if true;
      allow write: if request.auth != null; // Only authenticated users can write
    }
  }
}
```

**Note:** For production, change `allow write: if true;` temporarily to test, then add proper authentication.

---

## 🚀 Testing Your Setup

### Test Admin Dashboard:

1. Start your app: `cd frontend && npm start`
2. Go to: `http://localhost:3000/admin`
3. Try adding a course - it should save to Firebase!
4. Check Firebase Console → Firestore Database to see your data

### Test Courses Page:

1. Go to: `http://localhost:3000/courses`
2. Courses added via Admin Dashboard should appear here

---

## 📊 Firebase Collections Structure

### **courses** collection:
```javascript
{
  title: string,
  description: string,
  instructor: string,
  level: string,
  price: number,
  duration: string,
  category: string,
  skillLevel: string,
  rating: number,
  reviews: number,
  image: string (emoji),
  isBestSeller: boolean,
  isFree: boolean,
  syllabus: array,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### **staff** collection:
```javascript
{
  name: string,
  position: string,
  email: string,
  phone: string,
  department: string,
  joiningDate: string,
  photo: string (emoji),
  createdAt: timestamp,
  updatedAt: timestamp
}
```

---

## 🔒 Production Security (Important!)

### For Production Deployment:

1. **Enable Authentication:**
   - Go to Firebase Console → Authentication
   - Enable Email/Password or Google Sign-In
   - Update security rules to require authentication

2. **Update Firestore Rules:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /courses/{courseId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null && 
                                     request.auth.token.admin == true;
    }
    
    match /staff/{staffId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null && 
                                     request.auth.token.admin == true;
    }
  }
}
```

3. **Set Admin Users:**
   - Use Firebase Admin SDK to set custom claims for admin users

---

## 💰 Firebase Pricing (Free Tier)

Your current setup uses:
- ✅ **Firestore Reads:** 50,000/day (FREE)
- ✅ **Firestore Writes:** 20,000/day (FREE)
- ✅ **Firestore Deletes:** 20,000/day (FREE)
- ✅ **Storage:** 1 GB (FREE)
- ✅ **Bandwidth:** 10 GB/month (FREE)

**Estimated Usage for Your Site:**
- 1000 visitors/day = ~5,000 reads/day
- Admin updates = ~100 writes/day
- **Result: Completely FREE! 🎉**

---

## 🐛 Troubleshooting

### Error: "Missing or insufficient permissions"
- Check Firestore Rules - make sure `allow read: if true;` is set
- Verify your Firebase config is correct

### Error: "Firebase: Firebase App named '[DEFAULT]' already exists"
- Clear browser cache and reload
- Check you're not initializing Firebase twice

### Courses not loading from Firebase
- Check browser console for errors
- Verify Firestore database is created and enabled
- Make sure you published Firestore Rules

### Data not saving
- Check Firebase Console → Firestore → Rules
- Temporarily set `allow write: if true;` for testing
- Check browser console for specific error messages

---

## 📞 Need Help?

1. Check [Firebase Documentation](https://firebase.google.com/docs/firestore)
2. Check [Firebase Console](https://console.firebase.google.com/)
3. Look at browser console (F12) for error messages

---

## ✨ Features Implemented

✅ Admin Dashboard connected to Firebase
✅ Add/Edit/Delete courses in real-time
✅ Add/Edit/Delete staff members
✅ Courses page loads from Firebase
✅ Fallback to static data if Firebase fails
✅ Loading states and error handling
✅ Success/error notifications
✅ Automatic timestamp tracking

---

**Next Steps:**
1. Set up Firebase project
2. Copy your config to `frontend/src/firebase/config.js`
3. Enable Firestore Database
4. Test adding a course from Admin Dashboard
5. See it appear on Courses page! 🎉
