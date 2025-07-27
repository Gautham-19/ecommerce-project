const db = require("../config/db");

// Get All Order Items
const getAllOrderItems = (callback) => {
    db.query("SELECT * FROM Order_Item", callback);
};

// Get Order Item By ID
const getOrderItemById = (id, callback) => {
    db.query("SELECT * FROM Order_Item WHERE OrderItem_ID = ?", [id], callback);
};

// Create New Order Item
const createOrderItem = (orderItemData, callback) => {
    const { Order_ID, Product_ID, Quantity, Price } = orderItemData;
    db.query(
        "INSERT INTO Order_Item (Order_ID, Product_ID, Quantity, Price) VALUES (?, ?, ?, ?)",
        [Order_ID, Product_ID, Quantity, Price],
        callback
    );
};

// Update Order Item
const updateOrderItem = (id, orderItemData, callback) => {
    const { Order_ID, Product_ID, Quantity, Price } = orderItemData;
    db.query(
        "UPDATE Order_Item SET Order_ID=?, Product_ID=?, Quantity=?, Price=? WHERE OrderItem_ID=?",
        [Order_ID, Product_ID, Quantity, Price, id],
        callback
    );
};

// Delete Order Item
const deleteOrderItem = (id, callback) => {
    db.query("DELETE FROM Order_Item WHERE OrderItem_ID=?", [id], callback);
};

module.exports = { getAllOrderItems, getOrderItemById, createOrderItem, updateOrderItem, deleteOrderItem };
