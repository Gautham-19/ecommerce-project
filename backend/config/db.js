const mysql = require("mysql2")
require("dotenv").config()

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "Mysql.gst@19",
  database: process.env.DB_NAME || "ecommerce_db",
  multipleStatements: true
})

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err)
    return
  }
  console.log("✅ Connected to MySQL Database")
})

module.exports = db

