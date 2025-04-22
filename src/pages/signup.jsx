import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobNo, setMobNo] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            setError("❌ Passwords do not match!");
            setSuccessMessage(""); // Clear success message
            return;
        }

        setLoading(true);
        setError(null);
        setSuccessMessage("");

        try {
            const response = await fetch("http://localhost:5000/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, mobNo, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage("✅ User signed up successfully!");
                setTimeout(() => navigate("/login"), 2000);
            } else {
                setError(`❌ ${data.error}`);
            }
        } catch (err) {
            setError("❌ Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Signup</h2>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full mb-3 px-4 py-2 border rounded" />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mb-3 px-4 py-2 border rounded" />
                <input type="text" placeholder="Mobile Number" value={mobNo} onChange={(e) => setMobNo(e.target.value)} className="w-full mb-3 px-4 py-2 border rounded" />
                
                {/* Password Field with Show/Hide Toggle */}
                <div className="relative w-full mb-3">
                    <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded pr-10" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-500">
                        {showPassword ? "🙈 Hide" : "👁 Show"}
                    </button>
                </div>

                <div className="relative w-full mb-3">
                    <input type={showPassword ? "text" : "password"} placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-2 border rounded pr-10" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-500">
                        {showPassword ? "🙈 Hide" : "👁 Show"}
                    </button>
                </div>

                {/* Styled Error & Success Messages */}
                {loading && <p className="text-blue-500 font-semibold">Signing up...</p>}
                {error && <p className="text-red-500 bg-red-100 border border-red-400 p-2 mb-2 rounded">{error}</p>}
                {successMessage && <p className="text-green-500 bg-green-100 border border-green-400 p-2 rounded">{successMessage}</p>}

                <button onClick={handleSignup} className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600" disabled={loading}>
                    {loading ? "Processing..." : "Create Account"}
                </button>

                {/* Separator & Login Link */}
                <hr className="my-4 border-gray-300" />
                <p className="text-center">
                    Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login here</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;