import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://via.placeholder.com/150", cost: "$15" },
        { name: "Spider Plant", image: "https://via.placeholder.com/150", cost: "$12" }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://via.placeholder.com/150", cost: "$20" },
        { name: "Jasmine", image: "https://via.placeholder.com/150", cost: "$18" }
      ]
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        { name: "Aloe Vera", image: "https://via.placeholder.com/150", cost: "$10" },
        { name: "Peace Lily", image: "https://via.placeholder.com/150", cost: "$22" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <div>
      <nav className="navbar">
        <h2>Paradise Nursery</h2>
        <div className="nav-links">
          <button onClick={() => setShowCart(false)}>Plants</button>
          <button onClick={() => setShowCart(true)}>Cart ({totalQuantity})</button>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((categoryObj, index) => (
            <div key={index}>
              <h2>{categoryObj.category}</h2>
              <div className="category-plants">
                {categoryObj.plants.map((plant, pIndex) => {
                  const isAdded = cartItems.some(item => item.name === plant.name);
                  return (
                    <div className="plant-card" key={pIndex}>
                      <img src={plant.image} alt={plant.name} />
                      <h3>{plant.name}</h3>
                      <p>{plant.cost}</p>
                      <button 
                        disabled={isAdded} 
                        onClick={() => handleAddToCart(plant)}
                      >
                        {isAdded ? "Added to Cart" : "Add to Cart"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
