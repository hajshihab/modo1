# دليل النشر والاستضافة - Deployment Guide

## 🚀 خطة النشر الشاملة

### المرحلة الأولى: إعداد الخدمات السحابية

#### 1. إعداد Firebase
```bash
# تثبيت Firebase CLI
npm install -g firebase-tools

# تسجيل الدخول
firebase login

# إنشاء مشروع جديد
firebase init
```

**الخدمات المطلوبة:**
- Authentication (المصادقة)
- Firestore Database (قاعدة البيانات)
- Storage (التخزين)
- Hosting (الاستضافة)
- Functions (الوظائف)

#### 2. إعداد Supabase
1. إنشاء حساب على [supabase.com](https://supabase.com)
2. إنشاء مشروع جديد
3. تشغيل schema من `config/database-schema.sql`
4. نسخ URL و API Keys

#### 3. إعداد Vercel للفرونت إند
```bash
# تثبيت Vercel CLI
npm install -g vercel

# تسجيل الدخول
vercel login

# نشر المشروع
vercel --prod
```

### المرحلة الثانية: إعداد متغيرات البيئة

#### Frontend (.env.local)
```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# App URLs
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NEXT_PUBLIC_API_URL=https://your-api.railway.app
```

#### Backend (.env)
```env
# Database
DATABASE_URL=postgresql://postgres:password@db.your-project.supabase.co:5432/postgres
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Firebase Admin
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Key\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com

# Security
JWT_SECRET=your-super-secret-jwt-key
```

### المرحلة الثالثة: خطة الاستضافة

#### 1. Frontend (Vercel) - مجاني
- **الموقع الرئيسي**: `https://your-store.vercel.app`
- **لوحة التحكم**: `https://dashboard-your-store.vercel.app`
- **نظام POS**: `https://pos-your-store.vercel.app`
- **نظام KDS**: `https://kds-your-store.vercel.app`
- **تطبيق السائق**: `https://driver-your-store.vercel.app`

#### 2. Backend API (Railway) - $5/شهر
- **API Server**: `https://your-api.railway.app`
- **Socket.io**: Real-time connections
- **File Upload**: Handling

#### 3. Database (Supabase) - مجاني حتى 500MB
- **PostgreSQL**: Main database
- **Storage**: File storage
- **Realtime**: Live updates

#### 4. Authentication (Firebase) - مجاني حتى 10K users
- **Auth**: User management
- **Functions**: Server logic

### المرحلة الرابعة: سكريبت النشر التلقائي

#### package.json (Root)
```json
{
  "scripts": {
    "deploy": "npm run deploy:frontend && npm run deploy:backend",
    "deploy:frontend": "cd frontend && vercel --prod",
    "deploy:backend": "cd backend && railway up",
    "deploy:pos": "cd pos-system && vercel --prod",
    "deploy:kds": "cd kds-system && vercel --prod",
    "deploy:driver": "cd driver-app && vercel --prod",
    "deploy:all": "npm run deploy:frontend && npm run deploy:pos && npm run deploy:kds && npm run deploy:driver && npm run deploy:backend"
  }
}
```

### المرحلة الخامسة: إعداد CI/CD مع GitHub Actions

#### .github/workflows/deploy.yml
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm run install:all
      
    - name: Build projects
      run: npm run build
      
    - name: Deploy Frontend
      run: npx vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
      
    - name: Deploy Backend
      run: railway up
      env:
        RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
```

### المرحلة السادسة: إعداد النطاقات المخصصة

#### 1. شراء النطاق
- **النطاق الرئيسي**: `yourstore.com`
- **النطاقات الفرعية**:
  - `api.yourstore.com` (Backend)
  - `pos.yourstore.com` (POS System)
  - `kds.yourstore.com` (Kitchen Display)
  - `driver.yourstore.com` (Driver App)
  - `admin.yourstore.com` (Admin Dashboard)

#### 2. إعداد DNS
```
A     @           76.76.19.19
CNAME api         your-api.railway.app
CNAME pos         pos-your-store.vercel.app
CNAME kds         kds-your-store.vercel.app
CNAME driver      driver-your-store.vercel.app
CNAME admin       dashboard-your-store.vercel.app
```

### المرحلة السابعة: إعداد المراقبة والتحليلات

#### 1. Google Analytics
```javascript
// في كل تطبيق
gtag('config', 'GA_MEASUREMENT_ID');
```

#### 2. Sentry للأخطاء
```bash
npm install @sentry/nextjs @sentry/node
```

#### 3. Uptime Monitoring
- **UptimeRobot**: مراقبة مجانية
- **Pingdom**: مراقبة متقدمة

### المرحلة الثامنة: الأمان والحماية

#### 1. SSL Certificates
- Vercel: تلقائي
- Railway: تلقائي
- Cloudflare: إضافي

#### 2. Rate Limiting
```javascript
// في Backend
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
```

#### 3. CORS Configuration
```javascript
const cors = require('cors');
app.use(cors({
  origin: [
    'https://yourstore.com',
    'https://pos.yourstore.com',
    'https://kds.yourstore.com',
    'https://driver.yourstore.com',
    'https://admin.yourstore.com'
  ]
}));
```

### المرحلة التاسعة: النسخ الاحتياطي

#### 1. Database Backup
```sql
-- Supabase automatic backups
-- Manual backup command
pg_dump $DATABASE_URL > backup.sql
```

#### 2. File Storage Backup
```javascript
// Firebase Storage backup
const admin = require('firebase-admin');
// Backup script
```

### المرحلة العاشرة: التكاليف المتوقعة

#### الخطة المجانية (للبداية)
- **Vercel**: مجاني (100GB bandwidth)
- **Supabase**: مجاني (500MB database, 1GB storage)
- **Firebase**: مجاني (10K auth users, 1GB storage)
- **المجموع**: $0/شهر

#### الخطة المدفوعة (للنمو)
- **Vercel Pro**: $20/شهر
- **Railway**: $5/شهر
- **Supabase Pro**: $25/شهر
- **Firebase Blaze**: $10-50/شهر
- **النطاق**: $10-15/سنة
- **المجموع**: $60-100/شهر

### خطوات النشر السريع

#### 1. إعداد الخدمات (30 دقيقة)
```bash
# إنشاء مشاريع Firebase و Supabase
# نسخ المتغيرات إلى .env files
```

#### 2. نشر قاعدة البيانات (10 دقائق)
```sql
-- تشغيل config/database-schema.sql في Supabase
```

#### 3. نشر التطبيقات (20 دقيقة)
```bash
# نشر كل تطبيق
npm run deploy:all
```

#### 4. إعداد النطاقات (15 دقائق)
```bash
# ربط النطاقات المخصصة
```

#### 5. اختبار النظام (15 دقائق)
```bash
# اختبار جميع التطبيقات والوظائف
```

**المجموع: 90 دقيقة للنشر الكامل**

### الدعم والصيانة

#### 1. المراقبة اليومية
- فحص الأخطاء في Sentry
- مراقبة الأداء في Vercel Analytics
- فحص قاعدة البيانات في Supabase

#### 2. التحديثات الأسبوعية
- تحديث التبعيات
- مراجعة الأمان
- نسخ احتياطية

#### 3. التطوير المستمر
- إضافة ميزات جديدة
- تحسين الأداء
- تحديث التصميم

هل تريد البدء بخطة النشر؟ يمكنني مساعدتك في أي خطوة محددة!
