const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// Get all carts
router.get("/", cartController.getAllCarts);

// Get cart by cart ID
router.get("/:cartId", cartController.getCartById);

// Get cart items for a specific user
router.get("/user/:userId", cartController.getUserCart);

// Add an item to the cart
router.post("/add", cartController.addToCart);

// Remove an item from the cart
router.delete("/item/:cartItemId", cartController.removeFromCart);

module.exports = router;
