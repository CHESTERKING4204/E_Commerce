import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();

    const handleChange = async (e) => {
        const addProduct = { title, price, imageUrl, description };

        const response = await fetch('http://localhost:5000/product', {
            method: 'POST',
            body: JSON.stringify(addProduct),
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            }
        });

        const result = await response.json();
        if (!response.ok) {
            console.log(result.error);
        }
        if (response.ok) {
            console.log(result);
            navigate('http://localhost:3000/product/');
        }
    }


    return (
        <div style={{ margin: "10vh 10vw", backgroundColor: "red", alignContent: "center", padding: "25px", borderRadius: "20px" }}>
            <form id='addProduct_form' style={{ marginLeft: "25vw" }} onSubmit={handleChange} action='/product'>
                <div>
                    <h1>Title</h1>
                    <input className='input' type='title' name='title' value={title} onChange={e => { setTitle(e.target.value) }} />
                </div>
                <div>
                    <h1>Price</h1>
                    <input className='input' type='price' name='price' value={price} onChange={e => { setPrice(e.target.value) }} />
                </div>
                <div>
                    <h1>Image URL</h1>
                    <input className='input' type='imageURL' name='imageURL' value={imageUrl} onChange={e => { setImageUrl(e.target.value) }} />
                </div>
                <div>
                    <h1>Description</h1>
                    <input className='input' type='description' name='description' value={description} onChange={e => { setDescription(e.target.value) }} />
                </div>
                <button type='submit' style={{ marginTop: "8vh", width: "15vw", height: "5vh", borderRadius: "10px", fontSize: "20px", cursor: "pointer" }}>Submit</button>
            </form>
        </div>
    )
}

export default AddProduct;