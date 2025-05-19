import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../Hooks/useAuthContext';

const ViewProd = () => {
  const { id } = useParams();
  const [prod, setprod] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [projection, setProjection] = useState({
    image: true,
    title: true,
    price: true,
    description: true,
  });

  useEffect(() => {
    fetch(`http://localhost:4000/product/${id}`)
      .then(response => response.json())
      .then(data => setprod(data))
      .catch(error => console.error('Error fetching product:', error));
  }, [id]);

  if (!prod) {
    return <p className="text-center text-xl font-semibold">Loading...</p>;
  }

  const toggleField = (field) => {
    setProjection(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="container mx-auto p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="top-4 left-4 p-2 bg-gray-800 text-white rounded-full shadow-md hover:bg-gray-700 transition duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Projection Options */}
      <div className="flex justify-center space-x-4 my-6">
        {['image', 'title', 'price', 'description'].map(field => (
          <label key={field} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={projection[field]}
              onChange={() => toggleField(field)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="text-gray-700 capitalize">{field}</span>
          </label>
        ))}
      </div>

      {/* Product Details Section */}
      <div className="flex justify-center items-center bg-white shadow-lg rounded-lg p-8 space-x-8">
        {/* Product Image */}
        {projection.image && (
          <div className="flex-shrink-0 w-1/3">
            <img
              src={prod.imageUrl}
              alt={prod.title}
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          </div>
        )}

        {/* Product Info */}
        <div className="w-2/3">
          {projection.title && (
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{prod.title}</h1>
          )}
          {projection.price && (
            <h2 className="text-xl text-gray-600 mb-4">Price: ${prod.price}</h2>
          )}
          {projection.description && (
            <p className="text-lg text-gray-500 mb-4">{prod.description}</p>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={() => alert('Yuss Added to the cart')}
            className="mt-4 py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
          >
            Add To Cart
          </button>

          {/* Update Product Button for Logged-in Users */}
          {user && (
            <button
              onClick={() => navigate(`/updateProduct/${prod._id}`)}
              className="mt-4 ml-4 py-2 px-6 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
            >
              Update Product
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewProd;
