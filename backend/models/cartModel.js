const db = require("../config/db");

// Get all carts
const getAllCarts = (callback) => {
    db.query("SELECT * FROM Cart", callback);
};

// Get cart by ID
const getCartById = (cartId, callback) => {
    db.query(
        `SELECT Cart.Cart_ID, Product.Product_ID, Product.Name, Product.Price, Cart_Item.Quantity, Cart_Item.CartItem_ID
         FROM Cart 
         JOIN Cart_Item ON Cart.Cart_ID = Cart_Item.Cart_ID
         JOIN Product ON Cart_Item.Product_ID = Product.Product_ID
         WHERE Cart.Cart_ID = ?`,
        [cartId],
        callback
    );
};

// Get cart for a specific user
const getUserCart = (userId, callback) => {
    db.query(
        `SELECT Cart.Cart_ID, Product.Product_ID, Product.Name, Product.Price, Cart_Item.Quantity, Cart_Item.CartItem_ID
         FROM Cart 
         JOIN Cart_Item ON Cart.Cart_ID = Cart_Item.Cart_ID
         JOIN Product ON Cart_Item.Product_ID = Product.Product_ID
         WHERE Cart.User_ID = ?`,
        [userId],
        callback
    );
};

// Add item to cart (create new cart if needed)
const addToCart = (cartData, callback) => {
    const { User_ID, Product_ID, Quantity } = cartData;

    if (!User_ID || !Product_ID || !Quantity) {
        return callback(new Error("User_ID, Product_ID, and Quantity are required."));
    }

    db.query("SELECT Cart_ID FROM Cart WHERE User_ID = ?", [User_ID], (err, results) => {
        if (err) return callback(err);

        let Cart_ID;
        if (results.length > 0) {
            Cart_ID = results[0].Cart_ID;
            insertOrUpdateCartItem(Cart_ID);
        } else {
            db.query("INSERT INTO Cart (User_ID) VALUES (?)", [User_ID], (err, result) => {
                if (err) return callback(err);
                Cart_ID = result.insertId;
                insertOrUpdateCartItem(Cart_ID);
            });
        }

        function insertOrUpdateCartItem(cartId) {
            db.query("SELECT * FROM Cart_Item WHERE Cart_ID = ? AND Product_ID = ?", [cartId, Product_ID], (err, results) => {
                if (err) return callback(err);

                if (results.length > 0) {
                    db.query(
                        "UPDATE Cart_Item SET Quantity = Quantity + ? WHERE Cart_ID = ? AND Product_ID = ?",
                        [Quantity, cartId, Product_ID],
                        (err) => {
                            if (err) return callback(err);
                            callback(null, { message: "Item quantity updated", Cart_ID: cartId });
                        }
                    );
                } else {
                    db.query(
                        "INSERT INTO Cart_Item (Cart_ID, Product_ID, Quantity) VALUES (?, ?, ?)",
                        [cartId, Product_ID, Quantity],
                        (err) => {
                            if (err) return callback(err);
                            callback(null, { message: "Item added to cart", Cart_ID: cartId });
                        }
                    );
                }
            });
        }
    });
};

// Remove item from cart
const removeFromCart = (cartItemId, callback) => {
    db.query("DELETE FROM Cart_Item WHERE CartItem_ID = ?", [cartItemId], callback);
};

module.exports = { getAllCarts, getCartById, getUserCart, addToCart, removeFromCart };
