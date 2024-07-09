import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState('');
  const [image, setImageUrl] = useState("");
  // const [localImage,setLocalImage] = useState("");
  const [desc, setDesc] = useState("");

  const navigate = useNavigate();

  const handleChange = async (e) => {
    e.preventDefault();

    const addProduct = { title, price, image, desc };

    const request = await fetch("http://localhost:4000/product", {
      method: "POST",
      body: JSON.stringify(addProduct),
      headers: {
        "Content-Type": "application/json"
      }
    })

    const response = await request.json();

    if (!request.ok) {
      console.log(response.error);
    } else {
      console.log(response);
      setTitle("");
      setPrice("");
      setImageUrl("");
      setDesc("");
      navigate('/product');
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center
                    bg-[url(https://wallpapers.com/images/high/dr-strange-hand-power-2ktt4a4iez0e7tcz.webp)]
                    bg-no-repeat bg-cover bg-center'>
      <div className="p-10 rounded-xl shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-white"><span className='text-black'>Add</span> Product</h2>
        <form onSubmit={handleChange}>
          <div className="mb-4">
            <label className="block text-black font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Product Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-black font-bold mb-2" htmlFor="price">
              Price
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="price"
              type="text"
              placeholder="Product Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white font-bold mb-2" htmlFor="imageInput">
              Image URL
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="imageUrl"
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              placeholder="Product Description"
              rows="3"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
