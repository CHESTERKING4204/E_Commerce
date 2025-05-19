import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "../Hooks/useAuthContext";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthContext();
  console.log(user);
  useEffect(() => {
    fetch('http://localhost:4000/cart')
      .then(response => response.json())
      .then(data => {
        const updatedItems = data.map(item => ({ ...item, quantity: 1 }));
        setCartItems(updatedItems);
      })
      .catch(error => console.error('Error fetching cart items:', error));
  }, []);

  const updateCartItemQuantity = (id, increase = true) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === id && (increase ? item.quantity < 39 : item.quantity > 1)
          ? { ...item, quantity: item.quantity + (increase ? 1 : -1) }
          : item
      )
    );
  };

  const handleDelete = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== id));

    fetch(`http://localhost:4000/cart/${id}`, { method: 'DELETE' })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete item');
        }
      })
      .catch(error => console.error('Error deleting item:', error));
  };

  const totalCartPrice = useMemo(() => 
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2),
    [cartItems]
  );

  const handlePayment = async () => {
    const userId = user.email;

    const orderPayload = {
      user: userId,
      products: cartItems.map(item => ({
        product_Id:item._id,
        product: item.title,
        quantity: item.quantity,
        price: item.price,
        imagePic:item.imageUrl
      })),
      totalAmount: parseFloat(totalCartPrice)
    };
    console.log(orderPayload);
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:4000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload),
      });

      if (!response.ok) {
        throw new Error('Failed to submit order');
      }

      setPaymentSuccess(true);
      setCartItems([]);

      setTimeout(() => {
        navigate('/product');
      }, 3000);
    } catch (error) {
      console.error('Error during payment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen pb-32">
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
                        onClick={() => updateCartItemQuantity(item._id, false)}
                        className="w-8 h-8 bg-gray-300 text-black rounded-md flex justify-center items-center"
                      >
                        -
                      </button>
                      <span className="mx-4">{item.quantity}</span>
                      <button
                        onClick={() => updateCartItemQuantity(item._id, true)}
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

      {/* Bottom Sticky Bar */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 flex justify-between items-center z-50">
          <p className="text-lg font-bold">Total: ${totalCartPrice}</p>
          <button
            onClick={handlePayment}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg font-semibold transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Pay Now'}
          </button>
        </div>
      )}

      {/* Payment Success Animation */}
      {paymentSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center z-50">
          <div className="text-white text-3xl font-bold mb-4 animate-bounce">
            Payment Successful 🎉
          </div>
          <div className="text-white text-md">Redirecting to Product Page...</div>
        </div>
      )}
    </div>
  );
};

export default Cart;
