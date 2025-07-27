-- -- Create database
-- CREATE DATABASE IF NOT EXISTS ecommerce_db;
-- USE ecommerce_db;

-- -- User table
-- CREATE TABLE IF NOT EXISTS User (
--     User_ID INT AUTO_INCREMENT PRIMARY KEY,
--     Name VARCHAR(100) NOT NULL,
--     Address VARCHAR(255),
--     Phone_Number VARCHAR(20),
--     Email VARCHAR(100) UNIQUE NOT NULL
-- );

-- -- Product Category table
-- CREATE TABLE IF NOT EXISTS Product_Category (
--     Category_ID INT AUTO_INCREMENT PRIMARY KEY,
--     Category_Name VARCHAR(100) NOT NULL
-- );

-- -- Product table
-- CREATE TABLE IF NOT EXISTS Product (
--     Product_ID INT AUTO_INCREMENT PRIMARY KEY,
--     Name VARCHAR(100) NOT NULL,
--     Price DECIMAL(10, 2) NOT NULL,
--     Category_ID INT,
--     Quantity INT NOT NULL DEFAULT 0,
--     FOREIGN KEY (Category_ID) REFERENCES Product_Category(Category_ID) ON DELETE SET NULL
-- );

-- -- Cart table
-- CREATE TABLE IF NOT EXISTS Cart (
--     Cart_ID INT AUTO_INCREMENT PRIMARY KEY,
--     User_ID INT NOT NULL,
--     FOREIGN KEY (User_ID) REFERENCES User(User_ID) ON DELETE CASCADE
-- );

-- -- Cart Item table
-- CREATE TABLE IF NOT EXISTS Cart_Item (
--     CartItem_ID INT AUTO_INCREMENT PRIMARY KEY,
--     Cart_ID INT NOT NULL,
--     Product_ID INT NOT NULL,
--     Quantity INT NOT NULL DEFAULT 1,
--     FOREIGN KEY (Cart_ID) REFERENCES Cart(Cart_ID) ON DELETE CASCADE,
--     FOREIGN KEY (Product_ID) REFERENCES Product(Product_ID) ON DELETE CASCADE
-- );

-- -- Order table
-- CREATE TABLE IF NOT EXISTS `Order` (
--     Order_ID INT AUTO_INCREMENT PRIMARY KEY,
--     User_ID INT NOT NULL,
--     OrderDate DATETIME NOT NULL,
--     Total_Amount DECIMAL(10, 2) NOT NULL,
--     FOREIGN KEY (User_ID) REFERENCES User(User_ID) ON DELETE CASCADE
-- );

-- -- Order Item table
-- CREATE TABLE IF NOT EXISTS Order_Item (
--     OrderItem_ID INT AUTO_INCREMENT PRIMARY KEY,
--     Order_ID INT NOT NULL,
--     Product_ID INT NOT NULL,
--     Quantity INT NOT NULL,
--     Price DECIMAL(10, 2) NOT NULL,
--     FOREIGN KEY (Order_ID) REFERENCES `Order`(Order_ID) ON DELETE CASCADE,
--     FOREIGN KEY (Product_ID) REFERENCES Product(Product_ID) ON DELETE CASCADE
-- );

-- -- Payment table
-- CREATE TABLE IF NOT EXISTS Payment (
--     Payment_ID INT AUTO_INCREMENT PRIMARY KEY,
--     Order_ID INT NOT NULL,
--     PayMethod VARCHAR(50) NOT NULL,
--     Amount DECIMAL(10, 2) NOT NULL,
--     PayDate DATETIME NOT NULL,
--     FOREIGN KEY (Order_ID) REFERENCES `Order`(Order_ID) ON DELETE CASCADE
-- );

-- -- Tracking Details table
-- CREATE TABLE IF NOT EXISTS Tracking_Details (
--     Tracking_ID INT AUTO_INCREMENT PRIMARY KEY,
--     Order_ID INT NOT NULL,
--     Status VARCHAR(50) NOT NULL,
--     Estimated_Date DATE,
--     FOREIGN KEY (Order_ID) REFERENCES `Order`(Order_ID) ON DELETE CASCADE
-- );

-- -- Insert sample data
-- -- Categories
-- INSERT INTO Product_Category (Category_Name) VALUES 
-- ('Electronics'),
-- ('Clothing'),
-- ('Home & Kitchen'),
-- ('Books'),
-- ('Toys');


-- -- Products
-- INSERT INTO Product (Name, Price, Category_ID, Quantity) VALUES
-- ('Smartphone', 599.99, 1, 50),
-- ('Laptop', 999.99, 1, 30),
-- ('T-shirt', 19.99, 2, 100),

-- -- Create carts for users
-- INSERT INTO Cart (User_ID) VALUES (1), (2), (3);

-- -- Add items to carts
-- INSERT INTO Cart_Item (Cart_ID, Product_ID, Quantity) VALUES
-- (1, 1, 1),
-- (1, 3, 2),
-- (2, 2, 1),
-- (2, 5, 1),
-- (3, 7, 1),
-- (3, 9, 1);

