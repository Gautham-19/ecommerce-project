document.addEventListener("DOMContentLoaded", function () {
    const userId = 1; // Replace with actual logged-in user ID
    fetchCartItems(userId);

    document.getElementById("checkout-btn").addEventListener("click", function() {
        const totalPrice = parseFloat(document.getElementById("total-price").textContent);
        if (totalPrice <= 0) {
            alert("Your cart is empty!");
            return;
        }
        window.location.href = "checkout.html";
    });
});

// Function to fetch cart items for a specific user
function fetchCartItems(userId) {
    fetch(`http://localhost:5000/api/carts/user/${userId}`)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => displayCartItems(data))
        .catch(error => {
            console.error("Error fetching cart items:", error);
            document.getElementById("cart-items").innerHTML = `
                <tr>
                    <td colspan="5">Error loading cart items. Please try again later.</td>
                </tr>`;
        });
}

// Function to display cart items
function displayCartItems(cartItems) {
    const cartList = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    cartList.innerHTML = "";
    let totalPrice = 0;

    if (cartItems.length === 0) {
        cartList.innerHTML = `
            <tr>
                <td colspan="5">Your cart is empty. <a href="products.html">Continue shopping</a></td>
            </tr>`;
        totalPriceElement.textContent = "0.00";
        return;
    }

    cartItems.forEach(item => {
        const price = parseFloat(item.Price);
        const itemTotal = price * item.Quantity;
        totalPrice += itemTotal;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.Name}</td>
            <td>$${price.toFixed(2)}</td>
            <td>
                <input type="number" 
                       value="${item.Quantity}" 
                       min="1" 
                       max="99"
                       onchange="updateCartItem(${item.Cart_ID}, ${item.Product_ID}, this.value)">
            </td>
            <td>$${itemTotal.toFixed(2)}</td>
            <td>
                <button onclick="removeCartItem(${item.Cart_ID}, ${item.Product_ID})">Remove</button>
            </td>
        `;
        cartList.appendChild(row);
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);
}

// Function to add an item to the cart
function addToCart(productId) {
    const userId = 1; // Replace with actual logged-in user ID
    const quantity = 1;

    fetch("http://localhost:5000/api/carts/add", {  // Fixed API endpoint
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            User_ID: userId, 
            Product_ID: productId, 
            Quantity: quantity 
        })
    })
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(data => {
        alert(data.message || "Item added to cart successfully!");
        fetchCartItems(userId);
    })
    .catch(error => {
        console.error("Error adding item to cart:", error);
        alert("Failed to add item to cart. Please try again.");
    });
}

// Function to update cart item quantity
function updateCartItem(cartId, productId, quantity) {
    if (quantity < 1) {
        alert("Quantity must be at least 1");
        fetchCartItems(1); // Refresh cart with original values
        return;
    }

    fetch(`http://localhost:5000/api/cart-items/${cartId}/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Quantity: parseInt(quantity) })
    })
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(() => fetchCartItems(1)) // Refresh cart after update
    .catch(error => {
        console.error("Error updating cart item:", error);
        alert("Failed to update quantity. Please try again.");
        fetchCartItems(1); // Refresh cart with original values
    });
}

// Function to remove cart item
function removeCartItem(cartId, productId) {
    if (!confirm("Are you sure you want to remove this item from your cart?")) {
        return;
    }

    fetch(`http://localhost:5000/api/cart-items/${cartId}/${productId}`, {
        method: "DELETE"
    })
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(() => fetchCartItems(1)) // Refresh cart after deletion
    .catch(error => {
        console.error("Error removing cart item:", error);
        alert("Failed to remove item. Please try again.");
    });
}
