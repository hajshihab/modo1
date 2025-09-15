# Installation Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm 8+
- Git

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce-platform
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```
   
   If you encounter peer dependency conflicts, use:
   ```bash
   npm install --legacy-peer-deps
   cd frontend && npm install --legacy-peer-deps
   cd ../backend && npm install --legacy-peer-deps
   cd ../mobile && npm install --legacy-peer-deps
   cd ../pos-system && npm install --legacy-peer-deps
   cd ../kds-system && npm install --legacy-peer-deps
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   - Firebase credentials
   - Supabase credentials
   - Stripe/PayPal keys
   - Database URLs
   - API keys

4. **Start development servers**
   ```bash
   npm run dev
   ```
   
   Or start individual services:
   ```bash
   # Frontend (port 3000)
   cd frontend && npm run dev
   
   # Backend (port 3001)
   cd backend && npm run dev
   
   # POS System (port 3002)
   cd pos-system && npm run dev
   
   # KDS System (port 3003)
   cd kds-system && npm run dev
   ```

5. **Using Docker (Alternative)**
   ```bash
   docker-compose up
   ```

## 🌐 Access Points

- **Main Website**: http://localhost:3000
- **API Server**: http://localhost:3001
- **POS System**: http://localhost:3002
- **KDS System**: http://localhost:3003
- **Database Admin**: http://localhost:8080 (Adminer)
- **Redis Admin**: http://localhost:8081 (Redis Commander)

## 📱 Mobile Development

### React Native Setup
```bash
cd mobile
npm install
```

### iOS Development
```bash
cd ios && pod install
npx react-native run-ios
```

### Android Development
```bash
npx react-native run-android
```

## 🗄️ Database Setup

### PostgreSQL (Supabase)
1. Create a Supabase project
2. Run the schema: `config/database-schema.sql`
3. Update environment variables

### Firebase Setup
1. Create Firebase project
2. Enable Authentication, Firestore, Storage
3. Download service account key
4. Update environment variables

## 🔧 Development Tools

### Code Quality
```bash
# Linting
npm run lint

# Type checking
npm run type-check

# Formatting
npm run format
```

### Testing
```bash
# Run tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

### Building
```bash
# Build all projects
npm run build

# Build specific project
cd frontend && npm run build
cd backend && npm run build
```

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd frontend
vercel --prod
```

### Backend (Railway)
```bash
cd backend
railway deploy
```

### Docker Production
```bash
docker-compose -f docker-compose.prod.yml up
```

## 🔍 Troubleshooting

### Common Issues

1. **Peer dependency conflicts**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **TypeScript errors**
   ```bash
   npm run type-check
   ```

3. **Port conflicts**
   - Change ports in package.json scripts
   - Kill existing processes: `lsof -ti:3000 | xargs kill`

4. **Node modules issues**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

5. **Firebase/Supabase connection**
   - Verify environment variables
   - Check API keys and permissions
   - Ensure services are enabled

### Environment Variables Checklist

- [ ] `NEXT_PUBLIC_FIREBASE_API_KEY`
- [ ] `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `STRIPE_PUBLIC_KEY`
- [ ] `STRIPE_SECRET_KEY`
- [ ] `DATABASE_URL`
- [ ] `REDIS_URL`

## 📚 Next Steps

1. **Configure Services**
   - Setup Firebase Authentication
   - Configure Supabase database
   - Setup payment gateways

2. **Customize**
   - Update branding and colors
   - Configure languages
   - Setup email templates

3. **Deploy**
   - Setup CI/CD pipeline
   - Configure production environment
   - Setup monitoring and analytics

## 🆘 Support

- Check documentation in `/docs`
- Review error logs
- Check GitHub issues
- Contact development team

---

**Happy coding! 🚀**
