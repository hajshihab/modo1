import { Language, UserRole, OrderStatus, PaymentStatus, PaymentMethod, StoreCategory, CouponType } from '../types';

// Application Constants
export const APP_NAME = 'E-Commerce Platform';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'Multi-vendor e-commerce platform with Arabic support';

// API Constants
export const API_BASE_URL = typeof window !== 'undefined' 
  ? window.location.origin.replace(':3000', ':3001')
  : 'http://localhost:3001';
export const API_TIMEOUT = 30000; // 30 seconds
export const API_RETRY_ATTEMPTS = 3;

// Authentication Constants
export const AUTH_TOKEN_KEY = 'auth_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';
export const USER_DATA_KEY = 'user_data';
export const TOKEN_EXPIRY_BUFFER = 5 * 60 * 1000; // 5 minutes in milliseconds

// Language Constants
export const DEFAULT_LANGUAGE = Language.AR;
export const SUPPORTED_LANGUAGES = [Language.AR, Language.EN, Language.FR, Language.NL];
export const LANGUAGE_STORAGE_KEY = 'selected_language';

export const LANGUAGE_NAMES = {
  [Language.AR]: 'العربية',
  [Language.EN]: 'English',
  [Language.FR]: 'Français',
  [Language.NL]: 'Nederlands',
} as const;

export const LANGUAGE_LOCALES = {
  [Language.AR]: 'ar-SA',
  [Language.EN]: 'en-US',
  [Language.FR]: 'fr-FR',
  [Language.NL]: 'nl-NL',
} as const;

export const RTL_LANGUAGES = [Language.AR];

// Currency Constants
export const DEFAULT_CURRENCY = 'USD';
export const SUPPORTED_CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  { code: 'EGP', symbol: 'ج.م', name: 'Egyptian Pound' },
];

// Pagination Constants
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;
export const PAGINATION_SIZES = [10, 20, 50, 100];

// File Upload Constants
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
export const MAX_DOCUMENT_SIZE = 10 * 1024 * 1024; // 10MB

export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
];

export const ALLOWED_DOCUMENT_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

// Product Constants
export const MIN_PRODUCT_PRICE = 0.01;
export const MAX_PRODUCT_PRICE = 999999.99;
export const DEFAULT_PRODUCT_QUANTITY = 1;
export const LOW_STOCK_THRESHOLD = 10;

export const PRODUCT_IMAGE_SIZES = {
  thumbnail: { width: 150, height: 150 },
  small: { width: 300, height: 300 },
  medium: { width: 600, height: 600 },
  large: { width: 1200, height: 1200 },
};

// Order Constants
export const ORDER_NUMBER_PREFIX = 'ORD';
export const ORDER_NUMBER_LENGTH = 8;

export const ORDER_STATUS_COLORS = {
  [OrderStatus.PENDING]: '#fbbf24',
  [OrderStatus.CONFIRMED]: '#3b82f6',
  [OrderStatus.PREPARING]: '#f59e0b',
  [OrderStatus.READY]: '#10b981',
  [OrderStatus.OUT_FOR_DELIVERY]: '#8b5cf6',
  [OrderStatus.DELIVERED]: '#059669',
  [OrderStatus.CANCELLED]: '#ef4444',
  [OrderStatus.REFUNDED]: '#6b7280',
} as const;

export const PAYMENT_STATUS_COLORS = {
  [PaymentStatus.PENDING]: '#fbbf24',
  [PaymentStatus.PAID]: '#059669',
  [PaymentStatus.FAILED]: '#ef4444',
  [PaymentStatus.REFUNDED]: '#6b7280',
  [PaymentStatus.PARTIALLY_REFUNDED]: '#f59e0b',
} as const;

// User Role Constants
export const USER_ROLE_PERMISSIONS = {
  [UserRole.CUSTOMER]: ['view_products', 'place_orders', 'view_own_orders'],
  [UserRole.MERCHANT]: [
    'manage_store',
    'manage_products',
    'manage_orders',
    'view_analytics',
    'manage_coupons',
  ],
  [UserRole.ADMIN]: [
    'manage_users',
    'manage_stores',
    'view_all_orders',
    'manage_categories',
    'view_system_analytics',
  ],
  [UserRole.SUPER_ADMIN]: ['*'], // All permissions
} as const;

// Store Categories
export const STORE_CATEGORY_ICONS = {
  [StoreCategory.RESTAURANT]: '🍽️',
  [StoreCategory.FASHION]: '👗',
  [StoreCategory.ELECTRONICS]: '📱',
  [StoreCategory.GROCERY]: '🛒',
  [StoreCategory.BEAUTY]: '💄',
  [StoreCategory.HOME]: '🏠',
  [StoreCategory.BOOKS]: '📚',
  [StoreCategory.SPORTS]: '⚽',
  [StoreCategory.AUTOMOTIVE]: '🚗',
  [StoreCategory.OTHER]: '📦',
} as const;

// Payment Methods
export const PAYMENT_METHOD_ICONS = {
  [PaymentMethod.CREDIT_CARD]: '💳',
  [PaymentMethod.DEBIT_CARD]: '💳',
  [PaymentMethod.PAYPAL]: '🅿️',
  [PaymentMethod.APPLE_PAY]: '🍎',
  [PaymentMethod.GOOGLE_PAY]: '🅶',
  [PaymentMethod.CASH_ON_DELIVERY]: '💵',
  [PaymentMethod.BANK_TRANSFER]: '🏦',
} as const;

// Coupon Constants
export const COUPON_CODE_LENGTH = 8;
export const MIN_COUPON_VALUE = 0.01;
export const MAX_COUPON_VALUE = 100;
export const MAX_COUPON_USAGE = 1000;

export const COUPON_TYPE_LABELS = {
  [CouponType.PERCENTAGE]: 'Percentage',
  [CouponType.FIXED_AMOUNT]: 'Fixed Amount',
  [CouponType.FREE_SHIPPING]: 'Free Shipping',
} as const;

// Notification Constants
export const NOTIFICATION_TYPES = {
  ORDER: 'order',
  PAYMENT: 'payment',
  INVENTORY: 'inventory',
  PROMOTION: 'promotion',
  SYSTEM: 'system',
} as const;

export const NOTIFICATION_ICONS = {
  [NOTIFICATION_TYPES.ORDER]: '📦',
  [NOTIFICATION_TYPES.PAYMENT]: '💳',
  [NOTIFICATION_TYPES.INVENTORY]: '📊',
  [NOTIFICATION_TYPES.PROMOTION]: '🎉',
  [NOTIFICATION_TYPES.SYSTEM]: '⚙️',
} as const;

// Search Constants
export const SEARCH_DEBOUNCE_DELAY = 300; // milliseconds
export const MIN_SEARCH_QUERY_LENGTH = 2;
export const MAX_SEARCH_RESULTS = 50;

export const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Customer Rating' },
  { value: 'newest', label: 'Newest First' },
] as const;

// Analytics Constants
export const ANALYTICS_DATE_RANGES = [
  { value: 'today', label: 'Today' },
  { value: 'yesterday', label: 'Yesterday' },
  { value: 'last_7_days', label: 'Last 7 Days' },
  { value: 'last_30_days', label: 'Last 30 Days' },
  { value: 'last_90_days', label: 'Last 90 Days' },
  { value: 'last_year', label: 'Last Year' },
  { value: 'custom', label: 'Custom Range' },
] as const;

// Theme Constants
export const THEME_COLORS = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  success: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
} as const;

// Breakpoints
export const BREAKPOINTS = {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Animation Constants
export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

// Cache Constants
export const CACHE_KEYS = {
  USER_PROFILE: 'user_profile',
  STORE_DATA: 'store_data',
  PRODUCT_CATEGORIES: 'product_categories',
  CART_ITEMS: 'cart_items',
  WISHLIST_ITEMS: 'wishlist_items',
  RECENT_SEARCHES: 'recent_searches',
} as const;

export const CACHE_EXPIRY = {
  SHORT: 5 * 60 * 1000, // 5 minutes
  MEDIUM: 30 * 60 * 1000, // 30 minutes
  LONG: 24 * 60 * 60 * 1000, // 24 hours
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNKNOWN_ERROR: 'An unexpected error occurred.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Successfully logged in!',
  LOGOUT_SUCCESS: 'Successfully logged out!',
  REGISTER_SUCCESS: 'Account created successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  PRODUCT_ADDED: 'Product added successfully!',
  PRODUCT_UPDATED: 'Product updated successfully!',
  ORDER_PLACED: 'Order placed successfully!',
  PAYMENT_SUCCESS: 'Payment completed successfully!',
} as const;

// Validation Constants
export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\+?[\d\s\-\(\)]+$/,
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  DESCRIPTION_MAX_LENGTH: 1000,
  SKU_REGEX: /^[A-Z0-9\-_]+$/,
  SLUG_REGEX: /^[a-z0-9\-]+$/,
} as const;

// Social Media Constants
export const SOCIAL_MEDIA_PLATFORMS = [
  { name: 'Facebook', icon: '📘', baseUrl: 'https://facebook.com/' },
  { name: 'Instagram', icon: '📷', baseUrl: 'https://instagram.com/' },
  { name: 'Twitter', icon: '🐦', baseUrl: 'https://twitter.com/' },
  { name: 'TikTok', icon: '🎵', baseUrl: 'https://tiktok.com/@' },
  { name: 'YouTube', icon: '📺', baseUrl: 'https://youtube.com/c/' },
  { name: 'LinkedIn', icon: '💼', baseUrl: 'https://linkedin.com/company/' },
] as const;

// Business Hours
export const DAYS_OF_WEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

export const TIME_SLOTS = Array.from({ length: 24 * 4 }, (_, i) => {
  const hour = Math.floor(i / 4);
  const minute = (i % 4) * 15;
  const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  return { value: time, label: time };
});

// Feature Flags
export const FEATURE_FLAGS = {
  ENABLE_DROPSHIPPING: true,
  ENABLE_MULTI_VENDOR: true,
  ENABLE_SUBSCRIPTION: false,
  ENABLE_LOYALTY_PROGRAM: false,
  ENABLE_LIVE_CHAT: true,
  ENABLE_PUSH_NOTIFICATIONS: true,
  ENABLE_EMAIL_MARKETING: true,
  ENABLE_SMS_NOTIFICATIONS: false,
  ENABLE_SOCIAL_LOGIN: true,
  ENABLE_GUEST_CHECKOUT: true,
} as const;

// External Service URLs
export const EXTERNAL_SERVICES = {
  STRIPE_DASHBOARD: 'https://dashboard.stripe.com',
  PAYPAL_DASHBOARD: 'https://www.paypal.com/businessmanage',
  GOOGLE_ANALYTICS: 'https://analytics.google.com',
  FACEBOOK_BUSINESS: 'https://business.facebook.com',
  FIREBASE_CONSOLE: 'https://console.firebase.google.com',
  SUPABASE_DASHBOARD: 'https://app.supabase.com',
} as const;
