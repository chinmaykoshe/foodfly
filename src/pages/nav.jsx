import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Nav = () => {
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About Us', path: '/aboutus' },
    { name: 'Contact Us', path: '/contactus' },
    { name: 'Login', path: '/login' },
    { name: 'Signup', path: '/signup' },
    { name: 'Profile', path: '/profile' },
  ];

  return (
    <nav className="bg-yellow-400 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-900">
          Food Fly
        </Link>
        <div className="flex space-x-4 flex-wrap justify-center">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `text-gray-800 font-medium px-3 py-1 rounded hover:bg-white transition ${
                  isActive ? 'bg-white shadow' : ''
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
