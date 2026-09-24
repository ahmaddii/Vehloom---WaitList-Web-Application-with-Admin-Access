#!/bin/bash

# Vehloom Response Management System - Quick Setup Script
# This script guides you through the setup process

echo "=================================="
echo "Vehloom Admin Dashboard Setup"
echo "=================================="
echo ""

# Check if .env file exists
if [ -f .env ]; then
    echo "✓ .env file found"
else
    echo "✗ .env file not found"
    echo "Please create a .env file with the following variables:"
    echo ""
    echo "VITE_SUPABASE_URL=your_supabase_url"
    echo "VITE_SUPABASE_ANON_KEY=your_supabase_anon_key"
    echo "VITE_ADMIN_PASSWORD=your_admin_password"
    echo ""
    exit 1
fi

echo ""
echo "📋 Setup Checklist:"
echo "=================================="
echo ""

echo "1. Database Setup"
echo "   ☐ Go to Supabase Dashboard → SQL Editor"
echo "   ☐ Run the SQL from: supabase-setup.sql"
echo "   ☐ Tables to be created:"
echo "     - help_center_queries"
echo "     - problem_reports"
echo ""

echo "2. Storage Setup (Optional)"
echo "   ☐ Go to Supabase Dashboard → Storage"
echo "   ☐ Create bucket: 'problem-reports'"
echo "   ☐ Set it to Public"
echo ""

echo "3. Environment Variables"
echo "   ☐ Update .env with Supabase credentials"
echo "   ☐ Set strong VITE_ADMIN_PASSWORD"
echo ""

echo "4. Test the Application"
echo "   ☐ Run: npm run dev"
echo "   ☐ Visit: http://localhost:5173/help-center"
echo "   ☐ Submit a test form"
echo "   ☐ Visit: http://localhost:5173/admin"
echo "   ☐ Login with your admin password"
echo "   ☐ Verify test data appears in dashboard"
echo ""

echo "5. Deployment"
echo "   ☐ Run: npm run build"
echo "   ☐ Deploy to your hosting platform"
echo ""

echo "=================================="
echo "✓ Setup Guide Complete!"
echo "=================================="
echo ""
echo "📖 For detailed instructions, read: ADMIN_SETUP_GUIDE.md"
echo ""
echo "🔗 Pages Created:"
echo "   - /help-center     → Help & Support"
echo "   - /report-problem  → Report Issues"
echo "   - /terms           → Terms & Conditions"
echo "   - /privacy         → Privacy Policy"
echo "   - /admin           → Admin Dashboard"
echo ""
