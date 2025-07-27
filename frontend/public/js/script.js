document.addEventListener("DOMContentLoaded", () => {
    fetchFeaturedProducts()
})

function fetchFeaturedProducts() {
    fetch("http://localhost:5000/api/products")
        .then((response) => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then((data) => {
            // Get a random selection of up to 6 products to feature
            const shuffled = data.sort(() => 0.5 - Math.random());
            const featuredProducts = shuffled.slice(0, 6);
            displayFeaturedProducts(featuredProducts);
        })
        .catch((error) => {
            console.error("Error fetching featured products:", error);
            document.getElementById("featured-list").innerHTML = 
                `<p class="error-message">Error loading products. Please try again later.</p>`;
        });
}

function displayFeaturedProducts(products) {
    const featuredContainer = document.getElementById("featured-list");
    featuredContainer.innerHTML = "";

    if (!products || products.length === 0) {
        featuredContainer.innerHTML = "<p>No products available</p>";
        return;
    }

    products.forEach((product) => {
        const price = parseFloat(product.Price);
        const discountPrice = (price * 0.9).toFixed(2);
        
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <div class="product-info">
                <span class="product-brand">Eco Cycle</span>
                <h3 class="product-name">${product.Name}</h3>
                <div class="product-price">
                    <span class="current-price">$${discountPrice}</span>
                    <span class="original-price">$${price.toFixed(2)}</span>
                    <span class="discount">10% off</span>
                </div>
                <div class="product-rating">
                    <span class="rating-badge">4.2 <i class="fas fa-star"></i></span>
                    <span class="rating-count">(24)</span>
                </div>
                <div class="product-actions">
                    <button class="add-to-cart-btn" onclick="addToCart(${product.Product_ID})">Add to Cart</button>
                    <button class="wishlist-btn"><i class="far fa-heart"></i></button>
                </div>
            </div>
        `;

        featuredContainer.appendChild(productCard);
    });
}

function addToCart(productId) {
    const userId = 1; // Default user ID - in a real app, this would come from authentication
    const quantity = 1;

    fetch("http://localhost:5000/api/carts/add", {
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
    })
    .catch(error => {
        console.error("Error adding to cart:", error);
        alert("Failed to add item to cart. Please try again.");
    });
}

function fetchCartItems() {
    const userId = 1 // Replace with actual logged-in user ID
    fetch(`http://localhost:5000/cart/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        const cartItemsContainer = document.getElementById("cart-items")
        cartItemsContainer.innerHTML = ""
  
        data.forEach((item) => {
          cartItemsContainer.innerHTML += `
                  <tr>
                      <td>${item.Name}</td>
                      <td>$${item.Price}</td>
                      <td>${item.Quantity}</td>
                      <td><button onclick="removeFromCart(${item.CartItem_ID})">Remove</button></td>
                  </tr>
              `
        })
      })
      .catch((error) => console.error("Error:", error))
  }
  
  function removeFromCart(cartItemId) {
    fetch(`http://localhost:5000/cart/${cartItemId}`, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message)
        fetchCartItems()
      })
      .catch((error) => console.error("Error:", error))
  }
  
  window.onload = fetchCartItems

// Add dynamic search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-bar input');
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            const productName = card.querySelector('h3').textContent.toLowerCase();
            if (productName.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Update deal timers
    function updateTimers() {
        const timers = document.querySelectorAll('.deal-timer');
        timers.forEach(timer => {
            const timeStr = timer.textContent.split(': ')[1];
            const [hours, minutes, seconds] = timeStr.split(':').map(Number);
            
            let totalSeconds = hours * 3600 + minutes * 60 + seconds;
            totalSeconds--;

            if (totalSeconds <= 0) {
                timer.parentElement.style.opacity = '0.5';
                timer.textContent = 'Deal Ended';
                return;
            }

            const newHours = Math.floor(totalSeconds / 3600);
            const newMinutes = Math.floor((totalSeconds % 3600) / 60);
            const newSeconds = totalSeconds % 60;

            timer.textContent = `Ends in: ${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}:${String(newSeconds).padStart(2, '0')}`;
        });
    }

    setInterval(updateTimers, 1000);
});

