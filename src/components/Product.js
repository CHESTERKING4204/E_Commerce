import React, { useState, useEffect } from "react";

const Product = () => {
    const [data, setData] = useState([]);

    async function getData() {

        try {
            const response = await fetch('http://localhost:5000/product');
            const result = await response.json();

            if (response.ok) {
                setData(result);
            }
            if (!response.ok) {
                console.log(result.error, 'Fetching product error');
            }
        } catch (error) {
            console.log(error, 'This is the not fetched error');
        }

    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <h1>This is Product Page</h1>

            <div className="row">
                {data?.map((ele) => (
                    <div className="Box" key={ele._id}>
                        <h1>Title:{ele.title}</h1>
                        <h2>Price:{ele.price}</h2>
                        <img src={ele.imageUrl} alt="My fault" />
                        <p>Description:{ele.description}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Product;