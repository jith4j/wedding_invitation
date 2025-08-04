# Wedding Website Deployment Guide

## Overview
This guide will help you deploy your wedding website to your domain and hosting provider.

## Prerequisites
- Your domain name
- Hosting provider with cPanel/FTP access or static hosting service
- Built React application files

## Step 1: Build the React Application

1. **Navigate to the frontend directory:**
   ```bash
   cd /app/frontend
   ```

2. **Install dependencies (if not already done):**
   ```bash
   yarn install
   ```

3. **Build the production version:**
   ```bash
   yarn build
   ```

   This creates a `build` folder with optimized production files.

## Step 2: Prepare Backend (if needed)

If you're using a hosting provider that supports Python/FastAPI:

1. **Navigate to backend directory:**
   ```bash
   cd /app/backend
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

## Step 3: Deployment Options

### Option A: Static Hosting (Recommended for most cases)

**Best for:** Netlify, Vercel, GitHub Pages, or any static hosting

1. **Upload the build folder contents:**
   - Copy everything inside `/app/frontend/build/` 
   - Upload to your hosting provider's public folder (usually `public_html` or `www`)

2. **Configure redirects (for React Router):**
   Create a `_redirects` file in your build folder:
   ```
   /*    /index.html   200
   ```

### Option B: Traditional Web Hosting (cPanel/FTP)

**Best for:** Shared hosting providers like GoDaddy, Bluehost, HostGator

1. **Access your hosting control panel or FTP:**
   - Log into your hosting provider
   - Navigate to File Manager or use FTP client

2. **Upload files:**
   - Go to your domain's public folder (usually `public_html`)
   - Upload all contents from `/app/frontend/build/`
   - Ensure `index.html` is in the root of your public folder

3. **Configure .htaccess (for React Router):**
   Create a `.htaccess` file in your public folder:
   ```apache
   Options -MultiViews
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteRule ^ index.html [QR,L]
   ```

### Option C: Full Stack Deployment (Advanced)

**Best for:** VPS, DigitalOcean, AWS, Google Cloud

If you need the backend APIs for RSVP functionality:

1. **Frontend (Static Files):**
   - Deploy build folder to a CDN or static hosting
   - Update environment variables to point to your backend URL

2. **Backend (FastAPI Server):**
   - Deploy to a cloud service that supports Python
   - Configure environment variables:
     ```bash
     export OPENWEATHER_API_KEY="your_api_key"
     export SHEETDB_API_URL="your_sheetdb_url"
     ```
   - Run with: `uvicorn server:app --host 0.0.0.0 --port 8000`

## Step 4: Domain Configuration

1. **Point your domain to hosting:**
   - Update DNS settings with your domain registrar
   - Point A record to your hosting provider's IP
   - Or update nameservers if required

2. **SSL Certificate:**
   - Most hosting providers offer free SSL certificates
   - Enable HTTPS in your hosting control panel

## Step 5: Testing

1. **Visit your domain:**
   - Check that the website loads correctly
   - Test navigation between sections
   - Verify mobile responsiveness

2. **Test functionality:**
   - RSVP forms (if backend is deployed)
   - Contact forms
   - All external links (Google Maps, Calendar)

## Environment Variables

If deploying with backend functionality, ensure these are set:

### Frontend (.env)
```
REACT_APP_BACKEND_URL=https://your-backend-domain.com
```

### Backend (.env)
```
OPENWEATHER_API_KEY=your_openweather_key
SHEETDB_API_URL=your_sheetdb_url
EMAILJS_SERVICE_ID=your_emailjs_service_id
EMAILJS_TEMPLATE_ID=your_emailjs_template_id
EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

## Common Issues & Solutions

### Issue 1: 404 Errors on Page Refresh
**Solution:** Configure redirects (see Step 3 options above)

### Issue 2: Images Not Loading
**Solution:** Ensure all images are in the `public/images/` folder before building

### Issue 3: API Calls Failing
**Solution:** Check CORS settings in backend and verify API URLs

### Issue 4: Mobile Menu Not Working
**Solution:** Clear browser cache and ensure JavaScript is enabled

## Quick Deployment Checklist

- [ ] Build React app (`yarn build`)
- [ ] Upload build folder contents to hosting
- [ ] Configure redirects (.htaccess or _redirects)
- [ ] Point domain to hosting
- [ ] Enable SSL certificate
- [ ] Test website functionality
- [ ] Test on mobile devices

## Support

If you encounter issues:
1. Check browser console for errors
2. Verify all files uploaded correctly
3. Test on different browsers
4. Contact your hosting provider's support if needed

---

**Note:** This website works perfectly as a static site for most use cases. The backend is only needed if you want the RSVP form submissions to be stored in your SheetDB database. For simpler deployments, you can use the frontend only and direct RSVPs to email or phone.