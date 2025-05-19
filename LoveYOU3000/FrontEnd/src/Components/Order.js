import React, { useState, useEffect } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';

const OrderPage = () => {
    const [orders, setOrders] = useState({});
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [sortOption, setSortOption] = useState('user');
    const [filterOptions, setFilterOptions] = useState([]);
    const [activeFilters, setActiveFilters] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        fetchOrders();
    }, [sortOption, startDate, endDate]);

    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            let url = `http://localhost:4000/api/orders?sort=${sortOption}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch orders');
            const data = await response.json();

            // Apply date filtering client-side
            const filteredByDate = data.filter(order => {
                const createdAt = new Date(order.createdAt);
                const from = startDate ? new Date(startDate) : null;
                const to = endDate ? new Date(endDate) : null;
                return (!from || createdAt >= from) && (!to || createdAt <= to);
            });

            const grouped = groupOrders(filteredByDate, sortOption);
            setOrders(grouped);
            setFilterOptions(Object.keys(grouped));
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const groupOrders = (data, option) => {
        const grouped = {};
        data.forEach(order => {
            if (option === 'user') {
                const groupKey = order.user;
                if (!grouped[groupKey]) grouped[groupKey] = [];
                grouped[groupKey].push(order);
            } else if (option === 'product') {
                order.products.forEach(product => {
                    const groupKey = product.product;
                    if (!grouped[groupKey]) grouped[groupKey] = [];
                    grouped[groupKey].push(order);
                });
            } else if (option === 'user-product') {
                order.products.forEach(product => {
                    const groupKey = `${order.user}-${product.product}`;
                    if (!grouped[groupKey]) grouped[groupKey] = [];
                    grouped[groupKey].push(order);
                });
            }
        });

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

            if (!response.ok) throw new Error('Failed to delete order');

            const newOrders = {};
            for (const [key, orderList] of Object.entries(orders)) {
                const filtered = orderList.filter(order => order._id !== orderId);
                if (filtered.length > 0) {
                    newOrders[key] = filtered;
                }
            }
            setOrders(newOrders);
            if (selectedOrder && selectedOrder._id === orderId) setSelectedOrder(null);
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    const getUniqueProductCount = (products) => {
        const uniqueProducts = new Set(products.map(product => product.product));
        return uniqueProducts.size;
    };

    const chartData = Object.entries(orders).map(([key, value]) => ({
        name: key,
        Orders: value.length
    })).filter(d => activeFilters.length === 0 || activeFilters.includes(d.name));

    const toggleFilter = (key) => {
        setActiveFilters(prev =>
            prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
        );
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-8 text-center">Orders</h1>

            <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center space-x-2">
                    <label className="font-medium">Sort By:</label>
                    <select
                        className="border p-2 rounded-lg"
                        value={sortOption}
                        onChange={(e) => {
                            setSortOption(e.target.value);
                            setActiveFilters([]);
                        }}
                    >
                        <option value="user">User Email</option>
                        <option value="product">Product</option>
                        <option value="user-product">User and Product</option>
                    </select>
                </div>
                <div className="flex items-center bg-gray-100 px-4 py-3 rounded-lg shadow-sm space-x-4">
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-700 font-medium">From</span>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                        />
                    </div>
                    <span className="text-gray-500">→</span>
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-700 font-medium">To</span>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                        />
                    </div>
                </div>

            </div>

            {filterOptions.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                    {filterOptions.map((option) => (
                        <button
                            key={option}
                            onClick={() => toggleFilter(option)}
                            className={`px-3 py-1 rounded-full border text-sm transition duration-200 shadow-sm ${activeFilters.includes(option)
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-blue-600 border-blue-600'
                                }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}

            {isLoading ? (
                <p className="text-center text-xl">Loading...</p>
            ) : (
                Object.entries(orders)
                    .filter(([group]) => activeFilters.length === 0 || activeFilters.includes(group))
                    .map(([group, orderList]) => (
                        <div key={group} className="mb-8">
                            <h2 className="text-xl font-semibold mb-4 text-blue-600">{group}</h2>
                            {orderList.map((order) => {
                                const uniqueProductCount = getUniqueProductCount(order.products);
                                const isSelected = selectedOrder && selectedOrder._id === order._id;

                                return (
                                    <div key={order._id}>
                                        <div
                                            className={`p-4 mb-2 rounded-lg flex justify-between items-center cursor-pointer ${isSelected ? 'bg-gray-300' : 'bg-white hover:bg-gray-100'
                                                } shadow-md transition-all duration-200`}
                                        >
                                            <div className="flex items-center space-x-6">
                                                <p className="font-semibold text-lg">{order.user}</p>
                                                <p className="text-gray-600">Unique Products: {uniqueProductCount}</p>
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

                                        {isSelected && (
                                            <div className="p-4 bg-gray-100 rounded-lg mt-2 shadow-inner relative">
                                                <button
                                                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-lg font-bold"
                                                    onClick={() => setSelectedOrder(null)}
                                                >
                                                    &times;
                                                </button>
                                                <h3 className="text-xl font-semibold mb-4">Order Details</h3>
                                                <div className="flex flex-col space-y-2">
                                                    <p className="font-bold text-lg">Email: {selectedOrder.user}</p>
                                                    <p className="font-bold text-lg">Total Amount: ${selectedOrder.totalAmount}</p>
                                                    <div className="space-y-2">
                                                        <h4 className="font-semibold text-lg">Products:</h4>
                                                        {selectedOrder.products.map((product, index) => (
                                                            <div key={index} className="relative group p-4 bg-white shadow rounded-lg">
                                                                <p className="font-bold">{product.product}</p>
                                                                <p>Quantity: {product.quantity}</p>
                                                                <p>Price: ${product.price}</p>
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
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ))
            )}

            {chartData.length > 0 && (
                <div className="mt-10">
                    <h2 className="text-xl font-semibold mb-4 text-center">Order Distribution Chart</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="Orders" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
};

export default OrderPage;
