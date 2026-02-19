# PiezoPulse - Installation & Troubleshooting Guide

## 📋 Prerequisites

Before you begin, ensure you have:
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- A modern web browser (Chrome, Firefox, Edge, Safari)
- A code editor (VS Code recommended)

### Check Your Installation
```bash
node --version  # Should show v16.x.x or higher
npm --version   # Should show 8.x.x or higher
```

## 🚀 Installation Steps

### Step 1: Navigate to Project Directory
```bash
cd path/to/piezopulse
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- React and React DOM
- React Router
- Recharts (for charts)
- Leaflet and React-Leaflet (for maps)
- Tailwind CSS and PostCSS
- Vite (build tool)

**Expected time:** 1-2 minutes

### Step 3: Start Development Server
```bash
npm run dev
```

You should see output like:
```
VITE v5.0.0  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Step 4: Open in Browser
Navigate to: **http://localhost:5173**

You should see the PiezoPulse login page!

## 🔧 Troubleshooting

### Issue: "npm: command not found"
**Solution:** Install Node.js from https://nodejs.org/

### Issue: Port 5173 already in use
**Solution:** 
```bash
# Kill the process using port 5173
# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Or use a different port:
npm run dev -- --port 3000
```

### Issue: "Cannot find module 'react'"
**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Blank white screen
**Solution:**
1. Check browser console for errors (F12)
2. Ensure all files are present in src/
3. Try clearing browser cache
4. Restart dev server

### Issue: Map not displaying
**Solution:**
1. Check if Leaflet CSS is loaded
2. Ensure internet connection (for map tiles)
3. Check browser console for errors
4. Verify lat/lng coordinates are valid

### Issue: Charts not rendering
**Solution:**
1. Ensure Recharts is installed: `npm list recharts`
2. Check if data is being passed correctly
3. Verify ResponsiveContainer has height set

### Issue: Tailwind styles not applying
**Solution:**
1. Verify tailwind.config.js exists
2. Check postcss.config.js is present
3. Ensure index.css has @tailwind directives
4. Restart dev server

## 🏗️ Build for Production

### Create Production Build
```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

### Preview Production Build
```bash
npm run preview
```

### Deploy to Hosting
The `dist/` folder can be deployed to:
- **Vercel**: `vercel deploy`
- **Netlify**: Drag & drop dist folder
- **GitHub Pages**: Push dist to gh-pages branch
- **Any static host**: Upload dist folder contents

## 📁 Project Structure Verification

Ensure you have these files:

```
piezopulse/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── KPICard.jsx
│   │   ├── Layout.jsx
│   │   └── StatusBadge.jsx
│   ├── data/
│   │   └── mockData.js
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── MapView.jsx
│   │   ├── Reports.jsx
│   │   ├── SiteDetail.jsx
│   │   └── Sites.jsx
│   ├── utils/
│   │   └── helpers.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## 🧪 Testing the Application

### 1. Test Login
- Select each role and verify access
- Check localStorage for saved user data

### 2. Test Dashboard
- Verify all 5 KPI cards display
- Check charts render correctly
- Test filters (date range, site type)

### 3. Test Sites Page
- Search for sites
- Apply filters
- Click rows to navigate

### 4. Test Site Detail
- Navigate through all 5 tabs
- Run optimization simulator
- Check charts and tables

### 5. Test Map View
- Verify map loads
- Click markers
- Test filters

### 6. Test Reports
- Generate a report
- Try exporting (should show mock alert)
- Test with different roles

### 7. Test RBAC
- Login as different roles
- Verify access restrictions
- Check disabled buttons for Auditor

## 🔍 Common Questions

### Q: Do I need a backend?
**A:** No! This is a fully offline prototype using mock data.

### Q: Can I modify the mock data?
**A:** Yes! Edit `src/data/mockData.js` to add/modify sites.

### Q: How do I add more sites?
**A:** Add objects to the `mockSites` array in `mockData.js` with the same structure.

### Q: Can I change the city?
**A:** Yes! Update the map center coordinates in `MapView.jsx` and modify site data.

### Q: How do I customize colors?
**A:** Edit `tailwind.config.js` to change the color palette.

### Q: Can I add authentication?
**A:** Currently uses localStorage. For real auth, integrate with a backend service.

### Q: Is this production-ready?
**A:** It's a prototype. For production, add:
- Real backend API
- Proper authentication
- Error handling
- Loading states
- Unit tests

## 🛠️ Development Tips

### Hot Reload
Vite provides instant hot module replacement. Save any file and see changes immediately.

### Browser DevTools
- **F12** - Open developer tools
- **Console** - Check for errors
- **Network** - Monitor requests
- **React DevTools** - Install extension for React debugging

### Code Formatting
Consider adding:
```bash
npm install -D prettier eslint
```

### Environment Variables
Create `.env` file for configuration:
```
VITE_APP_TITLE=PiezoPulse
VITE_API_URL=http://localhost:3000
```

## 📊 Performance Optimization

### If app feels slow:
1. Check browser extensions (disable ad blockers)
2. Close other tabs
3. Use production build (`npm run build`)
4. Optimize images/assets
5. Lazy load components

## 🔒 Security Notes

### For Production Deployment:
- Implement real authentication
- Add HTTPS
- Sanitize user inputs
- Add CORS policies
- Use environment variables for sensitive data
- Implement rate limiting
- Add security headers

## 📞 Getting Help

### Resources:
- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Recharts**: https://recharts.org
- **Leaflet**: https://leafletjs.com
- **Vite**: https://vitejs.dev

### Project Documentation:
- README.md - Overview
- SETUP.md - Features
- QUICKSTART.md - Quick start
- FEATURES.md - Checklist
- PROJECT_SUMMARY.md - Summary

## ✅ Installation Checklist

- [ ] Node.js installed (v16+)
- [ ] Project downloaded/cloned
- [ ] Dependencies installed (`npm install`)
- [ ] Dev server running (`npm run dev`)
- [ ] Browser opened to localhost:5173
- [ ] Login page visible
- [ ] Can login with any role
- [ ] Dashboard loads with data
- [ ] All pages accessible
- [ ] Charts rendering
- [ ] Map displaying
- [ ] No console errors

## 🎉 Success!

If you've completed the checklist above, you're all set!

**Next:** Check out QUICKSTART.md for a guided tour of features.

---

**Need more help?** Review the documentation files or check browser console for specific errors.
