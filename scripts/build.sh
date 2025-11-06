#!/bin/bash

# Build script for Lume Studio Next.js application

set -e

echo "🚀 Starting build process..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run type checking
echo "🔍 Running type checking..."
npm run type-check

# Run linting
echo "🧹 Running linting..."
npm run lint

# Run tests (if available)
if npm run test --silent 2>/dev/null; then
    echo "🧪 Running tests..."
    npm run test
else
    echo "⚠️  No tests found, skipping..."
fi

# Build the application
echo "🏗️  Building application..."
npm run build

# Check if build was successful
if [ -d ".next" ]; then
    echo "✅ Build completed successfully!"
    echo "📁 Build artifacts are in the .next directory"
else
    echo "❌ Build failed!"
    exit 1
fi

# Generate sitemap and robots.txt (if scripts exist)
if [ -f "scripts/generate-sitemap.js" ]; then
    echo "🗺️  Generating sitemap..."
    node scripts/generate-sitemap.js
fi

if [ -f "scripts/generate-robots.js" ]; then
    echo "🤖  Generating robots.txt..."
    node scripts/generate-robots.js
fi

# Optimize images (if sharp is installed)
if npm list sharp --silent 2>/dev/null; then
    echo "🖼️  Optimizing images..."
    node scripts/optimize-images.js
else
    echo "⚠️  Sharp not found, skipping image optimization..."
fi

# Generate bundle analysis
if npm list @next/bundle-analyzer --silent 2>/dev/null; then
    echo "📊 Generating bundle analysis..."
    npm run analyze
else
    echo "⚠️  Bundle analyzer not found, skipping..."
fi

echo "🎉 Build process completed successfully!"
echo "🚀 Ready for deployment!"
