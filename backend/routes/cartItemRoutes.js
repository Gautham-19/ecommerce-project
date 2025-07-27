const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Get all cart items
router.get("/", (req, res) => {
    db.query(
        `SELECT Cart_Item.CartItem_ID, Product.Name AS Product_Name, Product.Price, Cart_Item.Quantity 
         FROM Cart_Item 
         JOIN Product ON Cart_Item.Product_ID = Product.Product_ID`,
        (err, results) => {
            if (err) {
                console.error("Error fetching cart items:", err);
                return res.status(500).json({ error: err.message });
            }
            res.json(results);
        }
    );
});

// Add item to cart
router.post("/", (req, res) => {
    const { Product_ID, Quantity, Cart_ID } = req.body;

    if (!Product_ID || !Quantity || !Cart_ID) {
        return res.status(400).json({ error: "All fields (Product_ID, Quantity, Cart_ID) are required." });
    }

    const query = `INSERT INTO Cart_Item (Product_ID, Quantity, Cart_ID) VALUES (?, ?, ?)`;

    db.query(query, [Product_ID, Quantity, Cart_ID], (err, results) => {
        if (err) {
            console.error("Error adding item to cart:", err);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "Item added to cart successfully!", CartItem_ID: results.insertId });
    });
});

// Update cart item quantity
// Update cart item quantity (Cart_ID + Product_ID)
router.put("/:cartId/:productId", (req, res) => {
    const { Quantity } = req.body;
    const { cartId, productId } = req.params;

    db.query(
        "UPDATE Cart_Item SET Quantity=? WHERE Cart_ID=? AND Product_ID=?",
        [Quantity, cartId, productId],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Cart item updated" });
        }
    );
});


// Remove item from cart
// Remove item from cart (Cart_ID + Product_ID)
router.delete("/:cartId/:productId", (req, res) => {
    const { cartId, productId } = req.params;

    db.query(
        "DELETE FROM Cart_Item WHERE Cart_ID=? AND Product_ID=?",
        [cartId, productId],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Cart item removed" });
        }
    );
});


module.exports = router;
