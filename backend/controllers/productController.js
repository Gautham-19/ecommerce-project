const Product = require("../models/productModel")

// Get All Products
const getAllProducts = (req, res) => {
  Product.getAllProducts((err, results) => {
    if (err) {
      console.error("Database Error:", err)
      return res.status(500).json({ error: "Database error." })
    }
    res.json(results)
  })
}

// Get Product by ID
const getProductById = (req, res) => {
  const productId = req.params.id
  Product.getProductById(productId, (err, result) => {
    if (err) {
      console.error("Database Error:", err)
      return res.status(500).json({ error: "Database error." })
    }
    if (!result || result.length === 0) {
      return res.status(404).json({ error: "Product not found." })
    }
    res.json(result[0])
  })
}

// Create Product
const createProduct = (req, res) => {
  const { Name, Price, Category_ID, Quantity } = req.body

  if (!Name || !Price || !Quantity) {
    return res.status(400).json({ error: "Name, Price, and Quantity are required." })
  }

  Product.createProduct(req.body, (err, result) => {
    if (err) {
      console.error("Database Error:", err)
      return res.status(500).json({ error: "Database error." })
    }
    res.status(201).json({ message: "Product added successfully", Product_ID: result.insertId })
  })
}

// Update Product
const updateProduct = (req, res) => {
  const productId = req.params.id
  Product.updateProduct(productId, req.body, (err) => {
    if (err) {
      console.error("Database Error:", err)
      return res.status(500).json({ error: "Database error." })
    }
    res.json({ message: "Product updated successfully" })
  })
}

// Delete Product
const deleteProduct = (req, res) => {
  const productId = req.params.id
  Product.deleteProduct(productId, (err) => {
    if (err) {
      console.error("Database Error:", err)
      return res.status(500).json({ error: "Database error." })
    }
    res.json({ message: "Product deleted successfully" })
  })
}

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct }

