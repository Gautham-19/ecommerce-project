const TrackingDetails = require("../models/trackingDetailsModel");

exports.getAllTrackingDetails = (req, res) => {
    TrackingDetails.getAllTrackingDetails((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.getTrackingDetailsById = (req, res) => {
    TrackingDetails.getTrackingDetailsById(req.params.id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: "Tracking details not found" });
        res.json(results[0]);
    });
};

exports.createTrackingDetails = (req, res) => {
    TrackingDetails.createTrackingDetails(req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId, ...req.body });
    });
};

exports.updateTrackingDetails = (req, res) => {
    TrackingDetails.updateTrackingDetails(req.params.id, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Tracking details updated successfully" });
    });
};

exports.deleteTrackingDetails = (req, res) => {
    TrackingDetails.deleteTrackingDetails(req.params.id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Tracking details deleted successfully" });
    });
};
