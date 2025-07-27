const db = require("../config/db");

// Get All Orders
const getAllOrders = (callback) => {
    db.query("SELECT * FROM `Order`", callback);
};

// Get Order By ID
const getOrderById = (id, callback) => {
    db.query("SELECT * FROM `Order` WHERE Order_ID = ?", [id], callback);
};

// Create New Order
const createOrder = (orderData, callback) => {
    const { User_ID, OrderDate, Total_Amount } = orderData;
    db.query(
        "INSERT INTO `Order` (User_ID, OrderDate, Total_Amount) VALUES (?, ?, ?)",
        [User_ID, OrderDate, Total_Amount],
        callback
    );
};

// Update Order
const updateOrder = (id, orderData, callback) => {
    const { User_ID, OrderDate, Total_Amount } = orderData;
    db.query(
        "UPDATE `Order` SET User_ID=?, OrderDate=?, Total_Amount=? WHERE Order_ID=?",
        [User_ID, OrderDate, Total_Amount, id],
        callback
    );
};

// Delete Order
const deleteOrder = (id, callback) => {
    db.query("DELETE FROM `Order` WHERE Order_ID=?", [id], callback);
};

module.exports = { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder };
