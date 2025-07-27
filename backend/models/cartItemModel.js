const db = require("../config/db");

// Get All Cart Items
const getAllCartItems = (callback) => {
    db.query("SELECT * FROM Cart_Item", callback);
};

// Get Cart Item By ID
const getCartItemById = (id, callback) => {
    db.query("SELECT * FROM Cart_Item WHERE CartItem_ID = ?", [id], (err, results) => {
        if (err) return callback(err);
        callback(null, results.length ? results[0] : null);
    });
};

// Create New Cart Item (Check if cart exists, update quantity if item exists)
const createCartItem = (cartItemData, callback) => {
    const { Product_ID, Quantity, Cart_ID } = cartItemData;

    if (!Product_ID || !Cart_ID || Quantity <= 0) {
        return callback(new Error("Invalid input data"));
    }

    // Check if the cart exists
    db.query("SELECT * FROM Cart WHERE Cart_ID = ?", [Cart_ID], (err, cartResults) => {
        if (err) return callback(err);
        if (cartResults.length === 0) {
            return callback(new Error("Cart does not exist"));
        }

        // Check if the product already exists in the cart
        db.query(
            "SELECT * FROM Cart_Item WHERE Product_ID = ? AND Cart_ID = ?",
            [Product_ID, Cart_ID],
            (err, itemResults) => {
                if (err) return callback(err);

                if (itemResults.length > 0) {
                    // If item exists, update the quantity
                    db.query(
                        "UPDATE Cart_Item SET Quantity = Quantity + ? WHERE Product_ID = ? AND Cart_ID = ?",
                        [Quantity, Product_ID, Cart_ID],
                        (err) => {
                            if (err) return callback(err);
                            callback(null, { message: "Cart item updated successfully" });
                        }
                    );
                } else {
                    // If item doesn't exist, insert a new cart item
                    db.query(
                        "INSERT INTO Cart_Item (Product_ID, Quantity, Cart_ID) VALUES (?, ?, ?)",
                        [Product_ID, Quantity, Cart_ID],
                        (err, result) => {
                            if (err) return callback(err);
                            callback(null, { message: "Cart item added successfully", CartItem_ID: result.insertId });
                        }
                    );
                }
            }
        );
    });
};

// Update Cart Item Quantity
const updateCartItem = (id, cartItemData, callback) => {
    const { Quantity } = cartItemData;

    if (Quantity <= 0) {
        // If quantity is 0, remove the item from the cart
        return deleteCartItem(id, callback);
    }

    db.query(
        "UPDATE Cart_Item SET Quantity=? WHERE CartItem_ID=?",
        [Quantity, id],
        (err, result) => {
            if (err) return callback(err);
            if (result.affectedRows === 0) {
                return callback(new Error("Cart item not found"));
            }
            callback(null, { message: "Cart item updated successfully" });
        }
    );
};

// Delete Cart Item
const deleteCartItem = (id, callback) => {
    db.query("DELETE FROM Cart_Item WHERE CartItem_ID=?", [id], (err, result) => {
        if (err) return callback(err);
        if (result.affectedRows === 0) {
            return callback(new Error("Cart item not found"));
        }
        callback(null, { message: "Cart item deleted successfully" });
    });
};

module.exports = { getAllCartItems, getCartItemById, createCartItem, updateCartItem, deleteCartItem };
