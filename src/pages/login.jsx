import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        localStorage.setItem("userId", data.user._id);
        navigate("/"); // Redirect after login
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
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mb-3 px-4 py-2 border rounded" />

        {/* Password Field with Show/Hide Toggle */}
        <div className="relative w-full mb-3">
          <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded pr-10" />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-500">
            {showPassword ? "🙈 Hide" : "👁 Show"}
          </button>
        </div>

        {loading && <p className="text-blue-500 font-semibold">Logging in...</p>}
        {error && <p className="text-red-500 bg-red-100 border border-red-400 p-2 rounded">{error}</p>}

        <button onClick={handleLogin} className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600" disabled={loading}>
          {loading ? "Processing..." : "Login"}
        </button>

        {/* Separator & Signup Link */}
        <hr className="my-4 border-gray-300" />
        <p className="text-center">
          Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign up here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;