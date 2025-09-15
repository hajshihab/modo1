import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Package, 
  DollarSign,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  comparePrice?: number;
  sku: string;
  category: string;
  inventory: number;
  status: 'active' | 'draft' | 'archived';
  images: string[];
  createdAt: string;
  updatedAt: string;
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'برجر دجاج مشوي',
    description: 'برجر دجاج طازج مع الخضار والصوص الخاص',
    price: 25.00,
    comparePrice: 30.00,
    sku: 'BURGER-001',
    category: 'برجر',
    inventory: 50,
    status: 'active',
    images: ['/images/burger1.jpg'],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  },
  {
    id: '2',
    name: 'بيتزا مارجريتا',
    description: 'بيتزا كلاسيكية بالطماطم والجبن والريحان',
    price: 35.00,
    sku: 'PIZZA-001',
    category: 'بيتزا',
    inventory: 25,
    status: 'active',
    images: ['/images/pizza1.jpg'],
    createdAt: '2024-01-10',
    updatedAt: '2024-01-18'
  },
  {
    id: '3',
    name: 'سلطة قيصر',
    description: 'سلطة خضراء طازجة مع صوص القيصر والجبن',
    price: 18.00,
    sku: 'SALAD-001',
    category: 'سلطات',
    inventory: 5,
    status: 'active',
    images: ['/images/salad1.jpg'],
    createdAt: '2024-01-12',
    updatedAt: '2024-01-19'
  }
];

export default function ProductsManagement() {
  const { t } = useTranslation('common');
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.sku.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesStatus = !selectedStatus || product.status === selectedStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      let aValue = a[sortBy as keyof Product];
      let bValue = b[sortBy as keyof Product];
      
      if (typeof aValue === 'string') aValue = aValue.toLowerCase();
      if (typeof bValue === 'string') bValue = bValue.toLowerCase();
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'draft': return 'مسودة';
      case 'archived': return 'مؤرشف';
      default: return status;
    }
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      setProducts(prev => prev.filter(p => p.id !== productId));
    }
  };

  const categories = [...new Set(products.map(p => p.category))];
  const lowStockProducts = products.filter(p => p.inventory <= 10);

  return (
    <>
      <Head>
        <title>إدارة المنتجات - لوحة التحكم</title>
        <meta name="description" content="إدارة منتجات المتجر" />
      </Head>

      <div className="min-h-screen bg-gray-50 rtl:text-right" dir="rtl">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <Package className="h-8 w-8 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">إدارة المنتجات</h1>
              </div>
              
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2 rtl:space-x-reverse">
                <Plus className="h-4 w-4" />
                <span>إضافة منتج جديد</span>
              </button>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Package className="h-8 w-8 text-blue-600" />
                </div>
                <div className="mr-4 rtl:ml-4">
                  <p className="text-sm font-medium text-gray-500">إجمالي المنتجات</p>
                  <p className="text-2xl font-bold text-gray-900">{products.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <div className="mr-4 rtl:ml-4">
                  <p className="text-sm font-medium text-gray-500">المنتجات النشطة</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {products.filter(p => p.status === 'active').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-8 w-8 text-yellow-600" />
                </div>
                <div className="mr-4 rtl:ml-4">
                  <p className="text-sm font-medium text-gray-500">مخزون منخفض</p>
                  <p className="text-2xl font-bold text-gray-900">{lowStockProducts.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <DollarSign className="h-8 w-8 text-purple-600" />
                </div>
                <div className="mr-4 rtl:ml-4">
                  <p className="text-sm font-medium text-gray-500">متوسط السعر</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {(products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(0)} ر.س
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute right-3 rtl:left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="البحث في المنتجات..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pr-10 rtl:pl-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">جميع الفئات</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">جميع الحالات</option>
                  <option value="active">نشط</option>
                  <option value="draft">مسودة</option>
                  <option value="archived">مؤرشف</option>
                </select>

                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [field, order] = e.target.value.split('-');
                    setSortBy(field);
                    setSortOrder(order as 'asc' | 'desc');
                  }}
                  className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="name-asc">الاسم (أ-ي)</option>
                  <option value="name-desc">الاسم (ي-أ)</option>
                  <option value="price-asc">السعر (منخفض-مرتفع)</option>
                  <option value="price-desc">السعر (مرتفع-منخفض)</option>
                  <option value="inventory-asc">المخزون (قليل-كثير)</option>
                  <option value="inventory-desc">المخزون (كثير-قليل)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                المنتجات ({filteredProducts.length})
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      المنتج
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الفئة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      السعر
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      المخزون
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الحالة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الإجراءات
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            <div className="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center">
                              <Package className="h-6 w-6 text-gray-400" />
                            </div>
                          </div>
                          <div className="mr-4 rtl:ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {product.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              SKU: {product.sku}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {product.price.toFixed(2)} ر.س
                          {product.comparePrice && (
                            <div className="text-xs text-gray-500 line-through">
                              {product.comparePrice.toFixed(2)} ر.س
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm ${product.inventory <= 10 ? 'text-red-600 font-medium' : 'text-gray-900'}`}>
                          {product.inventory}
                          {product.inventory <= 10 && (
                            <span className="mr-1 rtl:ml-1">⚠️</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(product.status)}`}>
                          {getStatusText(product.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Package className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">لا توجد منتجات</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchQuery || selectedCategory || selectedStatus 
                    ? 'لا توجد منتجات تطابق معايير البحث'
                    : 'ابدأ بإضافة منتج جديد لمتجرك'
                  }
                </p>
                <div className="mt-6">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2 rtl:space-x-reverse mx-auto">
                    <Plus className="h-4 w-4" />
                    <span>إضافة منتج جديد</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Low Stock Alert */}
          {lowStockProducts.length > 0 && (
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="mr-3 rtl:ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    تنبيه: مخزون منخفض
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>المنتجات التالية تحتاج إعادة تخزين:</p>
                    <ul className="mt-1 list-disc list-inside">
                      {lowStockProducts.map(product => (
                        <li key={product.id}>
                          {product.name} - متبقي {product.inventory} قطعة
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
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
