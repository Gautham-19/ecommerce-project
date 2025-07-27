const express = require("express")
const router = express.Router()
const orderController = require("../controllers/orderController")
const db = require("../config/db")

// Get all orders
router.get("/", orderController.getAllOrders)

// Get order by ID
router.get("/:id", orderController.getOrderById)

// Get orders for a specific user
router.get("/user/:userId", (req, res) => {
  const userId = req.params.userId

  db.query(
    `SELECT o.*, td.Status, td.Estimated_Date,
        CAST(o.Total_Amount AS DECIMAL(10,2)) AS Total_Amount
     FROM \`Order\` o
     LEFT JOIN Tracking_Details td ON o.Order_ID = td.Order_ID
     WHERE o.User_ID = ?
     ORDER BY o.OrderDate DESC`,
    [userId],
    (err, results) => {
      if (err) {
        console.error("Error fetching user orders:", err)
        return res.status(500).json({ error: err.message })
      }
      res.json(results)
    },
  )
})

// Create new order
router.post("/", (req, res) => {
  const { User_ID, Total_Amount, PayMethod, items } = req.body

  if (!User_ID || !Total_Amount || !items || !items.length) {
    return res.status(400).json({ error: "User_ID, Total_Amount, and items are required" })
  }

  // Start a transaction
  db.beginTransaction((err) => {
    if (err) return res.status(500).json({ error: err.message })

    // Create order
    const orderDate = new Date().toISOString().slice(0, 19).replace("T", " ")
    db.query(
      "INSERT INTO `Order` (User_ID, OrderDate, Total_Amount) VALUES (?, ?, ?)",
      [User_ID, orderDate, Total_Amount],
      (err, orderResult) => {
        if (err) {
          return db.rollback(() => {
            res.status(500).json({ error: err.message })
          })
        }

        const Order_ID = orderResult.insertId

        // Insert order items
        const orderItemValues = items.map((item) => [Order_ID, item.Product_ID, item.Quantity, item.Price])

        db.query(
          "INSERT INTO Order_Item (Order_ID, Product_ID, Quantity, Price) VALUES ?",
          [orderItemValues],
          (err) => {
            if (err) {
              return db.rollback(() => {
                res.status(500).json({ error: err.message })
              })
            }

            // Create payment record
            db.query(
              "INSERT INTO Payment (Order_ID, PayMethod, Amount, PayDate) VALUES (?, ?, ?, ?)",
              [Order_ID, PayMethod, Total_Amount, orderDate],
              (err) => {
                if (err) {
                  return db.rollback(() => {
                    res.status(500).json({ error: err.message })
                  })
                }

                // Create tracking details
                const estimatedDate = new Date()
                estimatedDate.setDate(estimatedDate.getDate() + 7) // Delivery in 7 days

                db.query(
                  "INSERT INTO Tracking_Details (Order_ID, Status, Estimated_Date) VALUES (?, ?, ?)",
                  [Order_ID, "Processing", estimatedDate],
                  (err) => {
                    if (err) {
                      return db.rollback(() => {
                        res.status(500).json({ error: err.message })
                      })
                    }

                    // Clear cart items
                    db.query(
                      "DELETE ci FROM Cart_Item ci JOIN Cart c ON ci.Cart_ID = c.Cart_ID WHERE c.User_ID = ?",
                      [User_ID],
                      (err) => {
                        if (err) {
                          return db.rollback(() => {
                            res.status(500).json({ error: err.message })
                          })
                        }

                        // Commit transaction
                        db.commit((err) => {
                          if (err) {
                            return db.rollback(() => {
                              res.status(500).json({ error: err.message })
                            })
                          }

                          res.status(201).json({
                            message: "Order created successfully",
                            Order_ID: Order_ID,
                          })
                        })
                      },
                    )
                  },
                )
              },
            )
          },
        )
      },
    )
  })
})

// Add new route for order confirmation
router.put("/:id/confirm", (req, res) => {
    const orderId = req.params.id;
    
    db.query(
        "UPDATE Tracking_Details SET Status = 'Confirmed' WHERE Order_ID = ?",
        [orderId],
        (err, result) => {
            if (err) {
                console.error("Error confirming order:", err);
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: "Order confirmed successfully" });
        }
    );
});

// Delete/Cancel Order
router.delete("/:id", (req, res) => {
    const orderId = req.params.id;
    const queries = [
        `DELETE FROM Tracking_Details WHERE Order_ID = ${orderId};`,
        `DELETE FROM Payment WHERE Order_ID = ${orderId};`,
        `DELETE FROM Order_Item WHERE Order_ID = ${orderId};`,
        `DELETE FROM \`Order\` WHERE Order_ID = ${orderId};`
    ].join('');

    db.query(queries, (err, results) => {
        if (err) {
            console.error("Error cancelling order:", err);
            return res.status(500).json({ error: "Failed to cancel order" });
        }
        res.json({ message: "Order cancelled successfully" });
    });
});

// Update order
router.put("/:id", orderController.updateOrder)

// Delete order
router.delete("/:id", orderController.deleteOrder)

module.exports = router

