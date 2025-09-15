// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  language: Language;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  emailVerified: boolean;
  phoneNumber?: string;
  address?: Address;
}

export enum UserRole {
  CUSTOMER = 'customer',
  MERCHANT = 'merchant',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin'
}

export enum Language {
  AR = 'ar',
  EN = 'en',
  FR = 'fr',
  NL = 'nl'
}

// Address Types
export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// Store Types
export interface Store {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo?: string;
  banner?: string;
  ownerId: string;
  category: StoreCategory;
  isActive: boolean;
  isVerified: boolean;
  settings: StoreSettings;
  address: Address;
  contactInfo: ContactInfo;
  socialMedia?: SocialMedia;
  createdAt: Date;
  updatedAt: Date;
}

export interface StoreSettings {
  currency: string;
  language: Language;
  timezone: string;
  theme: StoreTheme;
  paymentMethods: PaymentMethod[];
  deliveryOptions: DeliveryOption[];
  businessHours: BusinessHours[];
}

export interface StoreTheme {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  layout: 'grid' | 'list' | 'masonry';
}

export interface ContactInfo {
  phone: string;
  email: string;
  whatsapp?: string;
}

export interface SocialMedia {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  tiktok?: string;
}

export interface BusinessHours {
  day: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

export enum StoreCategory {
  RESTAURANT = 'restaurant',
  FASHION = 'fashion',
  ELECTRONICS = 'electronics',
  GROCERY = 'grocery',
  BEAUTY = 'beauty',
  HOME = 'home',
  BOOKS = 'books',
  SPORTS = 'sports',
  AUTOMOTIVE = 'automotive',
  OTHER = 'other'
}

// Product Types
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  images: ProductImage[];
  price: number;
  comparePrice?: number;
  cost?: number;
  sku: string;
  barcode?: string;
  inventory: ProductInventory;
  category: ProductCategory;
  tags: string[];
  attributes: ProductAttribute[];
  variants: ProductVariant[];
  seo: ProductSEO;
  storeId: string;
  isActive: boolean;
  isFeatured: boolean;
  weight?: number;
  dimensions?: ProductDimensions;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  position: number;
}

export interface ProductInventory {
  trackQuantity: boolean;
  quantity: number;
  lowStockThreshold: number;
  allowBackorder: boolean;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
}

export interface ProductAttribute {
  name: string;
  value: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  sku: string;
  inventory: ProductInventory;
  attributes: ProductAttribute[];
}

export interface ProductSEO {
  title: string;
  description: string;
  keywords: string[];
}

export interface ProductDimensions {
  length: number;
  width: number;
  height: number;
  unit: 'cm' | 'in';
}

// Order Types
export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  storeId: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  currency: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  shippingAddress: Address;
  billingAddress: Address;
  notes?: string;
  trackingNumber?: string;
  estimatedDelivery?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  productId: string;
  variantId?: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  total: number;
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PREPARING = 'preparing',
  READY = 'ready',
  OUT_FOR_DELIVERY = 'out_for_delivery',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded'
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded',
  PARTIALLY_REFUNDED = 'partially_refunded'
}

export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  PAYPAL = 'paypal',
  APPLE_PAY = 'apple_pay',
  GOOGLE_PAY = 'google_pay',
  CASH_ON_DELIVERY = 'cash_on_delivery',
  BANK_TRANSFER = 'bank_transfer'
}

// Delivery Types
export interface DeliveryOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: number;
  isActive: boolean;
}

// Coupon Types
export interface Coupon {
  id: string;
  code: string;
  name: string;
  description: string;
  type: CouponType;
  value: number;
  minimumAmount?: number;
  maximumDiscount?: number;
  usageLimit?: number;
  usedCount: number;
  isActive: boolean;
  startsAt: Date;
  expiresAt: Date;
  applicableProducts?: string[];
  applicableCategories?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export enum CouponType {
  PERCENTAGE = 'percentage',
  FIXED_AMOUNT = 'fixed_amount',
  FREE_SHIPPING = 'free_shipping'
}

// Dropshipping Types
export interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: Address;
  apiEndpoint?: string;
  apiKey?: string;
  isActive: boolean;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DropshipProduct {
  id: string;
  supplierId: string;
  supplierProductId: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  cost: number;
  inventory: number;
  category: string;
  attributes: ProductAttribute[];
  isActive: boolean;
  lastSyncAt: Date;
}

// Analytics Types
export interface AnalyticsData {
  period: 'day' | 'week' | 'month' | 'year';
  sales: SalesData;
  orders: OrdersData;
  customers: CustomersData;
  products: ProductsData;
  traffic: TrafficData;
}

export interface SalesData {
  total: number;
  growth: number;
  chart: ChartData[];
}

export interface OrdersData {
  total: number;
  growth: number;
  byStatus: Record<OrderStatus, number>;
}

export interface CustomersData {
  total: number;
  new: number;
  returning: number;
  growth: number;
}

export interface ProductsData {
  total: number;
  topSelling: TopSellingProduct[];
  lowStock: Product[];
}

export interface TopSellingProduct {
  product: Product;
  sales: number;
  revenue: number;
}

export interface TrafficData {
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  sources: TrafficSource[];
}

export interface TrafficSource {
  source: string;
  visitors: number;
  percentage: number;
}

export interface ChartData {
  date: string;
  value: number;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  acceptTerms: boolean;
}

export interface ProductForm {
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  comparePrice?: number;
  cost?: number;
  sku: string;
  barcode?: string;
  categoryId: string;
  tags: string[];
  trackQuantity: boolean;
  quantity: number;
  lowStockThreshold: number;
  allowBackorder: boolean;
  weight?: number;
  dimensions?: ProductDimensions;
  seo: ProductSEO;
  isActive: boolean;
  isFeatured: boolean;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  data?: any;
  createdAt: Date;
}

export enum NotificationType {
  ORDER = 'order',
  PAYMENT = 'payment',
  INVENTORY = 'inventory',
  PROMOTION = 'promotion',
  SYSTEM = 'system'
}

// Search Types
export interface SearchFilters {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  inStock?: boolean;
  sortBy?: 'relevance' | 'price_asc' | 'price_desc' | 'rating' | 'newest';
  page?: number;
  limit?: number;
}

export interface SearchResult {
  products: Product[];
  filters: {
    categories: { id: string; name: string; count: number }[];
    priceRange: { min: number; max: number };
    brands: { name: string; count: number }[];
  };
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
