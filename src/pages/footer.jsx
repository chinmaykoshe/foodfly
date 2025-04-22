import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-100 py-8 relative w-full">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                
                {/* Contact Info */}
                <div>
                    <h5 className="text-lg font-semibold mb-1">Contact Us</h5>
                    <p className="text-sm">Email: support@foodfly.com</p>
                    <p className="text-sm">Phone: +91 98765 43210</p>
                </div>

                {/* Social Media Links */}
                <div>
                    <h5 className="text-lg font-semibold mb-1">Follow Us</h5>
                    <div className="flex space-x-4">
                        <a href="/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                            <FaFacebookF size={20} />
                        </a>
                        <a href="/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                            <FaTwitter size={20} />
                        </a>
                        <a href="/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
                            <FaInstagram size={20} />
                        </a>
                        <a href="/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                            <FaLinkedinIn size={20} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-700 my-6 mx-4" />

            {/* Copyright */}
            <div className="text-center text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} FoodFly System. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;