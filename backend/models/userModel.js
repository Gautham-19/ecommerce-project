const db = require("../config/db");

// Get All Users
const getAllUsers = (callback) => {
    db.query("SELECT * FROM User", callback);
};

// Get User By ID
const getUserById = (id, callback) => {
    db.query("SELECT * FROM User WHERE User_ID = ?", [id], callback);
};

// Create New User
const createUser = (userData, callback) => {
    const { Name, Address, Phone_Number, Email } = userData;
    db.query(
        "INSERT INTO User (Name, Address, Phone_Number, Email) VALUES (?, ?, ?, ?)",
        [Name, Address, Phone_Number, Email],
        callback
    );
};

// Update User
const updateUser = (id, userData, callback) => {
    const { Name, Address, Phone_Number, Email } = userData;
    db.query(
        "UPDATE User SET Name=?, Address=?, Phone_Number=?, Email=? WHERE User_ID=?",
        [Name, Address, Phone_Number, Email, id],
        callback
    );
};

// Delete User
const deleteUser = (id, callback) => {
    db.query("DELETE FROM User WHERE User_ID=?", [id], callback);
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
