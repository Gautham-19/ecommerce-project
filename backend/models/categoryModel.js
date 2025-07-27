const db = require("../config/db");

// Get All Categories
const getAllCategories = (callback) => {
    db.query("SELECT * FROM Product_Category", callback);
};

// Get Category By ID
const getCategoryById = (id, callback) => {
    db.query("SELECT * FROM Product_Category WHERE Category_ID = ?", [id], callback);
};

// Create New Category
const createCategory = (categoryData, callback) => {
    const { Category_Name } = categoryData;
    db.query(
        "INSERT INTO Product_Category (Category_Name) VALUES (?)",
        [Category_Name],
        callback
    );
};

// Update Category
const updateCategory = (id, categoryData, callback) => {
    const { Category_Name } = categoryData;
    db.query(
        "UPDATE Product_Category SET Category_Name=? WHERE Category_ID=?",
        [Category_Name, id],
        callback
    );
};

// Delete Category
const deleteCategory = (id, callback) => {
    db.query("DELETE FROM Product_Category WHERE Category_ID=?", [id], callback);
};

module.exports = { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
