import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const menuItems = {
  "Korean Items": [
    { id: "item1", name: "Kimchi", price: 760, image: "kimchi.jpg" },
    { id: "item2", name: "Mandu", price: 200, image: "Mandu.jpg" },
    { id: "item3", name: "Jajangmyeon", price: 500, image: "Jajangmyeon.jpg" },
    { id: "item4", name: "Korean Fried Chicken", price: 150, image: "Korean Fried Chicken.jpg" }
  ],
  "Drinks": [
    { id: "item5", name: "Galaxy Lemon Mojito", price: 150, image: "Galaxy Lemon Mojito.jpg" },
    { id: "item6", name: "Tiramisu Latte", price: 320, image: "Tiramisu Latte.jpg" },
    { id: "item7", name: "Banofee Pie Latte", price: 150, image: "Banofee Pie Latte.jpg" },
    { id: "item8", name: "Strawberry CheeseCake Latte", price: 250, image: "Strawberry CheeseCake Latte.jpg" }
  ],
  "Desserts": [
    { id: "item9", name: "Tiramisu", price: 300, image: "Tiramisu.jpg" },
    { id: "item10", name: "Ice Cream", price: 175, image: "Ice Cream.jpg" },
    { id: "item11", name: "Bobaa", price: 180, image: "Bobaa.jpg" }
  ]
};

export default function Menu() {
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const navigate = useNavigate();

  const toggleItem = (itemId) => {
    setSelectedItemIds(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleOrder = (e) => {
    e.preventDefault();
    const selectedItems = Object.values(menuItems)
      .flat()
      .filter(item => selectedItemIds.includes(item.id));

    if (selectedItems.length === 0) {
      return alert("Please select at least one item to order.");
    }

    // Navigate to /checkout and pass selectedItems via location state
    navigate('/checkout', { state: { items: selectedItems } });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Food Menu</h1>
      <form onSubmit={handleOrder}>
        {Object.entries(menuItems).map(([category, items]) => (
          <div key={category} className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {items.map(item => (
                <div key={item.id} className="bg-white p-4 shadow rounded text-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedItemIds.includes(item.id)}
                      onChange={() => toggleItem(item.id)}
                      className="form-checkbox"
                    />
                    <span className="ml-2">{item.name} — RS {item.price}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="text-center">
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded font-semibold transition"
          >
            Order Now
          </button>
        </div>
      </form>
    </div>
  );
}
