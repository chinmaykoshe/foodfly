import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const menuItems = {
  "Korean Items": [
    { id: "item1", name: "Kimchi", price: 760, image: "kimchi.jpg" },
    { id: "item2", name: "Mandu", price: 200, image: "Mandu.jpg" },
    { id: "item3", name: "Jajangmyeon", price: 500, image: "Jajangmyeon.jpg" },
    { id: "item4", name: "Korean Fried Chicken", price: 150, image: "Korean Fried Chicken.jpg" },
  ],
  Drinks: [
    { id: "item5", name: "Galaxy Lemon Mojito", price: 150, image: "Galaxy Lemon Mojito.jpg" },
    { id: "item6", name: "Tiramisu Latte", price: 320, image: "Tiramisu Latte.jpg" },
    { id: "item7", name: "Banofee Pie Latte", price: 150, image: "Banofee Pie Latte.jpg" },
    { id: "item8", name: "Strawberry CheeseCake Latte", price: 250, image: "Strawberry CheeseCake Latte.jpg" },
  ],
  Desserts: [
    { id: "item9", name: "Tiramisu", price: 300, image: "Tiramisu.jpg" },
    { id: "item10", name: "Ice Cream", price: 175, image: "Ice Cream.jpg" },
    { id: "item11", name: "Bobaa", price: 180, image: "Bobaa.jpg" },
  ],
};

export default function Menu() {
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const [view, setView] = useState("box"); // "box" or "list"
  const navigate = useNavigate();

  const toggleItem = (itemId) => {
    setSelectedItemIds((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleOrder = (e) => {
    e.preventDefault();
    const selectedItems = Object.values(menuItems)
      .flat()
      .filter((item) => selectedItemIds.includes(item.id));

    if (selectedItems.length === 0) {
      return alert("Please select at least one item to order.");
    }

    navigate("/checkout", { state: { items: selectedItems } });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold text-yellow-600">
          🍽️ Food Menu
        </h1>
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 rounded-lg font-medium ${
              view === "box" ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setView("box")}
          >
            Box
          </button>
          <button
            className={`px-3 py-1 rounded-lg font-medium ${
              view === "list" ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setView("list")}
          >
            List
          </button>
        </div>
      </div>

      <form onSubmit={handleOrder} className="space-y-12">
        {Object.entries(menuItems).map(([category, items]) => (
          <div key={category}>
            <h2 className="text-2xl font-semibold mb-5 border-l-4 border-yellow-500 pl-3 text-gray-800">
              {category}
            </h2>

            {view === "box" ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {items.map((item) => {
                  const isSelected = selectedItemIds.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`relative cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ${
                        isSelected ? "ring-4 ring-yellow-400 scale-[1.03]" : ""
                      }`}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-44 object-cover"
                      />
                      <div className="p-4 bg-white">
                        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-yellow-600 font-medium mt-1">₹{item.price}</p>
                      </div>
                      {isSelected && (
                        <div className="absolute inset-0 bg-yellow-400/30 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10 text-yellow-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col divide-y divide-gray-200">
                {items.map((item) => {
                  const isSelected = selectedItemIds.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`flex items-center p-4 cursor-pointer hover:bg-yellow-50 transition ${
                        isSelected ? "bg-yellow-100" : ""
                      }`}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded mr-4"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-yellow-600 font-medium mt-1">₹{item.price}</p>
                      </div>
                      {isSelected && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-yellow-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}

        <div className="text-center mt-10">
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white text-lg px-8 py-3 rounded-lg font-semibold shadow-md transition-transform transform hover:-translate-y-0.5"
          >
            Order Now 🍴
          </button>
        </div>
      </form>
    </div>
  );
}
