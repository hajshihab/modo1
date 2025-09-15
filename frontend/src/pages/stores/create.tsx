import { useState } from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Store, Upload, MapPin, Clock, Phone, Mail, Globe, Camera } from 'lucide-react';

interface StoreFormData {
  name: string;
  slug: string;
  description: string;
  category: string;
  phone: string;
  email: string;
  website: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  businessHours: Array<{
    day: string;
    isOpen: boolean;
    openTime: string;
    closeTime: string;
  }>;
  logo: File | null;
  banner: File | null;
}

const STORE_CATEGORIES = [
  { value: 'restaurant', label: 'مطعم' },
  { value: 'fashion', label: 'أزياء' },
  { value: 'electronics', label: 'إلكترونيات' },
  { value: 'grocery', label: 'بقالة' },
  { value: 'beauty', label: 'تجميل' },
  { value: 'home', label: 'منزل وحديقة' },
  { value: 'books', label: 'كتب' },
  { value: 'sports', label: 'رياضة' },
  { value: 'automotive', label: 'سيارات' },
  { value: 'other', label: 'أخرى' }
];

const DAYS_OF_WEEK = [
  { value: 'sunday', label: 'الأحد' },
  { value: 'monday', label: 'الاثنين' },
  { value: 'tuesday', label: 'الثلاثاء' },
  { value: 'wednesday', label: 'الأربعاء' },
  { value: 'thursday', label: 'الخميس' },
  { value: 'friday', label: 'الجمعة' },
  { value: 'saturday', label: 'السبت' }
];

export default function CreateStore() {
  const { t } = useTranslation('common');
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<StoreFormData>({
    name: '',
    slug: '',
    description: '',
    category: '',
    phone: '',
    email: '',
    website: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: 'Saudi Arabia',
      postalCode: ''
    },
    businessHours: DAYS_OF_WEEK.map(day => ({
      day: day.value,
      isOpen: true,
      openTime: '09:00',
      closeTime: '22:00'
    })),
    logo: null,
    banner: null
  });

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof StoreFormData],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  const handleNameChange = (name: string) => {
    handleInputChange('name', name);
    if (!formData.slug || formData.slug === generateSlug(formData.name)) {
      handleInputChange('slug', generateSlug(name));
    }
  };

  const handleFileUpload = (field: 'logo' | 'banner', file: File) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const handleBusinessHoursChange = (dayIndex: number, field: string, value: any) => {
    const updatedHours = [...formData.businessHours];
    updatedHours[dayIndex] = { ...updatedHours[dayIndex], [field]: value };
    setFormData(prev => ({ ...prev, businessHours: updatedHours }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Here you would typically send the data to your API
      console.log('Store data:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('تم إنشاء المتجر بنجاح!');
      // Redirect to store dashboard
      // router.push('/dashboard/store');
      
    } catch (error) {
      console.error('Error creating store:', error);
      alert('حدث خطأ في إنشاء المتجر');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <>
      <Head>
        <title>إنشاء متجر جديد - منصة التجارة الإلكترونية</title>
        <meta name="description" content="أنشئ متجرك الإلكتروني الآن" />
      </Head>

      <div className="min-h-screen bg-gray-50 rtl:text-right" dir="rtl">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <Store className="h-8 w-8 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">إنشاء متجر جديد</h1>
              </div>
              
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <span className="text-sm text-gray-500">الخطوة {currentStep} من 4</span>
              </div>
            </div>
          </div>
        </header>

        {/* Progress Bar */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step}
                  </div>
                  <div className="mr-3 rtl:ml-3">
                    <p className={`text-sm font-medium ${
                      step <= currentStep ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      {step === 1 && 'المعلومات الأساسية'}
                      {step === 2 && 'العنوان والاتصال'}
                      {step === 3 && 'ساعات العمل'}
                      {step === 4 && 'الصور والشعار'}
                    </p>
                  </div>
                  {step < 4 && (
                    <div className={`w-16 h-1 mx-4 ${
                      step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
            
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">المعلومات الأساسية</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      اسم المتجر *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleNameChange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="مثال: مطعم الأصالة"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      رابط المتجر *
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        platform.com/store/
                      </span>
                      <input
                        type="text"
                        required
                        value={formData.slug}
                        onChange={(e) => handleInputChange('slug', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="store-name"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    فئة المتجر *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">اختر فئة المتجر</option>
                    {STORE_CATEGORIES.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    وصف المتجر
                  </label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="اكتب وصفاً مختصراً عن متجرك..."
                  />
                </div>
              </div>
            )}

            {/* Step 2: Address & Contact */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">العنوان ومعلومات الاتصال</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="inline h-4 w-4 ml-1" />
                      رقم الهاتف *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+966501234567"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="inline h-4 w-4 ml-1" />
                      البريد الإلكتروني *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="store@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Globe className="inline h-4 w-4 ml-1" />
                    الموقع الإلكتروني (اختياري)
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://www.example.com"
                  />
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-md font-medium text-gray-900 mb-4">
                    <MapPin className="inline h-4 w-4 ml-1" />
                    عنوان المتجر
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        الشارع *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.address.street}
                        onChange={(e) => handleInputChange('address.street', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="شارع الملك فهد"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          المدينة *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.address.city}
                          onChange={(e) => handleInputChange('address.city', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="الرياض"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          المنطقة *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.address.state}
                          onChange={(e) => handleInputChange('address.state', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="منطقة الرياض"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          الرمز البريدي
                        </label>
                        <input
                          type="text"
                          value={formData.address.postalCode}
                          onChange={(e) => handleInputChange('address.postalCode', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="12345"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Business Hours */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">
                  <Clock className="inline h-5 w-5 ml-1" />
                  ساعات العمل
                </h2>
                
                <div className="space-y-4">
                  {formData.businessHours.map((hours, index) => (
                    <div key={hours.day} className="flex items-center space-x-4 rtl:space-x-reverse p-4 border rounded-lg">
                      <div className="w-20">
                        <span className="text-sm font-medium text-gray-700">
                          {DAYS_OF_WEEK.find(d => d.value === hours.day)?.label}
                        </span>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={hours.isOpen}
                          onChange={(e) => handleBusinessHoursChange(index, 'isOpen', e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label className="mr-2 rtl:ml-2 text-sm text-gray-700">مفتوح</label>
                      </div>
                      
                      {hours.isOpen && (
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <input
                            type="time"
                            value={hours.openTime}
                            onChange={(e) => handleBusinessHoursChange(index, 'openTime', e.target.value)}
                            className="px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                          <span className="text-gray-500">إلى</span>
                          <input
                            type="time"
                            value={hours.closeTime}
                            onChange={(e) => handleBusinessHoursChange(index, 'closeTime', e.target.value)}
                            className="px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Images */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">
                  <Camera className="inline h-5 w-5 ml-1" />
                  الصور والشعار
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      شعار المتجر
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      {formData.logo ? (
                        <div>
                          <img
                            src={URL.createObjectURL(formData.logo)}
                            alt="Logo preview"
                            className="mx-auto h-20 w-20 object-cover rounded"
                          />
                          <p className="mt-2 text-sm text-gray-500">{formData.logo.name}</p>
                        </div>
                      ) : (
                        <div>
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <p className="mt-2 text-sm text-gray-500">اسحب الصورة هنا أو</p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => e.target.files?.[0] && handleFileUpload('logo', e.target.files[0])}
                            className="mt-2"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      صورة الغلاف
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      {formData.banner ? (
                        <div>
                          <img
                            src={URL.createObjectURL(formData.banner)}
                            alt="Banner preview"
                            className="mx-auto h-20 w-32 object-cover rounded"
                          />
                          <p className="mt-2 text-sm text-gray-500">{formData.banner.name}</p>
                        </div>
                      ) : (
                        <div>
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <p className="mt-2 text-sm text-gray-500">اسحب الصورة هنا أو</p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => e.target.files?.[0] && handleFileUpload('banner', e.target.files[0])}
                            className="mt-2"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                السابق
              </button>
              
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                >
                  التالي
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'جاري الإنشاء...' : 'إنشاء المتجر'}
                </button>
              )}
            </div>
          </form>
        </main>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
