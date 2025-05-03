import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    price: '',
    description: '',
    imageUrl: ''
  });

  useEffect(() => {
    fetch(`http://localhost:4000/product/${id}`)
      .then(res => res.json())
      .then(data => {
        setForm(data);
      })
      .catch(err => console.error('Error loading product', err));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`http://localhost:4000/product/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
  
      if (!response.ok) {
        // Attempt to parse only if content-type is JSON
        const contentType = response.headers.get('content-type');
        const errorData = contentType && contentType.includes('application/json')
          ? await response.json()
          : { error: 'Unexpected error (non-JSON response)' };
  
        console.error('Error updating product:', errorData);
        alert('Failed to update product.');
      } else {
        // alert('Product updated successfully!');
        navigate(`/product/${id}`);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Something went wrong.');
    }
  };
  
  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h2 className="text-3xl font-bold mb-6">Update Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full p-2 border rounded" />
        <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" className="w-full p-2 border rounded" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" />
        <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Image URL" className="w-full p-2 border rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
