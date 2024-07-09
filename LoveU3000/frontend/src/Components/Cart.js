import React from 'react';

const Cart = ({ title, price, imageUrl, description, onDelete }) => {
  // const [addedToCart, setAddedToCart] = useState({});

  return (
    <div className="group relative w-full max-w-xs mx-auto my-4 transform transition-all duration-300 hover:-translate-y-2">
      <div className="relative h-60 w-full overflow-hidden rounded-lg shadow-lg bg-white transition-all duration-300 hover:shadow-2xl">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-70"></div>
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-md font-semibold">${price}</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-700 text-sm overflow-hidden text-overflow whitespace">{description}</p>
        <button
          onClick={onDelete}
          className="mt-2 w-full py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition-all duration-300"
        >
          Delete from Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
