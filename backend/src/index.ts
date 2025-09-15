import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import configurations
import { connectRedis } from '@/config/redis';
import { initializeFirebase } from '@/config/firebase';
import { initializeSupabase } from '@/config/supabase';
import { logger } from '@/utils/logger';

// Import middleware
import { errorHandler } from '@/middleware/errorHandler';
import { notFound } from '@/middleware/notFound';
import { authMiddleware } from '@/middleware/auth';

// Import routes
import authRoutes from '@/routes/auth';
import userRoutes from '@/routes/users';
import storeRoutes from '@/routes/stores';
import productRoutes from '@/routes/products';
import orderRoutes from '@/routes/orders';
import paymentRoutes from '@/routes/payments';
import uploadRoutes from '@/routes/uploads';
import analyticsRoutes from '@/routes/analytics';
import webhookRoutes from '@/routes/webhooks';
import adminRoutes from '@/routes/admin';

// Import socket handlers
import { initializeSocketHandlers } from '@/sockets';

// Import job processors
import { initializeJobs } from '@/jobs';

const app = express();
const server = createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Trust proxy for rate limiting
app.set('trust proxy', 1);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: NODE_ENV === 'production' ? 100 : 1000, // limit each IP to 100 requests per windowMs in production
  message: {
    error: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to all requests
app.use(limiter);

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      imgSrc: ["'self'", 'data:', 'https:'],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'", 'https://api.stripe.com'],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

// CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      process.env.FRONTEND_URL || 'http://localhost:3000',
      process.env.ADMIN_URL || 'http://localhost:3001',
      process.env.POS_URL || 'http://localhost:3002',
      process.env.KDS_URL || 'http://localhost:3003',
    ];

    // Allow requests with no origin (mobile apps, etc.)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// Compression middleware
app.use(compression());

// Logging middleware
app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev', {
  stream: {
    write: (message: string) => logger.info(message.trim()),
  },
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: NODE_ENV,
    version: process.env.npm_package_version || '1.0.0',
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', authMiddleware, orderRoutes);
app.use('/api/payments', authMiddleware, paymentRoutes);
app.use('/api/uploads', authMiddleware, uploadRoutes);
app.use('/api/analytics', authMiddleware, analyticsRoutes);
app.use('/api/webhooks', webhookRoutes);
app.use('/api/admin', authMiddleware, adminRoutes);

// Socket.IO initialization
initializeSocketHandlers(io);

// 404 handler
app.use(notFound);

// Error handling middleware
app.use(errorHandler);

// Initialize services
async function initializeServices() {
  try {
    // Initialize Firebase
    await initializeFirebase();
    logger.info('Firebase initialized successfully');

    // Initialize Supabase
    await initializeSupabase();
    logger.info('Supabase initialized successfully');

    // Initialize Redis
    await connectRedis();
    logger.info('Redis connected successfully');

    // Initialize job processors
    await initializeJobs();
    logger.info('Job processors initialized successfully');

  } catch (error) {
    logger.error('Failed to initialize services:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    logger.info('Process terminated');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  server.close(() => {
    logger.info('Process terminated');
    process.exit(0);
  });
});

// Unhandled promise rejection handler
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Uncaught exception handler
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

// Start server
async function startServer() {
  try {
    await initializeServices();
    
    server.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT} in ${NODE_ENV} mode`);
      logger.info(`📱 Socket.IO server initialized`);
      logger.info(`🔗 API available at http://localhost:${PORT}/api`);
      logger.info(`💚 Health check available at http://localhost:${PORT}/health`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
startServer();

export { app, server, io };
