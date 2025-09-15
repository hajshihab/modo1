import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { MapPin, Package, Clock, CheckCircle, XCircle, Navigation } from 'lucide-react';

interface DeliveryOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  items: Array<{
    name: string;
    quantity: number;
  }>;
  totalAmount: number;
  status: 'pending' | 'picked_up' | 'in_transit' | 'delivered' | 'cancelled';
  estimatedDelivery: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export default function DriverDashboard() {
  const { t } = useTranslation('common');
  const [orders, setOrders] = useState<DeliveryOrder[]>([]);
  const [activeOrder, setActiveOrder] = useState<DeliveryOrder | null>(null);
  const [driverStatus, setDriverStatus] = useState<'offline' | 'online' | 'busy'>('offline');

  // Mock data for demonstration
  useEffect(() => {
    const mockOrders: DeliveryOrder[] = [
      {
        id: '1',
        orderNumber: 'ORD-001',
        customerName: 'أحمد محمد',
        customerPhone: '+966501234567',
        deliveryAddress: 'شارع الملك فهد، الرياض',
        items: [
          { name: 'برجر دجاج', quantity: 2 },
          { name: 'بطاطس مقلية', quantity: 1 }
        ],
        totalAmount: 45.50,
        status: 'pending',
        estimatedDelivery: '30 دقيقة',
        coordinates: { lat: 24.7136, lng: 46.6753 }
      },
      {
        id: '2',
        orderNumber: 'ORD-002',
        customerName: 'فاطمة علي',
        customerPhone: '+966507654321',
        deliveryAddress: 'حي النخيل، جدة',
        items: [
          { name: 'بيتزا مارجريتا', quantity: 1 },
          { name: 'مشروب غازي', quantity: 2 }
        ],
        totalAmount: 65.00,
        status: 'picked_up',
        estimatedDelivery: '25 دقيقة',
        coordinates: { lat: 21.3891, lng: 39.8579 }
      }
    ];
    setOrders(mockOrders);
  }, []);

  const updateOrderStatus = (orderId: string, newStatus: DeliveryOrder['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const getStatusColor = (status: DeliveryOrder['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'picked_up': return 'bg-blue-100 text-blue-800';
      case 'in_transit': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: DeliveryOrder['status']) => {
    switch (status) {
      case 'pending': return 'في الانتظار';
      case 'picked_up': return 'تم الاستلام';
      case 'in_transit': return 'في الطريق';
      case 'delivered': return 'تم التسليم';
      case 'cancelled': return 'ملغي';
      default: return status;
    }
  };

  return (
    <>
      <Head>
        <title>تطبيق السائق - منصة التجارة الإلكترونية</title>
        <meta name="description" content="تطبيق إدارة التوصيل للسائقين" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50 rtl:text-right" dir="rtl">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <Package className="h-8 w-8 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">تطبيق السائق</h1>
              </div>
              
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <select
                  value={driverStatus}
                  onChange={(e) => setDriverStatus(e.target.value as any)}
                  className="rounded-md border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="offline">غير متصل</option>
                  <option value="online">متصل</option>
                  <option value="busy">مشغول</option>
                </select>
                
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  driverStatus === 'online' ? 'bg-green-100 text-green-800' :
                  driverStatus === 'busy' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {driverStatus === 'online' ? 'متاح' :
                   driverStatus === 'busy' ? 'مشغول' : 'غير متاح'}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Orders List */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">طلبات التوصيل</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <div key={order.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="font-medium text-gray-900">#{order.orderNumber}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">{order.estimatedDelivery}</span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{order.deliveryAddress}</span>
                      </div>
                      <div className="text-sm text-gray-900 font-medium">{order.customerName}</div>
                      <div className="text-sm text-gray-600">{order.customerPhone}</div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="text-sm text-gray-600 mb-2">العناصر:</div>
                      {order.items.map((item, index) => (
                        <div key={index} className="text-sm text-gray-900">
                          {item.name} × {item.quantity}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">
                        {order.totalAmount.toFixed(2)} ر.س
                      </span>
                      
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        {order.status === 'pending' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'picked_up')}
                            className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                          >
                            استلام
                          </button>
                        )}
                        
                        {order.status === 'picked_up' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'in_transit')}
                            className="px-3 py-1 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700"
                          >
                            في الطريق
                          </button>
                        )}
                        
                        {order.status === 'in_transit' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'delivered')}
                            className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700"
                          >
                            تم التسليم
                          </button>
                        )}
                        
                        <button
                          onClick={() => setActiveOrder(order)}
                          className="px-3 py-1 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700"
                        >
                          <Navigation className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map and Active Order Details */}
            <div className="space-y-6">
              {/* Map Placeholder */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">الخريطة</h2>
                </div>
                <div className="h-64 bg-gray-100 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">خريطة التوصيل</p>
                    <p className="text-sm text-gray-400">سيتم دمج خرائط Google هنا</p>
                  </div>
                </div>
              </div>

              {/* Active Order Details */}
              {activeOrder && (
                <div className="bg-white rounded-lg shadow">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900">تفاصيل الطلب النشط</h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div>
                        <span className="text-sm font-medium text-gray-900">رقم الطلب: </span>
                        <span className="text-sm text-gray-600">#{activeOrder.orderNumber}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-900">العميل: </span>
                        <span className="text-sm text-gray-600">{activeOrder.customerName}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-900">الهاتف: </span>
                        <span className="text-sm text-gray-600">{activeOrder.customerPhone}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-900">العنوان: </span>
                        <span className="text-sm text-gray-600">{activeOrder.deliveryAddress}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-900">المبلغ الإجمالي: </span>
                        <span className="text-sm text-gray-600">{activeOrder.totalAmount.toFixed(2)} ر.س</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex space-x-3 rtl:space-x-reverse">
                      <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">
                        اتصال بالعميل
                      </button>
                      <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                        فتح الخريطة
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Statistics */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">إحصائيات اليوم</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">12</div>
                      <div className="text-sm text-gray-600">طلبات مكتملة</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">450 ر.س</div>
                      <div className="text-sm text-gray-600">إجمالي الأرباح</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">8.5 ساعة</div>
                      <div className="text-sm text-gray-600">ساعات العمل</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">4.8</div>
                      <div className="text-sm text-gray-600">التقييم</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
