document.addEventListener("DOMContentLoaded", () => {
    fetchProducts()
    fetchCategories()
    document.getElementById("product-form").addEventListener("submit", addProduct)
  })
  
  // Function to fetch products
  function fetchProducts() {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => {
        displayProducts(data)
      })
      .catch((error) => console.error("Error fetching products:", error))
  }
  
  // Function to fetch categories for the dropdown
  function fetchCategories() {
    fetch("http://localhost:5000/api/categories")
      .then((response) => response.json())
      .then((data) => {
        const categorySelect = document.getElementById("product-category")
        categorySelect.innerHTML = '<option value="">Select Category</option>'
  
        data.forEach((category) => {
          const option = document.createElement("option")
          option.value = category.Category_ID
          option.textContent = category.Category_Name
          categorySelect.appendChild(option)
        })
      })
      .catch((error) => console.error("Error fetching categories:", error))
  }
  
  // Function to display products
  function displayProducts(products) {
    const productsList = document.getElementById("products-list")
    productsList.innerHTML = ""
  
    products.forEach((product) => {
      const row = document.createElement("tr")
  
      row.innerHTML = `
              <td>${product.Product_ID}</td>
              <td>${product.Name}</td>
              <td>$${product.Price}</td>
              <td>${product.Category_ID || "N/A"}</td>
              <td>${product.Quantity}</td>
              <td>
                  <button class="add-to-cart" onclick="addToCart(${product.Product_ID})">Add to Cart</button>
                  <button onclick="deleteProduct(${product.Product_ID})">Delete</button>
              </td>
          `
  
      productsList.appendChild(row)
    })
  }
  
  // Function to add a new product
  function addProduct(event) {
    event.preventDefault()
  
    const name = document.getElementById("product-name").value
    const price = document.getElementById("product-price").value
    const categoryId = document.getElementById("product-category").value
    const quantity = document.getElementById("product-quantity").value
  
    fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name: name,
        Price: Number.parseFloat(price),
        Category_ID: categoryId ? Number.parseInt(categoryId) : null,
        Quantity: Number.parseInt(quantity),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message || "Product added successfully!")
        document.getElementById("product-form").reset()
        fetchProducts()
      })
      .catch((error) => console.error("Error adding product:", error))
  }
  
  // Function to add to cart
  function addToCart(productId) {
    const userId = 1 // Default user ID - in a real app, this would come from authentication
    const quantity = 1 // Default quantity
  
    fetch("http://localhost:5000/api/carts/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        User_ID: userId,
        Product_ID: productId,
        Quantity: quantity,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message || "Item added to cart successfully!")
      })
      .catch((error) => console.error("Error adding item to cart:", error))
  }
  
  // Function to delete a product
  function deleteProduct(productId) {
    if (confirm("Are you sure you want to delete this product?")) {
      fetch(`http://localhost:5000/api/products/${productId}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          alert(data.message || "Product deleted successfully!")
          fetchProducts()
        })
        .catch((error) => console.error("Error deleting product:", error))
    }
  }
  
  