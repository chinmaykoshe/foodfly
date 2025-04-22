import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './pages/nav';
import Home from './pages/home';
import Menu from './pages/menu';
import AboutUs from './pages/aboutus';
import ContactUs from './pages/contactus';
import Footer from './pages/footer';
import Login from './pages/login';
import Signup from './pages/signup';
import Order from './pages/order';
import Profile from './pages/profile';
import AdminPanel from './pages/admin';
import Checkout from './pages/checkout';

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/order" element={<Order />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;