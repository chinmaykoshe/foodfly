import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const selectedItems = state?.items || [];

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');

  const total = selectedItems.reduce((sum, i) => sum + i.price, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !address || !contact) {
      return alert('Please fill in all fields.');
    }
    // Here you’d send `selectedItems`, `name`, `address`, `contact` to your backend
    alert('Order placed successfully!');
    navigate('/order-confirmation');
  };

  if (selectedItems.length === 0) {
    return (
      <div className="p-6 text-center">
        <p>No items selected. <button onClick={() => navigate('/menu')} className="text-blue-500 underline">Go back to menu</button></p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Checkout</h1>

      {/* Order Summary */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Your Order</h2>
        <ul className="space-y-2">
          {selectedItems.map(item => (
            <li key={item.id} className="flex justify-between">
              <span>{item.name}</span>
              <span>RS {item.price}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-lg font-semibold">Total: RS {total}</p>
      </div>

      {/* Customer Details Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Address</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Contact Number</label>
          <input
            type="tel"
            className="w-full px-4 py-2 border rounded"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded font-semibold"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}
