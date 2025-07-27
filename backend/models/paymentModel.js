const db = require("../config/db");

// Get All Payments
const getAllPayments = (callback) => {
    db.query("SELECT * FROM Payment", callback);
};

// Get Payment By ID
const getPaymentById = (id, callback) => {
    db.query("SELECT * FROM Payment WHERE Payment_ID = ?", [id], callback);
};

// Create New Payment
const createPayment = (paymentData, callback) => {
    const { Order_ID, PayMethod, Amount, PayDate } = paymentData;
    db.query(
        "INSERT INTO Payment (Order_ID, PayMethod, Amount, PayDate) VALUES (?, ?, ?, ?)",
        [Order_ID, PayMethod, Amount, PayDate],
        callback
    );
};

// Update Payment
const updatePayment = (id, paymentData, callback) => {
    const { Order_ID, PayMethod, Amount, PayDate } = paymentData;
    db.query(
        "UPDATE Payment SET Order_ID=?, PayMethod=?, Amount=?, PayDate=? WHERE Payment_ID=?",
        [Order_ID, PayMethod, Amount, PayDate, id],
        callback
    );
};

// Delete Payment
const deletePayment = (id, callback) => {
    db.query("DELETE FROM Payment WHERE Payment_ID=?", [id], callback);
};

module.exports = { getAllPayments, getPaymentById, createPayment, updatePayment, deletePayment };
