import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../Hooks/useAuthContext";

const ProductCard = () => {
  const [addedToCart, setAddedToCart] = useState({});
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sliceCount, setSliceCount] = useState("all");
  const [skipCount, setSkipCount] = useState();
  const [sortOrder, setSortOrder] = useState("");

  const { user } = useAuthContext();

  async function getData() {
    try {
      const response = await fetch("http://localhost:4000/product");
      const result = await response.json();
      if (response.ok) {
        setData(result);
      } else {
        console.log(result.error);
      }
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const handleAddToCart = async (id) => {
    try {
      if (!id) {
        console.error("Product ID is missing!");
        return;
      }

      const response = await fetch(`http://localhost:4000/product/${id}`);
      const product = await response.json();

      const cartResponse = await fetch(`http://localhost:4000/cart/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: product.title,
          price: product.price,
          imageUrl: product.imageUrl,
          description: product.description,
        }),
      });

      if (!cartResponse.ok) {
        throw new Error("Failed to add product to cart");
      }

      setAddedToCart((prevState) => ({
        ...prevState,
        [id]: !prevState[id],
      }));
    } catch (error) {
      console.log({ message: error.message });
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/product/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setData((prevData) => prevData.filter((product) => product._id !== id));
      } else {
        console.error("Failed to delete the product");
      }
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  };

  // Apply filtering
  let filteredProducts = data.filter((product) => {
    const matchesTag =
      product.tag &&
      product.tag.toLowerCase().includes(searchTerm.toLowerCase());

    const price = product.price || 0;
    const matchesPrice =
      priceFilter === "all" ||
      (priceFilter === "below50" && price < 50) ||
      (priceFilter === "50to100" && price >= 50 && price <= 100) ||
      (priceFilter === "100to200" && price > 100 && price <= 200) ||
      (priceFilter === "above200" && price > 200);

    return matchesTag && matchesPrice;
  });

  // Apply sorting
  if (sortOrder === "asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  // Apply skipping
  if (skipCount && !isNaN(skipCount)) {
    filteredProducts = filteredProducts.slice(Number(skipCount));
  }

  // Apply slicing
  if (sliceCount && sliceCount !== "all" && !isNaN(sliceCount)) {
    filteredProducts = filteredProducts.slice(0, Number(sliceCount));
  }

  return (
    <div className="p-6">
      {/* Filter Bar */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Tag Search */}
        <input
          type="text"
          placeholder="Search by tag..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-5 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg bg-white"
        />

        {/* Price Filter */}
        <select
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg bg-white"
        >
          <option value="all">All Prices</option>
          <option value="below50">Below $50</option>
          <option value="50to100">$50 - $100</option>
          <option value="100to200">$100 - $200</option>
          <option value="above200">Above $200</option>
        </select>

        {/* Sort Order */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg bg-white"
        >
          <option value="">Sort by Price</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>

        {/* Slice and Skip Inputs */}
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Top N"
            value={sliceCount}
            onChange={(e) => setSliceCount(e.target.value)}
            min="1"
            className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg bg-white"
          />
          <input
            type="number"
            placeholder="Skip N"
            value={skipCount}
            onChange={(e) => setSkipCount(e.target.value)}
            min="0"
            className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-lg bg-white"
          />
        </div>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((prod) => (
            <div
              key={prod._id}
              className="group relative w-full max-w-xs mx-auto my-4 transform transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative h-60 w-full overflow-hidden rounded-lg shadow-lg bg-white transition-all duration-300 hover:shadow-2xl">
                {prod.tag && (
                  <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold py-1 px-2 rounded-md">
                    {prod.tag}
                  </div>
                )}
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
                  <p className="text-gray-700 text-sm line-clamp-3">
                    {prod.description}
                  </p>
                  <button
                    onClick={() => handleAddToCart(prod._id)}
                    className={`mt-4 w-full py-2 px-4 rounded-lg text-white font-bold transition-all duration-300 ${addedToCart[prod._id]
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-blue-500 hover:bg-blue-600"
                      }`}
                  >
                    {addedToCart[prod._id] ? "Added to Cart" : "Add to Cart"}
                  </button>

                  <div className="flex gap-2 mt-1">
                    <button
                      onClick={() => handleDelete(prod._id)}
                      className="mt-1 w-1/2 py-2 px-4 rounded-lg bg-red-500 text-white font-bold"
                    >
                      Delete
                    </button>
                    <Link
                      to={`/product/${prod._id}`}
                      className="mt-1 w-1/2 py-2 px-4 rounded-lg bg-green-400 text-white font-bold text-center"
                    >
                      View
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 text-xl">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
