# منصة التجارة الإلكترونية - E-Commerce Platform

[![Arabic Support](https://img.shields.io/badge/Arabic-RTL%20Support-green)](https://github.com/hajshihab/modo1)
[![Multi-Language](https://img.shields.io/badge/Languages-4%20Supported-blue)](https://github.com/hajshihab/modo1)
[![License](https://img.shields.io/badge/License-MIT-yellow)](https://github.com/hajshihab/modo1)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-success)](https://github.com/hajshihab/modo1)

## 🌟 نظرة عامة | Overview

منصة تجارة إلكترونية شاملة متعددة البائعين مع دعم كامل للغة العربية ونظام RTL. تتضمن المنصة جميع الأدوات اللازمة لإدارة متجر إلكتروني حديث مع تطبيقات متخصصة للتجار والسائقين ونقاط البيع.

A comprehensive multi-vendor e-commerce platform with full Arabic language support and RTL system. The platform includes all necessary tools for managing a modern online store with specialized applications for merchants, drivers, and point of sale.

## 🚀 الميزات الرئيسية | Key Features

### ✅ **المنصة الأساسية | Core Platform**
- 🛍️ **متجر متعدد البائعين** - Multi-vendor marketplace
- 🌍 **دعم 4 لغات** - Arabic (RTL), English, French, Dutch
- 📱 **تصميم متجاوب** - Fully responsive design
- 🔐 **نظام أمان متقدم** - Advanced security system
- 💳 **بوابات دفع متعددة** - Multiple payment gateways
- 🚚 **نظام توصيل متكامل** - Integrated delivery system

### 🏪 **تطبيقات متخصصة | Specialized Applications**
1. **الموقع الرئيسي** - Main E-commerce Website
2. **لوحة التاجر** - Merchant Dashboard
3. **نظام نقاط البيع (POS)** - Point of Sale System
4. **شاشة المطبخ (KDS)** - Kitchen Display System
5. **تطبيق السائق** - Driver Delivery App
6. **لوحة السوبر أدمن** - Super Admin Panel

### 🛠️ **التقنيات المستخدمة | Tech Stack**
- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Express.js, Node.js, TypeScript
- **Database**: PostgreSQL (Supabase), Firestore (Firebase)
- **Authentication**: Firebase Auth
- **Storage**: Supabase Storage, Firebase Storage
- **Payments**: Stripe, PayPal
- **Analytics**: Google Analytics, Facebook Pixel
- **AI**: OpenAI API integration

## 📁 هيكل المشروع | Project Structure

```
ecommerce-platform/
├── 🌐 frontend/              # Next.js main website
├── 🖥️ frontend-simple/       # HTML demo (working)
├── ⚙️ backend/               # Express.js API server
├── 🛒 pos-system/            # Point of Sale system
├── 🍳 kds-system/            # Kitchen Display System
├── 🚚 driver-app/            # Delivery driver app
├── 🛡️ super-admin/           # Super Admin panel
├── 🔧 shared/                # Shared utilities and types
├── ⚙️ config/                # Configuration files
├── 📊 data/                  # Sample data and products
└── 📚 docs/                  # Documentation
```

## 🎯 التطبيقات والمنافذ | Applications & Ports

| التطبيق | Application | المنفذ | Port | الحالة | Status |
|---------|-------------|--------|------|--------|---------|
| الموقع الرئيسي | Main Website | 3000 | ✅ Ready |
| الخادم الخلفي | Backend API | 3001 | ✅ Ready |
| نقاط البيع | POS System | 3002 | ✅ Ready |
| شاشة المطبخ | KDS System | 3003 | ✅ Ready |
| تطبيق السائق | Driver App | 3004 | ✅ Ready |
| السوبر أدمن | Super Admin | - | ✅ Ready |

## 🚀 التثبيت والتشغيل | Installation & Setup

### المتطلبات الأساسية | Prerequisites
- Node.js 18+
- npm أو yarn
- Firebase CLI
- Supabase CLI

### 1. استنساخ المشروع | Clone Repository
```bash
git clone https://github.com/hajshihab/modo1.git
cd modo1
```

### 2. تثبيت التبعيات | Install Dependencies
```bash
# Install all dependencies
npm run install:all

# Or install individually
npm install
cd frontend && npm install
cd ../backend && npm install
cd ../pos-system && npm install
cd ../kds-system && npm install
cd ../driver-app && npm install
```

### 3. إعداد متغيرات البيئة | Environment Setup
```bash
# Copy environment template
cp .env.example .env.local

# Configure your environment variables
# Firebase, Supabase, Payment gateways, etc.
```

### 4. تشغيل التطبيقات | Run Applications
```bash
# Start all applications
npm run dev

# Or start individually
npm run dev:frontend    # Port 3000
npm run dev:backend     # Port 3001
npm run dev:pos         # Port 3002
npm run dev:kds         # Port 3003
npm run dev:driver      # Port 3004
```

### 5. الوصول للتطبيقات | Access Applications
- **الموقع الرئيسي**: http://localhost:3000
- **لوحة التاجر**: http://localhost:3000/dashboard
- **نقاط البيع**: http://localhost:3002
- **شاشة المطبخ**: http://localhost:3003
- **تطبيق السائق**: http://localhost:3004
- **السوبر أدمن**: Open `super-admin/index.html`

## 🌍 الدعم متعدد اللغات | Multi-Language Support

### اللغات المدعومة | Supported Languages
- 🇸🇦 **العربية** - Arabic (RTL)
- 🇺🇸 **English** - English (LTR)
- 🇫🇷 **Français** - French (LTR)
- 🇳🇱 **Nederlands** - Dutch (LTR)

### تبديل اللغة | Language Switching
يمكن تبديل اللغة من خلال القائمة المنسدلة في أعلى الصفحة أو برمجياً عبر API.

Language can be switched through the dropdown menu at the top of the page or programmatically via API.

## 💾 قاعدة البيانات | Database

### الجداول الرئيسية | Main Tables
- `users` - المستخدمين
- `stores` - المتاجر
- `products` - المنتجات
- `orders` - الطلبات
- `payments` - المدفوعات
- `deliveries` - التوصيلات
- `reviews` - التقييمات
- `coupons` - الكوبونات

### البيانات التجريبية | Sample Data
يتضمن المشروع بيانات تجريبية شاملة في `data/sample-products.json`:
- 8 منتجات متنوعة
- 6 فئات رئيسية
- 8 متاجر مختلفة

## 🔐 الأمان | Security

- 🔒 **Firebase Authentication** - نظام مصادقة آمن
- 🛡️ **Row Level Security** - أمان على مستوى الصفوف
- 🔐 **JWT Tokens** - رموز مصادقة آمنة
- 🚫 **Rate Limiting** - تحديد معدل الطلبات
- 🔍 **Input Validation** - التحقق من المدخلات

## 💳 بوابات الدفع | Payment Gateways

### المدعومة حالياً | Currently Supported
- ✅ **Stripe** - بطاقات ائتمان عالمية
- ✅ **PayPal** - محافظ رقمية
- 🔄 **Apple Pay** - قيد التطوير
- 🔄 **Google Pay** - قيد التطوير
- 🔄 **الدفع عند الاستلام** - قيد التطوير

## 📊 التحليلات | Analytics

- 📈 **Google Analytics** - تحليلات الموقع
- 📘 **Facebook Pixel** - تتبع التحويلات
- 📊 **Custom Dashboard** - لوحة تحكم مخصصة
- 🤖 **AI Insights** - رؤى ذكية

## 🚚 نظام التوصيل | Delivery System

### الميزات | Features
- 📍 **تتبع الموقع الحي** - Real-time location tracking
- 🗺️ **تحسين المسارات** - Route optimization
- 📱 **تطبيق السائق** - Dedicated driver app
- 📞 **التواصل المباشر** - Direct communication
- ⏱️ **تقدير أوقات التسليم** - Delivery time estimation

## 🛒 نظام نقاط البيع (POS) | Point of Sale System

### الوظائف | Functions
- 💰 **معالجة المبيعات** - Sales processing
- 📦 **إدارة المخزون** - Inventory management
- 🧾 **طباعة الفواتير** - Receipt printing
- 📊 **تقارير المبيعات** - Sales reports
- 👥 **إدارة العملاء** - Customer management

## 🍳 شاشة المطبخ (KDS) | Kitchen Display System

### المميزات | Features
- 📋 **عرض الطلبات** - Order display
- ⏰ **إدارة الأوقات** - Time management
- 🔄 **تحديث الحالة** - Status updates
- 🎯 **ترتيب الأولويات** - Priority ordering
- 📊 **إحصائيات الأداء** - Performance statistics

## 🛡️ لوحة السوبر أدمن | Super Admin Panel

### الصلاحيات الكاملة | Full Permissions
- 👥 **إدارة المستخدمين** - User management
- 🏪 **إدارة المتاجر** - Store management
- 📦 **إدارة المنتجات** - Product management
- 🛒 **إدارة الطلبات** - Order management
- 💳 **إدارة المدفوعات** - Payment management
- 🚚 **إدارة التوصيل** - Delivery management
- 📈 **التحليلات والتقارير** - Analytics & Reports
- ⚙️ **إعدادات النظام** - System settings
- 🔒 **الأمان والصلاحيات** - Security & Permissions

## 🧪 الاختبار | Testing

### تم اختباره بنجاح | Successfully Tested
- ✅ **دعم اللغة العربية RTL** - Arabic RTL support
- ✅ **تبديل اللغات** - Language switching
- ✅ **التصميم المتجاوب** - Responsive design
- ✅ **واجهة المستخدم** - User interface
- ✅ **التنقل والوظائف** - Navigation & functionality

### للاختبار | To Test
```bash
# Open the working demo
open frontend-simple/index.html

# Or test individual components
npm test
```

## 🚀 النشر | Deployment

### منصات مدعومة | Supported Platforms
- ✅ **Vercel** - للواجهة الأمامية
- ✅ **Railway** - للخادم الخلفي
- ✅ **Firebase Hosting** - للاستضافة
- ✅ **Docker** - للحاويات
- ✅ **GitHub Actions** - للنشر التلقائي

### أوامر النشر | Deployment Commands
```bash
# Build for production
npm run build

# Deploy to Vercel
vercel --prod

# Deploy to Railway
railway up

# Deploy with Docker
docker-compose up -d
```

## 📚 التوثيق | Documentation

- 📖 [دليل التثبيت](INSTALLATION.md) - Installation Guide
- 🚀 [دليل النشر](DEPLOYMENT_GUIDE.md) - Deployment Guide
- 🧪 [دليل الاختبار](TESTING_GUIDE.md) - Testing Guide
- 🔧 [دليل الإصلاح السريع](QUICK_FIX_GUIDE.md) - Quick Fix Guide
- 🏠 [إعداد الاستضافة](HOSTING_SETUP.md) - Hosting Setup

## 🤝 المساهمة | Contributing

نرحب بالمساهمات! يرجى قراءة دليل المساهمة قبل تقديم طلبات السحب.

We welcome contributions! Please read the contributing guide before submitting pull requests.

### خطوات المساهمة | Contribution Steps
1. Fork المشروع
2. إنشاء فرع للميزة (`git checkout -b feature/AmazingFeature`)
3. Commit التغييرات (`git commit -m 'Add some AmazingFeature'`)
4. Push للفرع (`git push origin feature/AmazingFeature`)
5. فتح Pull Request

## 📄 الترخيص | License

هذا المشروع مرخص تحت رخصة MIT - انظر ملف [LICENSE](LICENSE) للتفاصيل.

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 الدعم | Support

- 📧 **البريد الإلكتروني**: support@ecommerce-platform.com
- 💬 **Discord**: [انضم لخادمنا](https://discord.gg/ecommerce)
- 📱 **تليجرام**: [@ecommerce_support](https://t.me/ecommerce_support)
- 🐛 **تقرير الأخطاء**: [GitHub Issues](https://github.com/hajshihab/modo1/issues)

## 🌟 المطورون | Developers

- **المطور الرئيسي**: [hajshihab](https://github.com/hajshihab)
- **فريق التطوير**: E-Commerce Platform Team

## 📊 إحصائيات المشروع | Project Stats

- 📁 **إجمالي الملفات**: 100+ files
- 💻 **أسطر الكود**: 10,000+ lines
- 🌍 **اللغات المدعومة**: 4 languages
- 📱 **التطبيقات**: 6 specialized apps
- 🗄️ **جداول قاعدة البيانات**: 15+ tables
- 🔌 **نقاط API**: 50+ endpoints
- ⭐ **الميزات الرئيسية**: 20+ major features

## 🎉 شكر خاص | Special Thanks

شكر خاص لجميع المساهمين والمطورين الذين ساعدوا في إنجاز هذا المشروع الضخم.

Special thanks to all contributors and developers who helped make this massive project possible.

---

<div align="center">

**🚀 منصة التجارة الإلكترونية - جاهزة للإنتاج! 🚀**

**E-Commerce Platform - Production Ready!**

[![GitHub Stars](https://img.shields.io/github/stars/hajshihab/modo1?style=social)](https://github.com/hajshihab/modo1/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/hajshihab/modo1?style=social)](https://github.com/hajshihab/modo1/network/members)
[![GitHub Issues](https://img.shields.io/github/issues/hajshihab/modo1)](https://github.com/hajshihab/modo1/issues)

</div>
#   m o d o 1  
 