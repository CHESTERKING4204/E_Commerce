import React, { useState, useEffect } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart data from backend on component mount
  useEffect(() => {
    fetch('http://localhost:4000/cart')
      .then(response => response.json())
      .then(data => {
        // Initialize each item's quantity to 1 when fetched
        const updatedItems = data.map(item => ({ ...item, quantity: 1 }));
        setCartItems(updatedItems);
      })
      .catch(error => console.error('Error fetching cart items:', error));
  }, []);

  // Increase quantity for a specific product with a max limit of 39
  const handleIncrease = (id) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === id && item.quantity < 39
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease quantity for a specific product with a min limit of 1
  const handleDecrease = (id) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Handle item deletion from the cart
  const handleDelete = (id) => {
    // Log the id being passed to the backend
    console.log('Deleting item with ID:', id);

    // Remove the item from the state by filtering out the item with the matching id
    setCartItems(prevItems => prevItems.filter(item => item._id !== id));

    // Send DELETE request to backend
    fetch(`http://localhost:4000/cart/${id}`, { method: 'DELETE' })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete item');
        }
        console.log('Item deleted successfully');
      })
      .catch(error => console.error('Error deleting item:', error));
  };

  return (
    <div className="container mx-auto p-6">
      {cartItems.length === 0 ? (
        <p className="text-center text-xl font-semibold">Your cart is empty</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cartItems.map((item) => {
            const totalPay = (item.price * item.quantity).toFixed(2);

            return (
              <div
                key={item._id}
                className="group relative w-full max-w-xs mx-auto my-4 transform transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-60 w-full overflow-hidden rounded-lg shadow-lg bg-white transition-all duration-300 hover:shadow-2xl">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-70"></div>
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h2 className="text-xl font-bold">{item.title}</h2>
                    <p className="text-md font-semibold">${item.price}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-gray-700 text-sm">{item.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <button
                      onClick={() => handleDecrease(item._id)}
                      className="w-8 h-8 bg-gray-300 text-black rounded-md flex justify-center items-center"
                    >
                      -
                    </button>
                    <span className="mx-4">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrease(item._id)}
                      className="w-8 h-8 bg-green-600 text-white rounded-md flex justify-center items-center"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-gray-800 font-bold mt-2">Total Pay: ${totalPay}</p>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="mt-2 w-full py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition-all duration-300"
                  >
                    Delete from Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Cart;
