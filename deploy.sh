#!/bin/bash

# Burn Rate Dashboard - Deployment Script
echo "🚀 Starting deployment process..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit: Burn Rate Dashboard"
    echo "✅ Git repository initialized"
fi

# Build the project
echo "🔨 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

# Check if dist folder exists
if [ -d "dist" ]; then
    echo "📁 Build output found in dist/"
    echo "📊 Build size:"
    du -sh dist/
else
    echo "❌ Build output not found!"
    exit 1
fi

echo ""
echo "🎉 Ready for deployment!"
echo ""
echo "📋 Next steps:"
echo "1. Push to GitHub:"
echo "   git add ."
echo "   git commit -m 'Ready for deployment'"
echo "   git push origin main"
echo ""
echo "2. Deploy to Netlify:"
echo "   - Connect your GitHub repo to Netlify"
echo "   - Build command: npm run build"
echo "   - Publish directory: dist"
echo "   - Or drag & drop the 'dist' folder to Netlify"
echo ""
echo "3. Manual deployment:"
echo "   - Upload the 'dist' folder to Netlify"
echo "   - Or use: netlify deploy --prod --dir=dist"
echo ""
echo "🌐 Your dashboard will be live at: https://your-app-name.netlify.app"
