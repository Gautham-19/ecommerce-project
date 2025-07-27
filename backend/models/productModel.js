const db = require("../config/db");

// Get All Products
const getAllProducts = (callback) => {
    db.query("SELECT * FROM Product", callback);
};

// Get Product By ID
const getProductById = (id, callback) => {
    db.query("SELECT * FROM Product WHERE Product_ID = ?", [id], callback);
};

// Create New Product
const createProduct = (productData, callback) => {
    const { Name, Price, Category_ID, Quantity } = productData;
    
    db.query(
        "INSERT INTO Product (Name, Price, Category_ID, Quantity) VALUES (?, ?, ?, ?)",
        [Name, Price, Category_ID, Quantity],
        callback
    );
};

// Update Product
const updateProduct = (id, productData, callback) => {
    const { Name, Price, Category_ID, Quantity } = productData;

    db.query(
        "UPDATE Product SET Name=?, Price=?, Category_ID=?, Quantity=? WHERE Product_ID=?",
        [Name, Price, Category_ID, Quantity, id],
        callback
    );
};

// Delete Product
const deleteProduct = (id, callback) => {
    db.query("DELETE FROM Product WHERE Product_ID=?", [id], callback);
};

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
