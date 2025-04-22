import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Nav = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId"); // 🔥 Check if user is logged in
    const [menuOpen, setMenuOpen] = useState(false); // ✅ Mobile menu state

    const handleLogout = () => {
        localStorage.removeItem("userId"); // ✅ Clear user session
        navigate("/login"); // Redirect to login
    };

    const navItems = [
        { name: "Home", path: "/" },
        { name: "Menu", path: "/menu" },
        { name: "About Us", path: "/aboutus" },
        userId ? { name: "Profile", path: "/profile" } : { name: "Login", path: "/login" }, // ✅ Show Profile only if logged in
    ];

    return (
        <nav className="bg-yellow-400 shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-gray-900">
                    Food Fly
                </Link>

                {/* ✅ Mobile Menu Toggle */}
                <button className="md:hidden text-gray-800 text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? "✖" : "☰"} {/* Changes icon based on menu state */}
                </button>

                {/* ✅ Navigation Links for Desktop */}
                <div className="hidden md:flex space-x-4">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `text-gray-800 font-medium px-3 py-1 rounded hover:bg-white transition ${
                                    isActive ? "bg-white shadow" : ""
                                }`
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}

                    {/* Show Logout Button if User is Logged In */}
                    {userId && (
                        <button
                            onClick={handleLogout}
                            className="text-gray-800 font-medium px-3 py-1 rounded hover:bg-white transition"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>

            {/* ✅ Mobile Menu (Dropdown) */}
            {menuOpen && (
                <div className="md:hidden flex flex-col bg-yellow-500 py-3 space-y-2 text-center">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className="text-gray-800 font-medium px-3 py-2 rounded hover:bg-white transition"
                            onClick={() => setMenuOpen(false)} // Close menu on link click
                        >
                            {item.name}
                        </NavLink>
                    ))}

                    {userId && (
                        <button
                            onClick={handleLogout}
                            className="text-gray-800 font-medium px-3 py-2 rounded hover:bg-white transition"
                        >
                            Logout
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Nav;