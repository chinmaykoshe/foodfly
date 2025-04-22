import React, { useState } from "react";

const Home = () => {
    const [email, setEmail] = useState("");

    const handleSubscribe = () => {
        if (email.trim()) {
            alert("Thank you for subscribing! You'll receive updates soon.");
            setEmail("");
        } else {
            alert("Please enter a valid email address.");
        }
    };

    const handleOrder = () => {
        window.location.href = "/menu"; // Or use React Router
    };

    return (
        <div>


            {/* Hero Section */}
            <section className="text-center py-24 px-4 bg-red-500 text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Welcome to Food Fly Meal <br /> Order Your Favorite Food
                </h1>
                <button
                    onClick={handleOrder}
                    className="bg-yellow-400 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded transition duration-300"
                >
                    Order Now
                </button>
            </section>

            {/* About Section */}
            <section className="bg-gray-100 text-gray-800 py-16 px-4">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
                    <img
                        src="/about-delivery.jpg"
                        alt="Delivery"
                        className="w-full md:w-1/2 rounded-lg shadow-md"
                    />
                    <div>
                        <h2 className="text-3xl font-semibold mb-4">Food Fly</h2>
                        <p className="text-lg">
                            Fast, convenient, and delicious food delivery at your doorstep.
                        </p>
                    </div>
                </div>
            </section>
            {/* Featured Dishes Section */}
            <section className="bg-white text-gray-800 py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-semibold mb-6">Featured Dishes</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center">
                            <img
                                src="/kimchi.jpg"
                                alt="Kimchi"
                                className="w-full h-48 object-cover rounded-lg mb-4 shadow"
                            />
                            <h3 className="text-xl font-medium">Kimchi</h3>
                            <p className="text-yellow-500 font-semibold">RS 760</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <img
                                src="/Galaxy Lemon Mojito.jpg"
                                alt="Galaxy Lemon Mojito"
                                className="w-full h-48 object-cover rounded-lg mb-4 shadow"
                            />
                            <h3 className="text-xl font-medium">Galaxy Lemon Mojito</h3>
                            <p className="text-yellow-500 font-semibold">RS 150</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <img
                                src="/Tiramisu Latte.jpg"
                                alt="Tiramisu Latte"
                                className="w-full h-48 object-cover rounded-lg mb-4 shadow"
                            />
                            <h3 className="text-xl font-medium">Tiramisu Latte</h3>
                            <p className="text-yellow-500 font-semibold">RS 320</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="bg-gray-100 text-gray-800 py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-semibold mb-6">What Our Customers Say</h2>
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <p className="italic mb-2">
                                “Amazing service and delicious food! My kimchi was perfectly spicy.”
                            </p>
                            <p className="font-semibold">– Priya Sharma</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <p className="italic mb-2">
                                “The Galaxy Lemon Mojito is my new favorite drink—so refreshing!”
                            </p>
                            <p className="font-semibold">– Rahul Verma</p>
                        </div>
                    </div>
                </div>
            </section>


            {/* Newsletter Section */}
            <section className="bg-white text-gray-800 py-16 px-4">
                <div className="max-w-md mx-auto text-center">
                    <img
                        src="/newsletter-bg.jpg"
                        alt="Newsletter"
                        className="w-full rounded-lg shadow mb-6"
                    />
                    <h2 className="text-3xl font-semibold mb-4">Join Our Newsletter</h2>
                    <p className="mb-4">
                        Subscribe to get updates about our services and exclusive offers.
                    </p>
                    <input
                        type="email"
                        className="w-full px-4 py-2 mb-4 border rounded text-gray-800"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button
                        onClick={handleSubscribe}
                        className="w-full bg-yellow-400 hover:bg-orange-600 text-white font-semibold py-2 rounded transition duration-300"
                    >
                        Subscribe
                    </button>
                </div>
            </section>

        </div>
    );
};

export default Home;
