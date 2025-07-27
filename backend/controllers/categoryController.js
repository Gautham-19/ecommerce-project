const Category = require("../models/categoryModel");

exports.getAllCategories = (req, res) => {
    Category.getAllCategories((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.getCategoryById = (req, res) => {
    Category.getCategoryById(req.params.id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: "Category not found" });
        res.json(results[0]);
    });
};

exports.createCategory = (req, res) => {
    Category.createCategory(req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId, ...req.body });
    });
};

exports.updateCategory = (req, res) => {
    Category.updateCategory(req.params.id, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Category updated successfully" });
    });
};

exports.deleteCategory = (req, res) => {
    Category.deleteCategory(req.params.id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Category deleted successfully" });
    });
};
