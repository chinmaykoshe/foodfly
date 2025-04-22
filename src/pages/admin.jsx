import React, { useState, useEffect } from 'react';

// Dummy data - replace with real API calls
const dummyOrders = [
  { id: 'ORD001', customer: 'Alice Smith', total: 1250, status: 'Delivered', date: '2025-04-15' },
  { id: 'ORD002', customer: 'Bob Johnson', total: 760, status: 'Pending', date: '2025-04-17' },
  { id: 'ORD003', customer: 'Charlie Lee', total: 430, status: 'Cancelled', date: '2025-04-18' }
];

const dummyReviews = [
  { id: 'REV001', customer: 'Alice Smith', rating: 5, comment: 'Excellent food and service!', date: '2025-04-16' },
  { id: 'REV002', customer: 'Bob Johnson', rating: 4, comment: 'Great taste but slow delivery.', date: '2025-04-17' },
  { id: 'REV003', customer: 'Dana White', rating: 3, comment: 'Average experience.', date: '2025-04-18' }
];

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Simulate API fetch
    setOrders(dummyOrders);
    setReviews(dummyReviews);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      {/* Tabs */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-t-lg font-medium transition ${
            activeTab === 'orders'
              ? 'bg-white border-t border-l border-r border-gray-200 text-gray-800'
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
          }`}
        >
          Orders
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-4 py-2 rounded-t-lg font-medium transition ${
            activeTab === 'reviews'
              ? 'bg-white border-t border-l border-r border-gray-200 text-gray-800'
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
          }`}
        >
          Reviews
        </button>
      </div>

      {/* Content */}
      <div className="bg-white shadow rounded-b-lg p-6">
        {activeTab === 'orders' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Placed Orders</h2>
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left">Order ID</th>
                  <th className="px-4 py-2 text-left">Customer</th>
                  <th className="px-4 py-2 text-left">Total (RS)</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id} className="border-t">
                    <td className="px-4 py-2">{order.id}</td>
                    <td className="px-4 py-2">{order.customer}</td>
                    <td className="px-4 py-2">{order.total}</td>
                    <td className="px-4 py-2">{order.status}</td>
                    <td className="px-4 py-2">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
            <ul className="space-y-4">
              {reviews.map(review => (
                <li key={review.id} className="border p-4 rounded">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{review.customer}</span>
                    <span className="text-yellow-500">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                  </div>
                  <p className="italic mb-2">"{review.comment}"</p>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}