import { NextPage } from 'next';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const HomePage: NextPage = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>منصة التجارة الإلكترونية - E-Commerce Platform</title>
        <meta name="description" content="منصة تجارة إلكترونية متعددة البائعين مع دعم اللغة العربية" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="container-custom py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">🛒</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">
                  منصة التجارة الإلكترونية
                </h1>
              </div>
              
              <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
                <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
                  الرئيسية
                </a>
                <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
                  المتاجر
                </a>
                <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
                  المنتجات
                </a>
                <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
                  تسجيل الدخول
                </a>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="container-custom py-16">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              مرحباً بك في منصة التجارة الإلكترونية
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              منصة شاملة متعددة البائعين مع دعم كامل للغة العربية ونظام RTL، 
              تشمل نظام نقاط البيع وشاشة عرض المطبخ وتطبيق الهاتف المحمول
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-primary px-8 py-3 text-lg">
                ابدأ التسوق الآن
              </button>
              <button className="btn btn-outline px-8 py-3 text-lg">
                انضم كبائع
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="card text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏪</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">متعدد البائعين</h3>
              <p className="text-gray-600">منصة تدعم عدة متاجر وبائعين في مكان واحد</p>
            </div>

            <div className="card text-center p-6">
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📱</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">تطبيق الهاتف</h3>
              <p className="text-gray-600">تطبيق محمول متكامل لنظامي iOS و Android</p>
            </div>

            <div className="card text-center p-6">
              <div className="w-16 h-16 bg-warning-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💳</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">نظام POS</h3>
              <p className="text-gray-600">نظام نقاط بيع متطور للمتاجر الفعلية</p>
            </div>

            <div className="card text-center p-6">
              <div className="w-16 h-16 bg-error-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🍳</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">شاشة المطبخ</h3>
              <p className="text-gray-600">نظام عرض الطلبات للمطاعم والمقاهي</p>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-3xl font-bold text-center mb-8">التقنيات المستخدمة</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="font-bold text-blue-600">⚛️</span>
                </div>
                <span className="text-sm font-medium">React</span>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="font-bold text-white">▲</span>
                </div>
                <span className="text-sm font-medium">Next.js</span>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="font-bold text-white">TS</span>
                </div>
                <span className="text-sm font-medium">TypeScript</span>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="font-bold text-white">🎨</span>
                </div>
                <span className="text-sm font-medium">Tailwind</span>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="font-bold text-white">🔥</span>
                </div>
                <span className="text-sm font-medium">Firebase</span>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="font-bold text-white">⚡</span>
                </div>
                <span className="text-sm font-medium">Supabase</span>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4">منصة التجارة الإلكترونية</h4>
                <p className="text-gray-400">
                  منصة شاملة للتجارة الإلكترونية مع دعم كامل للغة العربية
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">الروابط السريعة</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">الرئيسية</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">المتاجر</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">المنتجات</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">من نحن</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">للبائعين</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">انضم كبائع</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">لوحة التحكم</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">نظام POS</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">شاشة المطبخ</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">تواصل معنا</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>البريد الإلكتروني: info@platform.com</li>
                  <li>الهاتف: +966 50 123 4567</li>
                  <li>العنوان: الرياض، المملكة العربية السعودية</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 منصة التجارة الإلكترونية. جميع الحقوق محفوظة.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default HomePage;
