import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Toaster } from 'react-hot-toast';
import { appWithTranslation } from 'next-i18next';
import { useState } from 'react';
import Head from 'next/head';

// Styles
import '../styles/globals.css';

// Contexts
import { AuthProvider } from '../contexts/AuthContext';
import { LocationProvider } from '../contexts/LocationContext';
import { OrderProvider } from '../contexts/OrderContext';

function DriverApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: 3,
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 10 * 60 * 1000, // 10 minutes
      },
    },
  }));

  return (
    <>
      <Head>
        <title>Driver App - E-Commerce Platform</title>
        <meta name="description" content="Delivery driver application for e-commerce platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <LocationProvider>
            <OrderProvider>
              <Component {...pageProps} />
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#363636',
                    color: '#fff',
                  },
                }}
              />
            </OrderProvider>
          </LocationProvider>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default appWithTranslation(DriverApp);
