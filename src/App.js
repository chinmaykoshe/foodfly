import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Nav from "./pages/nav";
import Home from "./pages/home";
import Menu from "./pages/menu";
import AboutUs from "./pages/aboutus";
import Footer from "./pages/footer";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Order from "./pages/order";
import Profile from "./pages/profile";
import AdminPanel from "./pages/admin";
import Checkout from "./pages/checkout";
import BackendUrl from "./pages/BackendUrl";

// 🔒 For Admin-only pages
const PrivateRoute = ({ element, allowedRole }) => {
  const role = localStorage.getItem("role");
  if (!role) return <Navigate to="/login" replace />;
  return role === allowedRole ? element : <Navigate to="/" replace />;
};

// 🚫 Prevent logged-in users from seeing login/signup again
const ProtectedAuthRoute = ({ element }) => {
  const userId = localStorage.getItem("userId");
  return userId ? <Navigate to="/" replace /> : element;
};

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/order" element={<Order />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* 🔐 Auth protection routes */}
        <Route path="/login" element={<ProtectedAuthRoute element={<Login />} />} />
        <Route path="/signup" element={<ProtectedAuthRoute element={<Signup />} />} />

        {/* 👑 Admin only */}
        <Route
          path="/admin"
          element={<PrivateRoute element={<AdminPanel />} allowedRole="admin" />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
