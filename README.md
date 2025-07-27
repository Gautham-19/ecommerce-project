# 🛍️ E-commerce Website – Full-Stack Web Application

This project is a full-featured **E-commerce Website** that provides a seamless shopping experience with dynamic product listings, user interaction, order management, and backend-powered data storage.

It demonstrates practical implementation of full-stack web development using **Node.js, Express, MySQL**, and a static HTML/CSS/JavaScript frontend with full CRUD operations.

---

## ✨ Key Highlights

🛒 Dynamic product management with add/update/delete  
👥 Customer management with proper database linkage  
📦 Orders and checkout process integrated with backend  
📄 Fully structured MySQL schema with foreign key relationships  
🧾 Admin-ready design for managing users, products, and orders  
🖥️ Clean, intuitive UI using vanilla HTML, CSS, and JavaScript

---

## 🛠️ Tech Stack

| Layer     | Technology               |
|----------|---------------------------|
| Frontend | HTML, CSS, JavaScript     |
| Backend  | Node.js, Express.js       |
| Database | MySQL (XAMPP / Workbench) |
| Tools    | VS Code, Postman, MySQL Workbench

---

## 🗂️ Core Database Models

Here are the major database tables and their roles:

1. **Users**  
   Stores user information such as name, email, password, and access roles.

2. **Products**  
   Holds product details like name, price, category, image path, and description.

3. **Orders**  
   Logs customer purchases, associated products, quantities, and timestamps.

4. **Cart (Optional)**  
   Supports session-based or DB-based cart structure.

5. **Payments**  
   Tracks payment amounts, modes, dates, and order associations.

6. **Categories**  
   Classifies products for search/filtering and display purposes.

---

## 🚀 How to Run the Project

### ▶️ Backend (Node + Express)

```bash
cd backend
npm install
node server.js
