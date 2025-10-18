import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import BackendUrl from './BackendUrl'


const Profile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // ✅ Correctly initialize navigation hook

    useEffect(() => {
        const fetchUserProfile = async () => {
            const userId = localStorage.getItem("userId"); // 🔥 Retrieve user ID from localStorage

            if (!userId) {
                setError("❌ No user found. Please log in!");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${BackendUrl}/user/${userId}`);
                const data = await response.json();

                if (response.ok) {
                    setUser(data);
                } else {
                    setError(`❌ ${data.error}`);
                }
            } catch (err) {
                setError("❌ Something went wrong!");
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    return (
        <div className="py-36 flex justify-center items-center bg-gray-100">
            <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">User Profile</h2>

                {loading && <p className="text-blue-500 font-semibold">Loading profile...</p>}
                {error && <p className="text-red-500 bg-red-100 border border-red-400 p-2 rounded">{error}</p>}

                {user && (
                    <div className="text-gray-700">
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Mobile:</strong> {user.mobno}</p>
                    </div>
                )}

                {/* ✅ Fixed Navigation */}
                <button
                    onClick={() => navigate("/order")} // ✅ Corrected navigation
                    className="bg-yellow-400 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded transition duration-300 mt-4"
                >
                    your orders
                </button>
            </div>
        </div>
    );
};

export default Profile;