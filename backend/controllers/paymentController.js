const Payment = require("../models/paymentModel");

exports.getAllPayments = (req, res) => {
    Payment.getAllPayments((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.getPaymentById = (req, res) => {
    Payment.getPaymentById(req.params.id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: "Payment not found" });
        res.json(results[0]);
    });
};

exports.createPayment = (req, res) => {
    Payment.createPayment(req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId, ...req.body });
    });
};

exports.updatePayment = (req, res) => {
    Payment.updatePayment(req.params.id, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Payment updated successfully" });
    });
};

exports.deletePayment = (req, res) => {
    Payment.deletePayment(req.params.id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Payment deleted successfully" });
    });
};
