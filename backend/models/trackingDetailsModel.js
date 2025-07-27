const db = require("../config/db");

// Get All Tracking Details
const getAllTrackingDetails = (callback) => {
    db.query("SELECT * FROM Tracking_Details", callback);
};

// Get Tracking Details By ID
const getTrackingDetailsById = (id, callback) => {
    db.query("SELECT * FROM Tracking_Details WHERE Tracking_ID = ?", [id], callback);
};

// Create New Tracking Details Entry
const createTrackingDetails = (trackingData, callback) => {
    const { Order_ID, Status, Estimated_Date } = trackingData;
    db.query(
        "INSERT INTO Tracking_Details (Order_ID, Status, Estimated_Date) VALUES (?, ?, ?)",
        [Order_ID, Status, Estimated_Date],
        callback
    );
};

// Update Tracking Details
const updateTrackingDetails = (id, trackingData, callback) => {
    const { Order_ID, Status, Estimated_Date } = trackingData;
    db.query(
        "UPDATE Tracking_Details SET Order_ID=?, Status=?, Estimated_Date=? WHERE Tracking_ID=?",
        [Order_ID, Status, Estimated_Date, id],
        callback
    );
};

// Delete Tracking Details Entry
const deleteTrackingDetails = (id, callback) => {
    db.query("DELETE FROM Tracking_Details WHERE Tracking_ID=?", [id], callback);
};

module.exports = { getAllTrackingDetails, getTrackingDetailsById, createTrackingDetails, updateTrackingDetails, deleteTrackingDetails };
