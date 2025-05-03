import React, { useState, useEffect } from 'react';

const OrderPage = () => {
    const [orders, setOrders] = useState({});
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [sortOption, setSortOption] = useState('user'); // Default sorting by user email

    useEffect(() => {
        fetchOrders();
    }, [sortOption]); // Fetch orders when sorting option changes

    const fetchOrders = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/orders?sort=${sortOption}`);
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            const data = await response.json();

            // Group by the selected sorting option and sort orders within each group
            const grouped = groupOrders(data, sortOption);

            setOrders(grouped);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setIsLoading(false);
        }
    };

    const groupOrders = (data, option) => {
        const grouped = {};
        data.forEach(order => {
            let groupKey;
            if (option === 'user') {
                groupKey = order.user;
            } else if (option === 'product') {
                order.products.forEach(product => {
                    groupKey = product.product;
                    if (!grouped[groupKey]) grouped[groupKey] = [];
                    grouped[groupKey].push(order);
                });
                return;
            } else if (option === 'user-product') {
                order.products.forEach(product => {
                    groupKey = `${order.user}-${product.product}`;
                    if (!grouped[groupKey]) grouped[groupKey] = [];
                    grouped[groupKey].push(order);
                });
                return;
            }
            if (!grouped[groupKey]) grouped[groupKey] = [];
            grouped[groupKey].push(order);
        });

        // Now, sort the orders within each group by createdAt descending
        Object.keys(grouped).forEach(group => {
            grouped[group].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        });

        return grouped;
    };

    const handleOrderClick = (orderId) => {
        const allOrders = Object.values(orders).flat();
        const order = allOrders.find((o) => o._id === orderId);
        setSelectedOrder(order);
    };

    const handleDeleteOrder = async (orderId) => {
        try {
            const response = await fetch(`http://localhost:4000/api/orders/${orderId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete order');
            }

            // Remove the deleted order from the grouped state
            const newOrders = {};
            for (const [email, orderList] of Object.entries(orders)) {
                newOrders[email] = orderList.filter((order) => order._id !== orderId);
            }
            setOrders(newOrders);
            if (selectedOrder && selectedOrder._id === orderId) {
                setSelectedOrder(null);
            }
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    const renderOrderDetails = () => {
        if (!selectedOrder) return null;
        return (
            <div className="p-4 bg-gray-100 rounded-lg mt-6 shadow-md">
                <h3 className="text-xl font-semibold mb-4">Order Details</h3>
                <div className="flex flex-col space-y-2">
                    <p className="font-bold text-lg">Email: {selectedOrder.user}</p>
                    <p className="font-bold text-lg">Total Amount: ${selectedOrder.totalAmount}</p>
                    <div className="space-y-2">
                        <h4 className="font-semibold text-lg">Products:</h4>
                        {selectedOrder.products.map((product, index) => (
                            <div key={index} className="relative group p-4 bg-white shadow-lg rounded-lg">
                                <p className="font-bold">{product.product}</p>
                                <p>Quantity: {product.quantity}</p>
                                <p>Price: ${product.price}</p>

                                {/* Hover image for product */}
                                {product.imagePic && (
                                    <img
                                        src={product.imagePic}
                                        alt={product.product}
                                        className="absolute top-0 left-full ml-6 w-32 h-32 object-cover rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const getUniqueProductCount = (products) => {
        // Get the count of unique products in an order
        const uniqueProducts = new Set(products.map(product => product.product));
        return uniqueProducts.size;
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-8 text-center">Orders</h1>

            <div className="mb-6 flex justify-between items-center">
                <label className="text-lg font-semibold mr-4">Sort By: </label>
                <select
                    className="border p-2 rounded-lg shadow-sm"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                >
                    <option value="user">User Email</option>
                    <option value="product">Product</option>
                    <option value="user-product">User and Product</option>
                </select>
            </div>

            {isLoading ? (
                <p className="text-center text-xl">Loading...</p>
            ) : (
                Object.entries(orders).map(([group, orderList]) => (
                    <div key={group} className="mb-8">
                        <h2 className="text-xl font-semibold mb-4 text-blue-600">{group}</h2>
                        {orderList.map((order) => {
                            const uniqueProductCount = getUniqueProductCount(order.products);
                            const isSelected = selectedOrder && selectedOrder._id === order._id;

                            return (
                                <div
                                    key={order._id}
                                    className={`p-4 mb-4 rounded-lg flex justify-between items-center cursor-pointer 
                                    ${isSelected ? 'bg-gray-300' : 'bg-white hover:bg-gray-100'} shadow-md transition-all duration-200`}
                                >
                                    <div className="flex items-center space-x-6">
                                        <p className="font-semibold text-lg">{order.user}</p>
                                        <p className="text-gray-600">Quantity: {uniqueProductCount}</p> {/* Show unique product count */}
                                        <p className="font-semibold">${order.totalAmount}</p>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <span
                                            className="text-blue-500 cursor-pointer"
                                            onClick={() => handleOrderClick(order._id)}
                                        >
                                            View Details
                                        </span>
                                        <button
                                            className="ml-4 text-red-500 hover:text-red-700"
                                            onClick={() => handleDeleteOrder(order._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))
            )}

            {renderOrderDetails()}
        </div>
    );
};

export default OrderPage;
