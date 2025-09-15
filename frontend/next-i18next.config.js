module.exports = {
  i18n: {
    defaultLocale: 'ar',
    locales: ['ar', 'en', 'fr', 'nl'],
    localeDetection: true,
  },
  fallbackLng: {
    default: ['ar'],
  },
  debug: process.env.NODE_ENV === 'development',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  
  // Namespace configuration
  ns: [
    'common',
    'auth',
    'products',
    'orders',
    'dashboard',
    'checkout',
    'profile',
    'store',
    'admin',
    'errors',
  ],
  defaultNS: 'common',
  
  // Interpolation options
  interpolation: {
    escapeValue: false,
  },
  
  // React options
  react: {
    useSuspense: false,
  },
  
  // Backend options for loading translations
  backend: {
    loadPath: '/locales/{{lng}}/{{ns}}.json',
  },
  
  // Detection options
  detection: {
    order: ['cookie', 'header', 'querystring', 'path', 'subdomain'],
    caches: ['cookie'],
    cookieOptions: {
      maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
      sameSite: 'strict',
    },
  },
  
  // Serialization options
  serializeConfig: false,
  
  // Use local storage
  use: [],
  
  // Custom load function
  load: 'languageOnly',
  
  // Preload languages
  preload: ['ar', 'en'],
  
  // Clean code
  cleanCode: true,
  
  // Lowercase
  lowerCaseLng: true,
  
  // Non-explicit support
  nonExplicitSupportedLngs: true,
  
  // Fallback language
  fallbackLng: 'ar',
  
  // Support for right-to-left languages
  supportedLngs: ['ar', 'en', 'fr', 'nl'],
  
  // Keyseparator
  keySeparator: '.',
  
  // Namespace separator
  nsSeparator: ':',
  
  // Pluralization
  pluralSeparator: '_',
  contextSeparator: '_',
  
  // Resources
  resources: {},
  
  // Partials
  partialBundledLanguages: true,
  
  // Missing key handler
  saveMissing: process.env.NODE_ENV === 'development',
  saveMissingTo: 'fallback',
  
  // Update missing
  updateMissing: process.env.NODE_ENV === 'development',
  
  // Missing key no value fallback
  parseMissingKeyHandler: (key) => {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Missing translation key: ${key}`);
    }
    return key;
  },
  
  // Post process
  postProcess: ['interval', 'plural'],
  
  // Return null
  returnNull: false,
  returnEmptyString: false,
  returnObjects: false,
  
  // Join arrays
  joinArrays: false,
  
  // Override
  overloadTranslationOptionHandler: (args) => {
    return {
      defaultValue: args[1],
    };
  },
};
