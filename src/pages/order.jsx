import React, { useEffect, useState } from "react";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const [loadingOrders, setLoadingOrders] = useState(true);

    useEffect(() => {
        const userId = localStorage.getItem("userId");

        if (!userId) {
            setError("❌ No user found. Please log in!");
            setLoadingUser(false);
            setLoadingOrders(false);
            return;
        }

        // Fetch user profile
        const fetchUser = async () => {
            try {
                const res = await fetch(`http://localhost:5000/user/${userId}`);
                const data = await res.json();
                if (res.ok) setUser(data);
                else setError(`❌ ${data.error}`);
            } catch (err) {
                setError("❌ Something went wrong fetching user!");
            } finally {
                setLoadingUser(false);
            }
        };

        // Fetch user orders
        const fetchOrders = async () => {
            try {
                const res = await fetch(`http://localhost:5000/orders/${userId}`);
                const data = await res.json();
                if (res.ok) setOrders(data);
                else setError(`❌ ${data.error}`);
            } catch (err) {
                setError("❌ Something went wrong fetching orders!");
            } finally {
                setLoadingOrders(false);
            }
        };

        fetchUser();
        fetchOrders();
    }, []);

    return (
        <div className="py-16 flex justify-center items-start bg-gray-100 min-h-screen">
            <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-4">User Profile</h2>

                {loadingUser && <p className="text-blue-500 font-semibold">Loading profile...</p>}
                {error && <p className="text-red-500 bg-red-100 border border-red-400 p-2 rounded">{error}</p>}

                {user && (
                    <div className="text-gray-700 mb-6">
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Mobile:</strong> {user.mobNo}</p>
                    </div>
                )}

                <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
                {loadingOrders && <p className="text-blue-500 font-semibold">Fetching orders...</p>}

                {orders.length > 0 ? (
                    <ul className="space-y-4">
                        {orders.map((order) => (
                            <li key={order.id} className="border p-4 rounded shadow-md">
                                <p><strong>Order ID:</strong> {order.id}</p>
                                <p><strong>Items:</strong> {order.order_items.map(item => item.name).join(", ")}</p>
                                <p><strong>Total:</strong> RS {order.total}</p>
                                <p><strong>Address:</strong> {order.address}</p>
                                <p><strong>Placed on:</strong> {new Date(order.created_at).toLocaleDateString()} &nbsp;|&nbsp; {new Date(order.created_at).toLocaleTimeString()}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    !loadingOrders && <p className="text-gray-500 text-center">No orders found!</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
