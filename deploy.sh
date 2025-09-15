#!/bin/bash

# E-Commerce Platform Deployment Script
# سكريبت نشر منصة التجارة الإلكترونية

echo "🚀 بدء عملية النشر - Starting Deployment Process"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if required tools are installed
check_dependencies() {
    print_info "فحص التبعيات المطلوبة - Checking dependencies..."
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js غير مثبت - Node.js is not installed"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        print_error "npm غير مثبت - npm is not installed"
        exit 1
    fi
    
    if ! command -v git &> /dev/null; then
        print_error "Git غير مثبت - Git is not installed"
        exit 1
    fi
    
    print_status "جميع التبعيات متوفرة - All dependencies are available"
}

# Install project dependencies
install_dependencies() {
    print_info "تثبيت تبعيات المشروع - Installing project dependencies..."
    
    # Root dependencies
    npm install
    
    # Frontend dependencies
    cd frontend
    npm install --legacy-peer-deps
    cd ..
    
    # Backend dependencies
    cd backend
    npm install
    cd ..
    
    # POS System dependencies
    cd pos-system
    npm install --legacy-peer-deps
    cd ..
    
    # KDS System dependencies
    cd kds-system
    npm install --legacy-peer-deps
    cd ..
    
    # Driver App dependencies
    cd driver-app
    npm install --legacy-peer-deps
    cd ..
    
    print_status "تم تثبيت جميع التبعيات - All dependencies installed"
}

# Build all projects
build_projects() {
    print_info "بناء المشاريع - Building projects..."
    
    # Build Frontend
    print_info "بناء الواجهة الأمامية - Building Frontend..."
    cd frontend
    npm run build
    cd ..
    
    # Build Backend
    print_info "بناء الخادم الخلفي - Building Backend..."
    cd backend
    npm run build
    cd ..
    
    # Build POS System
    print_info "بناء نظام نقاط البيع - Building POS System..."
    cd pos-system
    npm run build
    cd ..
    
    # Build KDS System
    print_info "بناء نظام شاشة المطبخ - Building KDS System..."
    cd kds-system
    npm run build
    cd ..
    
    # Build Driver App
    print_info "بناء تطبيق السائق - Building Driver App..."
    cd driver-app
    npm run build
    cd ..
    
    print_status "تم بناء جميع المشاريع - All projects built successfully"
}

# Setup environment files
setup_environment() {
    print_info "إعداد ملفات البيئة - Setting up environment files..."
    
    # Check if .env files exist
    if [ ! -f "frontend/.env.local" ]; then
        print_warning "ملف البيئة للواجهة الأمامية غير موجود - Frontend .env.local not found"
        cp frontend/.env.example frontend/.env.local
        print_info "تم إنشاء ملف البيئة من المثال - Created .env.local from example"
    fi
    
    if [ ! -f "backend/.env" ]; then
        print_warning "ملف البيئة للخادم الخلفي غير موجود - Backend .env not found"
        cp backend/.env.example backend/.env
        print_info "تم إنشاء ملف البيئة من المثال - Created .env from example"
    fi
    
    print_status "تم إعداد ملفات البيئة - Environment files configured"
}

# Deploy to Vercel
deploy_to_vercel() {
    print_info "النشر على Vercel - Deploying to Vercel..."
    
    # Check if Vercel CLI is installed
    if ! command -v vercel &> /dev/null; then
        print_info "تثبيت Vercel CLI - Installing Vercel CLI..."
        npm install -g vercel
    fi
    
    # Deploy Frontend
    print_info "نشر الواجهة الأمامية - Deploying Frontend..."
    cd frontend
    vercel --prod --confirm
    cd ..
    
    # Deploy POS System
    print_info "نشر نظام نقاط البيع - Deploying POS System..."
    cd pos-system
    vercel --prod --confirm
    cd ..
    
    # Deploy KDS System
    print_info "نشر نظام شاشة المطبخ - Deploying KDS System..."
    cd kds-system
    vercel --prod --confirm
    cd ..
    
    # Deploy Driver App
    print_info "نشر تطبيق السائق - Deploying Driver App..."
    cd driver-app
    vercel --prod --confirm
    cd ..
    
    print_status "تم النشر على Vercel - Deployed to Vercel successfully"
}

# Deploy to Railway
deploy_to_railway() {
    print_info "النشر على Railway - Deploying to Railway..."
    
    # Check if Railway CLI is installed
    if ! command -v railway &> /dev/null; then
        print_info "تثبيت Railway CLI - Installing Railway CLI..."
        npm install -g @railway/cli
    fi
    
    # Deploy Backend
    print_info "نشر الخادم الخلفي - Deploying Backend..."
    cd backend
    railway up
    cd ..
    
    print_status "تم النشر على Railway - Deployed to Railway successfully"
}

# Setup Firebase
setup_firebase() {
    print_info "إعداد Firebase - Setting up Firebase..."
    
    # Check if Firebase CLI is installed
    if ! command -v firebase &> /dev/null; then
        print_info "تثبيت Firebase CLI - Installing Firebase CLI..."
        npm install -g firebase-tools
    fi
    
    # Initialize Firebase if not already done
    if [ ! -f "firebase.json" ]; then
        print_info "تهيئة Firebase - Initializing Firebase..."
        firebase init
    fi
    
    print_status "تم إعداد Firebase - Firebase configured"
}

# Setup Supabase
setup_supabase() {
    print_info "إعداد Supabase - Setting up Supabase..."
    
    print_warning "يرجى تشغيل schema قاعدة البيانات يدوياً في Supabase"
    print_warning "Please run the database schema manually in Supabase"
    print_info "الملف: config/database-schema.sql"
    print_info "File: config/database-schema.sql"
    
    print_status "تم إعداد Supabase - Supabase configured"
}

# Main deployment function
main_deploy() {
    echo "اختر نوع النشر - Choose deployment type:"
    echo "1) نشر كامل - Full deployment"
    echo "2) نشر الواجهة الأمامية فقط - Frontend only"
    echo "3) نشر الخادم الخلفي فقط - Backend only"
    echo "4) إعداد البيئة فقط - Environment setup only"
    
    read -p "اختر رقم (1-4): " choice
    
    case $choice in
        1)
            print_info "بدء النشر الكامل - Starting full deployment..."
            check_dependencies
            setup_environment
            install_dependencies
            build_projects
            setup_firebase
            setup_supabase
            deploy_to_vercel
            deploy_to_railway
            ;;
        2)
            print_info "نشر الواجهة الأمامية - Deploying frontend only..."
            check_dependencies
            setup_environment
            cd frontend && npm install --legacy-peer-deps && npm run build && cd ..
            cd pos-system && npm install --legacy-peer-deps && npm run build && cd ..
            cd kds-system && npm install --legacy-peer-deps && npm run build && cd ..
            cd driver-app && npm install --legacy-peer-deps && npm run build && cd ..
            deploy_to_vercel
            ;;
        3)
            print_info "نشر الخادم الخلفي - Deploying backend only..."
            check_dependencies
            setup_environment
            cd backend && npm install && npm run build && cd ..
            deploy_to_railway
            ;;
        4)
            print_info "إعداد البيئة - Setting up environment..."
            check_dependencies
            setup_environment
            setup_firebase
            setup_supabase
            ;;
        *)
            print_error "اختيار غير صحيح - Invalid choice"
            exit 1
            ;;
    esac
}

# Display deployment URLs
show_deployment_urls() {
    echo ""
    echo "🌐 روابط النشر - Deployment URLs:"
    echo "=================================="
    echo "📱 الموقع الرئيسي - Main Website: https://your-store.vercel.app"
    echo "🛒 نظام نقاط البيع - POS System: https://pos-your-store.vercel.app"
    echo "🍳 شاشة المطبخ - KDS System: https://kds-your-store.vercel.app"
    echo "🚚 تطبيق السائق - Driver App: https://driver-your-store.vercel.app"
    echo "⚙️ الخادم الخلفي - Backend API: https://your-api.railway.app"
    echo ""
    echo "📋 المهام التالية - Next Steps:"
    echo "1. تحديث متغيرات البيئة بالروابط الفعلية"
    echo "2. إعداد النطاقات المخصصة"
    echo "3. تشغيل schema قاعدة البيانات"
    echo "4. اختبار جميع الوظائف"
    echo ""
}

# Error handling
set -e
trap 'print_error "حدث خطأ في السطر $LINENO - Error occurred at line $LINENO"' ERR

# Start deployment
echo "🚀 مرحباً بك في سكريبت نشر منصة التجارة الإلكترونية"
echo "🚀 Welcome to E-Commerce Platform Deployment Script"
echo ""

main_deploy

print_status "تم النشر بنجاح! - Deployment completed successfully!"
show_deployment_urls

echo ""
echo "🎉 تهانينا! تم نشر منصة التجارة الإلكترونية بنجاح"
echo "🎉 Congratulations! E-Commerce Platform deployed successfully"
