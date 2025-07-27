const Cart = require("../models/cartModel");

// Get all carts
exports.getAllCarts = (req, res) => {
    Cart.getAllCarts((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Get cart by cart ID
exports.getCartById = (req, res) => {
    Cart.getCartById(req.params.cartId, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Get cart items for a specific user
exports.getUserCart = (req, res) => {
    Cart.getUserCart(req.params.userId, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Add an item to the cart
exports.addToCart = (req, res) => {
    Cart.addToCart(req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json(result);
    });
};

// Remove an item from the cart
exports.removeFromCart = (req, res) => {
    Cart.removeFromCart(req.params.cartItemId, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Item removed from cart" });
    });
};
