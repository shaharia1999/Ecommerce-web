// 'use client';

// import { useOrders, useUpdateOrderStatus } from '../utils/api';
// import { useState } from 'react';

// export default function OrdersList() {
//   const [page, setPage] = useState(1);
//   const [statusFilter, setStatusFilter] = useState<string>('');
  
//   // Fetch orders using React Query
//   const {
//     data: ordersData,
//     isLoading,
//     isError,
//     refetch
//   } = useOrders({ page, limit: 10, status: statusFilter || undefined });
  
//   // Mutation for updating order status
//   const updateOrderMutation = useUpdateOrderStatus();
  
//   const handleStatusUpdate = (orderId: string, newStatus: string) => {
//     updateOrderMutation.mutate(
//       { orderId, status: newStatus },
//       {
//         onSuccess: () => {
//           alert('অর্ডার স্ট্যাটাস আপডেট হয়েছে!');
//         },
//         onError: (error) => {
//           console.error('Status update failed:', error);
//           alert('স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে');
//         }
//       }
//     );
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-96">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
//           <p className="text-gray-600">অর্ডার লোড হচ্ছে...</p>
//         </div>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="flex items-center justify-center min-h-96">
//         <div className="text-center">
//           <p className="text-red-600 mb-4">অর্ডার লোড করতে সমস্যা হয়েছে</p>
//           <button
//             onClick={() => refetch()}
//             className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
//           >
//             আবার চেষ্টা করুন
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const orders = ordersData?.data || [];

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-8">
//       <h1 className="text-3xl font-bold text-gray-800 mb-8">অর্ডার লিস্ট</h1>
      
//       {/* Filters */}
//       <div className="mb-6 flex items-center space-x-4">
//         <select
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
//         >
//           <option value="">সব অর্ডার</option>
//           <option value="pending">পেন্ডিং</option>
//           <option value="confirmed">কনফার্ম</option>
//           <option value="shipped">শিপ হয়েছে</option>
//           <option value="delivered">ডেলিভার হয়েছে</option>
//           <option value="cancelled">ক্যান্সেল</option>
//         </select>
        
//         <button
//           onClick={() => refetch()}
//           className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//         >
//           রিফ্রেশ
//         </button>
//       </div>

//       {/* Orders Table */}
//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 অর্ডার আইডি
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 কাস্টমার
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 পণ্য
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 মোট টাকা
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 স্ট্যাটাস
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 একশন
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {orders.map((order: any) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
//               <tr key={order.orderId}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                   {order.orderId}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   <div>
//                     <p className="font-medium">{order.customer?.name}</p>
//                     <p className="text-xs">{order.customer?.mobile}</p>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   <div>
//                     <p className="font-medium">{order.product?.title}</p>
//                     <p className="text-xs">Qty: {order.product?.quantity}</p>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                   TK. {order.payment?.total}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                     order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
//                     order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
//                     order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
//                     order.status === 'delivered' ? 'bg-green-100 text-green-800' :
//                     'bg-red-100 text-red-800'
//                   }`}>
//                     {order.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                   <select
//                     onChange={(e) => handleStatusUpdate(order.orderId, e.target.value)}
//                     disabled={updateOrderMutation.isPending}
//                     className="text-sm border border-gray-300 rounded px-2 py-1"
//                   >
//                     <option value="">স্ট্যাটাস পরিবর্তন</option>
//                     <option value="confirmed">কনফার্ম</option>
//                     <option value="shipped">শিপ করুন</option>
//                     <option value="delivered">ডেলিভার</option>
//                     <option value="cancelled">ক্যান্সেল</option>
//                   </select>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
        
//         {orders.length === 0 && (
//           <div className="text-center py-8">
//             <p className="text-gray-500">কোন অর্ডার পাওয়া যায়নি</p>
//           </div>
//         )}
//       </div>

//       {/* Pagination */}
//       <div className="mt-6 flex items-center justify-between">
//         <button
//           onClick={() => setPage(Math.max(1, page - 1))}
//           disabled={page === 1}
//           className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 disabled:opacity-50"
//         >
//           পূর্ববর্তী
//         </button>
        
//         <span className="text-gray-600">পেজ {page}</span>
        
//         <button
//           onClick={() => setPage(page + 1)}
//           className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
//         >
//           পরবর্তী
//         </button>
//       </div>
//     </div>
//   );
// }
