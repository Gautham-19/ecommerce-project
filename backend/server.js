
require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db'); // Import database connection

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());

// Test Route
app.get('/', (req, res) => {
    res.send('E-commerce API is running...');
});

// Import Routes

const userRoutes = require('./routes/userRoutes');
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");
const cartItemRoutes = require("./routes/cartItemRoutes");
const orderItemRoutes = require("./routes/orderItemRoutes");
const trackingDetailsRoutes = require("./routes/trackingDetailsRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
app.use("/api/categories", categoryRoutes);

app.use("/api/payments", paymentRoutes);

app.use("/api/tracking-details", trackingDetailsRoutes);

app.use("/api/order-items", orderItemRoutes);

app.use("/api/cart-items", cartItemRoutes);

app.use("/api/carts", cartRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/products", productRoutes);

app.use('/api/users', userRoutes);


app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
