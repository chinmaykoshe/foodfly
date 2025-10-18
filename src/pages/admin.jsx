import React, { useState, useEffect } from "react";
import BackendUrl from './BackendUrl'

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("orders");
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const usersRes = await fetch(`${BackendUrl}/users`, {
          headers: {
            "x-user-id": userId,
            "x-auth-token": token,
          },
        });

        const ordersRes = await fetch(`${BackendUrl}/orders`, {
          headers: {
            "x-user-id": userId,
            "x-auth-token": token,
          },
        });

        if (!usersRes.ok) throw new Error("Failed to fetch users");
        if (!ordersRes.ok) throw new Error("Failed to fetch orders");

        const usersData = await usersRes.json();
        const ordersData = await ordersRes.json();

        setUsers(usersData);
        setOrders(ordersData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [userId, token]);

  if (loading)
    return <p className="text-blue-500 font-semibold text-center mt-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center md:text-left">
        Admin Panel
      </h1>

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 mb-4 md:mb-8">
        <button
          onClick={() => setActiveTab("orders")}
          className={`px-4 py-2 rounded-lg font-medium transition text-sm sm:text-base ${
            activeTab === "orders"
              ? "bg-white border text-gray-800"
              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
          }`}
        >
          Orders
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`px-4 py-2 rounded-lg font-medium transition text-sm sm:text-base ${
            activeTab === "users"
              ? "bg-white border text-gray-800"
              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
          }`}
        >
          Users
        </button>
      </div>

      {/* Content */}
      <div className="bg-white shadow rounded-lg p-3 md:p-6">
        {activeTab === "orders" && (
          <div>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">All Orders</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm md:text-base border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-700">
                    <th className="px-2 py-2 text-left">Order ID</th>
                    <th className="px-2 py-2 text-left">Customer</th>
                    <th className="px-2 py-2 text-left">Mob. No.</th>
                    <th className="px-2 py-2 text-left">Mail</th>
                    <th className="px-2 py-2 text-left">Total (₹)</th>
                    <th className="px-2 py-2 text-left">Items</th>
                    <th className="px-2 py-2 text-left">Date</th>
                    <th className="px-2 py-2 text-left">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-t hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-2 py-2 break-all">{order.id}</td>
                      <td className="px-2 py-2">{order.user?.name}</td>
                      <td className="px-2 py-2">{order.user?.mobno}</td>
                      <td className="px-2 py-2 break-all">{order.user?.email}</td>
                      <td className="px-2 py-2 font-semibold text-gray-800">
                        ₹{order.total}
                      </td>
                      <td className="px-2 py-2">
                        {order.order_items?.map((item) => item.name).join(", ")}
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap">
                        {new Date(order.created_at).toLocaleTimeString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">All Users</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm md:text-base border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-700">
                    <th className="px-2 py-2 text-left">User ID</th>
                    <th className="px-2 py-2 text-left">Name</th>
                    <th className="px-2 py-2 text-left">Email</th>
                    <th className="px-2 py-2 text-left">Mobile</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-t hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-2 py-2 break-all">{user.id}</td>
                      <td className="px-2 py-2">{user.name}</td>
                      <td className="px-2 py-2 break-all">{user.email}</td>
                      <td className="px-2 py-2">{user.mobno}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
