# 🚀 Deployment Checklist

Use this checklist before deploying to production.

## ✅ Pre-Deployment Checklist

### 1. Code Quality
- [ ] Remove all `console.log()` statements from production code
- [ ] Remove commented-out code
- [ ] Check for TODO comments and resolve them
- [ ] Run linter and fix all warnings
- [ ] Code is properly formatted

### 2. Environment Variables
- [ ] `.env` file is NOT committed to Git
- [ ] `.env.example` is up to date
- [ ] All required environment variables are set in production
- [ ] Firebase credentials are correct
- [ ] API URLs point to production endpoints

### 3. Build & Test
- [ ] Run `npm run build` successfully
- [ ] Test the production build locally
- [ ] All tests pass (`npm test`)
- [ ] No build warnings or errors
- [ ] Check bundle size is optimized

### 4. Assets & Media
- [ ] All images are optimized (compressed)
- [ ] Favicon and app icons are set correctly
- [ ] Logo files are in correct formats (PNG for web)
- [ ] No unused assets in public folder
- [ ] manifest.json is configured properly

### 5. SEO & Meta Tags
- [ ] Page titles are descriptive
- [ ] Meta descriptions are set
- [ ] Open Graph tags for social sharing
- [ ] robots.txt is configured
- [ ] sitemap.xml is generated (if applicable)

### 6. Performance
- [ ] Images are lazy-loaded where appropriate
- [ ] Code splitting is implemented
- [ ] Unused dependencies are removed
- [ ] CSS is minified
- [ ] JavaScript is minified

### 7. Security
- [ ] Firebase security rules are deployed
- [ ] HTTPS is enforced
- [ ] CORS is configured properly
- [ ] No sensitive data in client-side code
- [ ] Authentication is working correctly

### 8. Firebase Configuration
- [ ] Firestore rules are deployed
- [ ] Firestore indexes are created
- [ ] Firebase Hosting is configured
- [ ] Custom domain is set up (if applicable)
- [ ] SSL certificate is active

### 9. Browser Compatibility
- [ ] Tested on Chrome
- [ ] Tested on Firefox
- [ ] Tested on Safari
- [ ] Tested on Edge
- [ ] Mobile responsive on iOS
- [ ] Mobile responsive on Android

### 10. Functionality Testing
- [ ] All navigation links work
- [ ] Forms submit correctly
- [ ] Authentication (login/logout) works
- [ ] Contact form sends emails
- [ ] All pages load without errors
- [ ] No 404 errors on routes

## 🚀 Deployment Steps

### Firebase Hosting

```bash
# 1. Build the project
cd frontend
npm run build

# 2. Test the build locally (optional)
npx serve -s build

# 3. Deploy to Firebase
firebase deploy --only hosting

# 4. Verify deployment
# Visit your live URL and test
```

### Vercel Deployment

```bash
# 1. Build the project
cd frontend
npm run build

# 2. Deploy
vercel --prod

# 3. Set environment variables in Vercel dashboard
```

### Netlify Deployment

```bash
# 1. Build the project
cd frontend
npm run build

# 2. Deploy
netlify deploy --prod --dir=build

# 3. Set environment variables in Netlify dashboard
```

## 📊 Post-Deployment Checklist

- [ ] Website loads correctly at production URL
- [ ] All pages are accessible
- [ ] Forms work correctly
- [ ] Authentication works
- [ ] No console errors in browser
- [ ] Mobile version works properly
- [ ] PWA installation works
- [ ] Analytics are tracking (if configured)
- [ ] Performance is acceptable (use Lighthouse)
- [ ] SEO score is good (use Lighthouse)

## 🔍 Monitoring

After deployment, monitor:
- [ ] Firebase Console for errors
- [ ] Browser console for JavaScript errors
- [ ] Network tab for failed requests
- [ ] User feedback and bug reports
- [ ] Performance metrics
- [ ] Analytics data

## 🆘 Rollback Plan

If something goes wrong:

```bash
# Firebase: Deploy previous version
firebase hosting:clone SOURCE_SITE_ID:SOURCE_CHANNEL_ID TARGET_SITE_ID:live

# Or redeploy from previous commit
git checkout <previous-commit-hash>
cd frontend
npm run build
firebase deploy --only hosting
```

## 📝 Notes

- Always test in a staging environment first
- Keep a backup of the previous deployment
- Document any issues encountered
- Update this checklist as needed

---

**Last Updated**: 2026-02-07
**Deployment Platform**: Firebase Hosting / Vercel / Netlify
