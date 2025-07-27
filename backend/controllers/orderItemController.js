const OrderItem = require("../models/orderItemModel");

exports.getAllOrderItems = (req, res) => {
    OrderItem.getAllOrderItems((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.getOrderItemById = (req, res) => {
    OrderItem.getOrderItemById(req.params.id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: "Order Item not found" });
        res.json(results[0]);
    });
};

exports.createOrderItem = (req, res) => {
    OrderItem.createOrderItem(req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId, ...req.body });
    });
};

exports.updateOrderItem = (req, res) => {
    OrderItem.updateOrderItem(req.params.id, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Order Item updated successfully" });
    });
};

exports.deleteOrderItem = (req, res) => {
    OrderItem.deleteOrderItem(req.params.id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Order Item deleted successfully" });
    });
};
