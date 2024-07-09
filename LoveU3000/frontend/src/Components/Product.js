import React, { useEffect, useState } from "react";
import { useAuthContext } from '../Hooks/useAuthContext'


const ProductCard = () => {
  const [addedToCart, setAddedToCart] = useState({});
  const [data, setData] = useState([]);

  const { user } = useAuthContext();


  async function getData() {
    const response = await fetch("http://localhost:4000/product");

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
    } else {
      setData(result);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const handleAddToCart = (id) => {
    console.log(id);
    setAddedToCart((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {data.map((prod) => (
        <div
          key={prod._id}
          className="group relative w-full max-w-xs mx-auto my-4 transform transition-all duration-300 hover:-translate-y-2"
        >
          <div className="relative h-60 w-full overflow-hidden rounded-lg shadow-lg bg-white transition-all duration-300 hover:shadow-2xl">
            <img
              src={prod.imageUrl}
              alt={prod.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-70"></div>
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <h2 className="text-xl font-bold">{prod.title}</h2>
              <p className="text-md font-semibold">${prod.price}</p>
            </div>
          </div>
          {user && (
            <div className="mt-4 flex flex-col justify-between h-32">
              <p className="text-gray-700 text-sm line-clamp-3">{prod.description}</p>
              <button
                onClick={() => handleAddToCart(prod._id)}
                className={`mt-4 w-full py-2 px-4 rounded-lg text-white font-bold transition-all duration-300 ${addedToCart[prod._id]
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-blue-500 hover:bg-blue-600"
                  }`}
              >
                {addedToCart[prod._id] ? "Added to Cart" : "Add to Cart"}
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
