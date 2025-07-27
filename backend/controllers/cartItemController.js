const CartItem = require("../models/cartItemModel");

exports.getAllCartItems = (req, res) => {
    CartItem.getAllCartItems((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.getCartItemById = (req, res) => {
    CartItem.getCartItemById(req.params.id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!result) return res.status(404).json({ message: "Cart item not found" });
        res.json(result);
    });
};

exports.createCartItem = (req, res) => {
    CartItem.createCartItem(req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json(result);
    });
};

exports.updateCartItem = (req, res) => {
    CartItem.updateCartItem(req.params.id, req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
};

exports.deleteCartItem = (req, res) => {
    CartItem.deleteCartItem(req.params.id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
};
