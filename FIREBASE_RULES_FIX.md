# Firebase Rules Not Showing - Quick Fix

## Problem: "Rules" tab nahi dikh raha hai

Ye tab isliye nahi dikh raha kyunki:
1. Database "Production mode" me create hua hai
2. Ya phir Realtime Database use ho raha hai instead of Firestore

## Solution:

### Step 1: Confirm Firestore Database
1. Left sidebar me "Firestore Database" hona chahiye (not "Realtime Database")
2. Agar "Realtime Database" hai, to naya Firestore database create karo

### Step 2: Direct Rules URL
Try this direct link to access rules:
https://console.firebase.google.com/project/spangle-edu/firestore/rules

### Step 3: Alternative - Firebase CLI se rules deploy karo

```bash
# Install Firebase CLI (if not installed)
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init firestore

# Deploy rules
firebase deploy --only firestore:rules
```

### Step 4: Default Rules (Copy these manually in console)

If you can access rules through any method, paste this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /courses/{courseId} {
      allow read: if true;
      allow write: if true;
    }
    
    match /staff/{staffId} {
      allow read: if true;
      allow write: if true;
    }
  }
}
```

### Step 5: Temporary Workaround

For testing, you can work with default rules. The app will still work if:
- Database is created
- You're in test mode (automatically expires in 30 days)
- Or production mode with default "deny all" (you'll see permission errors)

### Step 6: Check Current Rules via Firebase Console

1. Go to: https://console.firebase.google.com/project/spangle-edu
2. Click "Firestore Database" in left sidebar
3. Look for tabs at the top: Data, Indexes, etc.
4. If "Rules" tab missing, use Firebase CLI method above
