import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
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


  // const handleAddToCart = async (id) => {
  //   const response = await fetch('http://localhost:3000/cart',{
  //     method:'POST',
  //     body: JSON.stringify(id),
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   })
  //   console.log("This is the shit");
  //   console.log(id);
  //   setAddedToCart((prevState) => ({
  //     ...prevState,
  //     [id]: !prevState[id],
  //   }));
  // };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/product/${id}`, {
        method: 'DELETE', // Use DELETE method to delete a product
      });

      if (response.ok) {
        // Remove the deleted product from the state without fetching data again
        setData(data.filter((product) => product._id !== id));
      } else {
        console.error("Failed to delete the product");
      }
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  }

  const handleAddToCart = async (id) => {
    try {
      if (!id) {
        console.error("Product ID is missing!");
        return;
    }
    
      // Correctly use the id variable in the URL
      const response = await fetch(`http://localhost:4000/product/${id}`);
      console.log(response);

      const product = await response.json();
      console.log(product.title);

      const cartResponse = await fetch(`http://localhost:4000/cart/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: product.title,
          price: product.price,
          imageUrl: product.imageUrl,
          description: product.description
        }),
      });

      if (!cartResponse.ok) {
        throw new Error('Failed to add product to cart');
      }

      setAddedToCart((prevState) => ({
        ...prevState,
        [id]: !prevState[id],
      }));
    } catch (error) {
      console.log({ message: error.message });
    }

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
            <div className="mt-4 flex flex-col justify-between h-26">
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
              <div>
                <button onClick={()=>handleDelete(prod._id)}
                className="mt-1 w-1/2 py-2 px-4 rounded-lg bg-red-500 font-bold">
                  Delete 
              </button>
              <button className="mt-1 w-1/2 py-2 px-4 rounded-lg bg-green-400 font-bold">
                <Link to ={`/product/${prod._id}`}>View</Link>
              </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
