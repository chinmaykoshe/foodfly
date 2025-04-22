import React, { useState, useEffect } from "react";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("orders");
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const usersRes = await fetch("http://localhost:5000/users");
        const ordersRes = await fetch("http://localhost:5000/orders");

        const usersData = await usersRes.json();
        const ordersData = await ordersRes.json();

        if (usersRes.ok) setUsers(usersData);
        if (ordersRes.ok) setOrders(ordersData);
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab("orders")}
          className={`px-4 py-2 rounded-t-lg font-medium transition ${activeTab === "orders" ? "bg-white border text-gray-800" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
        >
          Orders
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`px-4 py-2 rounded-t-lg font-medium transition ${activeTab === "users" ? "bg-white border text-gray-800" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
        >
          Users
        </button>
      </div>

      {/* Content */}
      <div className="bg-white shadow rounded-b-lg p-6">
        {loading && <p className="text-blue-500 font-semibold">Loading...</p>}
        {error && <p className="text-red-500 bg-red-100 border border-red-400 p-2 rounded">{error}</p>}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">All Orders</h2>
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left">Order ID</th>
                  <th className="px-4 py-2 text-left">Customer</th>
                  <th className="px-4 py-2 text-left">mob. no.</th>
                  <th className="px-4 py-2 text-left">mail</th>
                  <th className="px-4 py-2 text-left">Total (RS)</th>
                  <th className="px-4 py-2 text-left">order items</th>
                  <th className="px-4 py-2 text-left">date</th>
                  <th className="px-4 py-2 text-left">time</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id} className="border-t">
                    <td className="px-4 py-2">{order._id}</td>
                    <td className="px-4 py-2">{order.userId.name}</td>
                    <td className="px-4 py-2">{order.userId.mobNo}</td>
                    <td className="px-4 py-2">{order.userId.email}</td>
                    <td className="px-4 py-2">{order.total}</td>
                    <td className="px-4 py-2">{order.orderItems.map(item => item.name).join(", ")}</td> {/* ✅ Fixed */}
                    <td className="px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-2">{new Date(order.createdAt).toLocaleTimeString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">All Users</h2>
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left">User ID</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Mobile</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id} className="border-t">
                    <td className="px-4 py-2">{user._id}</td>
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.mobNo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}