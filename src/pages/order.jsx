import React, { useEffect, useState } from "react";

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            const userId = localStorage.getItem("userId"); // 🔥 Get userId from local storage

            if (!userId) {
                setError("❌ No user found. Please log in!");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:5000/orders/${userId}`);
                const data = await response.json();

                if (response.ok) {
                    setOrders(data);
                } else {
                    setError(`❌ ${data.error}`);
                }
            } catch (err) {
                setError("❌ Something went wrong!");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h1 className="text-3xl font-bold text-center mb-6">Your Orders</h1>

            {loading && <p className="text-blue-500 font-semibold">Fetching orders...</p>}
            {error && <p className="text-red-500 bg-red-100 border border-red-400 p-2 rounded">{error}</p>}

            {orders.length > 0 ? (
                <ul className="space-y-4">
                    {orders.map(order => (
                        <li key={order._id} className="border p-4 rounded shadow-md">
                            <p><strong>Order ID:</strong> {order._id}</p>
                            <p><strong>Items:</strong> {order.orderItems.map(item => item.name).join(", ")}</p>
                            <p><strong>Total:</strong> RS {order.total}</p>
                            <p><strong>Address:</strong> {order.address}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500 text-center">No orders found!</p>
            )}
        </div>
    );
};

export default Order;