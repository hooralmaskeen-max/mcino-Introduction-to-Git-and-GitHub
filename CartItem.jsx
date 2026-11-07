import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinueShopping }) {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const costNum = parseFloat(item.cost.replace('$', ''));
      return total + costNum * item.quantity;
    }, 0).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div className="cart-container">
      <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>
      {cart.map((item, index) => (
        <div className="cart-item" key={index}>
          <img src={item.image} alt={item.name} />
          <div>
            <h3>{item.name}</h3>
            <p>Unit Price: {item.cost}</p>
            <p>Subtotal: ${(parseFloat(item.cost.replace('$', '')) * item.quantity).toFixed(2)}</p>
            <button onClick={() => handleDecrement(item)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => handleIncrement(item)}>+</button>
            <button onClick={() => handleRemove(item)}>Delete</button>
          </div>
        </div>
      ))}
      <button onClick={onContinueShopping}>Continue Shopping</button>
      <button onClick={() => alert('Checkout functionality is coming soon!')}>Checkout</button>
    </div>
  );
}

export default CartItem;
