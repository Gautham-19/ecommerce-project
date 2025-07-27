const Order = require("../models/orderModel");

exports.getAllOrders = (req, res) => {
    Order.getAllOrders((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.getOrderById = (req, res) => {
    Order.getOrderById(req.params.id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: "Order not found" });
        res.json(results[0]);
    });
};

exports.createOrder = (req, res) => {
    Order.createOrder(req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId, ...req.body });
    });
};

exports.updateOrder = (req, res) => {
    Order.updateOrder(req.params.id, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Order updated successfully" });
    });
};

exports.deleteOrder = (req, res) => {
    Order.deleteOrder(req.params.id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Order deleted successfully" });
    });
};
