// Supabase configuration interface
interface SupabaseConfig {
  url: string;
  anonKey: string;
  serviceRoleKey?: string;
}

// Supabase configuration - Your actual Supabase project
const supabaseConfig: SupabaseConfig = {
  url: 'https://tvlytontiavavrtcxzci.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2bHl0b250aWF2YXZydGN4emNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5Mzg2NTMsImV4cCI6MjA3MzUxNDY1M30.DHa5Mp2V3plj8CYzo1OnDOnFsxJSDO4cMl6x0DbQBBE',
  serviceRoleKey: '', // Add service role key if needed
};

// Validate Supabase configuration
const validateSupabaseConfig = (config: SupabaseConfig): boolean => {
  const requiredFields = ['url', 'anonKey'];
  
  for (const field of requiredFields) {
    if (!config[field as keyof SupabaseConfig]) {
      console.error(`Supabase configuration missing: ${field}`);
      return false;
    }
  }
  
  return true;
};

// Supabase client instance (will be initialized when dependencies are available)
export let supabase: any = null;

// Initialize Supabase client
export const initializeSupabase = async () => {
  try {
    if (!validateSupabaseConfig(supabaseConfig)) {
      throw new Error('Invalid Supabase configuration. Please check your environment variables.');
    }

    // Dynamic import to avoid build errors when dependencies are not installed
    const { createClient } = await import('@supabase/supabase-js');
    
    supabase = createClient(supabaseConfig.url, supabaseConfig.anonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
    });

    return supabase;
  } catch (error) {
    console.error('Failed to initialize Supabase:', error);
    return null;
  }
};

// Supabase service helpers
export const supabaseServices = {
  client: supabase,
  auth: supabase?.auth,
  storage: supabase?.storage,
  realtime: supabase?.realtime,
};

// Supabase configuration getter
export const getSupabaseConfig = (): SupabaseConfig => supabaseConfig;

// Check if Supabase is properly configured
export const isSupabaseConfigured = (): boolean => {
  return validateSupabaseConfig(supabaseConfig);
};

// Supabase connection status
export const checkSupabaseConnection = async (): Promise<boolean> => {
  try {
    if (!supabase) {
      await initializeSupabase();
    }
    
    // Simple test to check if Supabase is accessible
    const { data, error } = await supabase.from('_health_check').select('*').limit(1);
    return !error;
  } catch (error) {
    console.error('Supabase connection failed:', error);
    return false;
  }
};

// Supabase error handler
export const handleSupabaseError = (error: any): string => {
  const errorCode = error?.code;
  const errorMessage = error?.message;

  // Common Supabase Auth errors
  const authErrors: Record<string, string> = {
    'invalid_credentials': 'Invalid email or password.',
    'email_not_confirmed': 'Please check your email and click the confirmation link.',
    'signup_disabled': 'Sign up is currently disabled.',
    'email_address_invalid': 'Invalid email address.',
    'password_too_short': 'Password must be at least 6 characters.',
    'weak_password': 'Password is too weak. Please choose a stronger password.',
    'user_not_found': 'No user found with this email address.',
    'email_address_not_authorized': 'This email address is not authorized.',
    'too_many_requests': 'Too many requests. Please try again later.',
  };

  // Common Supabase Database errors
  const dbErrors: Record<string, string> = {
    'PGRST116': 'The result contains 0 rows.',
    'PGRST301': 'Row level security policy violation.',
    '23505': 'A record with this value already exists.',
    '23503': 'Foreign key constraint violation.',
    '23502': 'Required field is missing.',
    '42501': 'Insufficient privileges.',
    '42P01': 'Table does not exist.',
    '42703': 'Column does not exist.',
  };

  // Return user-friendly error message
  if (authErrors[errorCode]) {
    return authErrors[errorCode];
  }

  if (dbErrors[errorCode]) {
    return dbErrors[errorCode];
  }

  // Return original error message if no mapping found
  return errorMessage || 'An unexpected error occurred.';
};

// Supabase timestamp helpers
export const createSupabaseTimestamp = (): string => {
  return new Date().toISOString();
};

export const formatSupabaseTimestamp = (timestamp: string): Date => {
  return new Date(timestamp);
};

// Supabase storage helpers
export const uploadFile = async (
  bucket: string,
  path: string,
  file: File,
  options?: any
): Promise<{ data: any; error: any }> => {
  if (!supabase) {
    await initializeSupabase();
  }

  return supabase.storage.from(bucket).upload(path, file, options);
};

export const downloadFile = async (
  bucket: string,
  path: string
): Promise<{ data: any; error: any }> => {
  if (!supabase) {
    await initializeSupabase();
  }

  return supabase.storage.from(bucket).download(path);
};

export const getPublicUrl = (bucket: string, path: string): string => {
  if (!supabase) {
    return '';
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data?.publicUrl || '';
};

export const deleteFile = async (
  bucket: string,
  paths: string[]
): Promise<{ data: any; error: any }> => {
  if (!supabase) {
    await initializeSupabase();
  }

  return supabase.storage.from(bucket).remove(paths);
};

// Supabase realtime helpers
export const subscribeToTable = (
  table: string,
  callback: (payload: any) => void,
  filter?: string
) => {
  if (!supabase) {
    console.error('Supabase not initialized');
    return null;
  }

  let subscription = supabase
    .channel(`public:${table}`)
    .on('postgres_changes', 
      { 
        event: '*', 
        schema: 'public', 
        table: table,
        filter: filter 
      }, 
      callback
    )
    .subscribe();

  return subscription;
};

export const unsubscribeFromTable = (subscription: any) => {
  if (subscription) {
    supabase.removeChannel(subscription);
  }
};

// Supabase query helpers
export const createRecord = async (
  table: string,
  data: any
): Promise<{ data: any; error: any }> => {
  if (!supabase) {
    await initializeSupabase();
  }

  return supabase.from(table).insert(data).select();
};

export const updateRecord = async (
  table: string,
  id: string,
  data: any
): Promise<{ data: any; error: any }> => {
  if (!supabase) {
    await initializeSupabase();
  }

  return supabase.from(table).update(data).eq('id', id).select();
};

export const deleteRecord = async (
  table: string,
  id: string
): Promise<{ data: any; error: any }> => {
  if (!supabase) {
    await initializeSupabase();
  }

  return supabase.from(table).delete().eq('id', id);
};

export const getRecord = async (
  table: string,
  id: string
): Promise<{ data: any; error: any }> => {
  if (!supabase) {
    await initializeSupabase();
  }

  return supabase.from(table).select('*').eq('id', id).single();
};

export const getRecords = async (
  table: string,
  options?: {
    select?: string;
    filter?: any;
    order?: { column: string; ascending?: boolean };
    limit?: number;
    offset?: number;
  }
): Promise<{ data: any; error: any }> => {
  if (!supabase) {
    await initializeSupabase();
  }

  let query = supabase.from(table);

  if (options?.select) {
    query = query.select(options.select);
  } else {
    query = query.select('*');
  }

  if (options?.filter) {
    Object.entries(options.filter).forEach(([key, value]) => {
      query = query.eq(key, value);
    });
  }

  if (options?.order) {
    query = query.order(options.order.column, { 
      ascending: options.order.ascending ?? true 
    });
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
  }

  return query;
};

// Export default Supabase client
export default supabase;
