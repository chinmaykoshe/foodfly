import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Checkout() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const selectedItems = state?.items || [];

    const [address, setAddress] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const total = selectedItems.reduce((sum, i) => sum + i.price, 0);
    const userId = localStorage.getItem("userId"); // 🔥 Retrieve user ID from localStorage

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId) {
            setError("❌ No user found. Please log in!");
            return;
        }
        if (!address || selectedItems.length === 0) {
            setError("❌ Please fill in all fields and select items.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch("http://localhost:5000/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderItems: selectedItems, total, address, userId }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("✅ Order placed successfully!");
                navigate("/order"); // Redirect to order confirmation
            } else {
                setError(`❌ ${data.error}`);
            }
        } catch (err) {
            setError("❌ Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    if (selectedItems.length === 0) {
        return (
            <div className="p-6 text-center">
                <p className="text-gray-600">
                    No items selected.{" "}
                    <button onClick={() => navigate("/menu")} className="text-blue-500 underline">
                        Go back to menu
                    </button>
                </p>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg my-16">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Checkout</h1>

            {/* Order Summary */}
            <div className="mb-6 border-b pb-4">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">Your Order</h2>
                <ul className="space-y-2">
                    {selectedItems.map(item => (
                        <li key={item.id} className="flex justify-between text-gray-700">
                            <span>{item.name}</span>
                            <span className="font-semibold text-yellow-600">RS {item.price}</span>
                        </li>
                    ))}
                </ul>
                <p className="mt-4 text-lg font-bold text-yellow-700">Total: RS {total}</p>
            </div>

            {/* Customer Details Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium text-gray-700">Address</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>

                {/* Loading & Error Messages */}
                {loading && <p className="text-blue-500 font-semibold">Processing Order...</p>}
                {error && <p className="text-red-500 bg-red-100 border border-red-400 p-2 rounded">{error}</p>}

                <button
                    type="submit"
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-300"
                    disabled={loading}
                >
                    {loading ? "Processing..." : "Place Order"}
                </button>
            </form>
        </div>
    );
}