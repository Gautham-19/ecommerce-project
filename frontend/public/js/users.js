document.addEventListener("DOMContentLoaded", () => {
    fetchUsers()
    document.getElementById("user-form").addEventListener("submit", addUser)
  })
  
  // Function to fetch users
  function fetchUsers() {
    fetch("http://localhost:5000/api/users")
      .then((response) => response.json())
      .then((data) => {
        displayUsers(data)
      })
      .catch((error) => {
        console.error("Error fetching users:", error)
        document.getElementById("users-list").innerHTML = "<tr><td colspan='6'>Error loading users</td></tr>"
      })
  }
  
  // Function to display users
  function displayUsers(users) {
    const usersList = document.getElementById("users-list")
    usersList.innerHTML = ""
  
    if (users.length === 0) {
      usersList.innerHTML = "<tr><td colspan='6'>No users found</td></tr>"
      return
    }
  
    users.forEach((user) => {
      const row = document.createElement("tr")
  
      row.innerHTML = `
              <td>${user.User_ID}</td>
              <td>${user.Name}</td>
              <td>${user.Address || "N/A"}</td>
              <td>${user.Phone_Number || "N/A"}</td>
              <td>${user.Email}</td>
              <td>
                  <button onclick="deleteUser(${user.User_ID})">Delete</button>
              </td>
          `
  
      usersList.appendChild(row)
    })
  }
  
  // Function to add a new user
  function addUser(event) {
    event.preventDefault()
  
    const name = document.getElementById("name").value
    const address = document.getElementById("address").value
    const phone = document.getElementById("phone").value
    const email = document.getElementById("email").value
  
    fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name: name,
        Address: address,
        Phone_Number: phone,
        Email: email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message || "User added successfully!")
        document.getElementById("user-form").reset()
        fetchUsers()
      })
      .catch((error) => console.error("Error adding user:", error))
  }
  
  // Function to delete a user
  function deleteUser(userId) {
    if (confirm("Are you sure you want to delete this user?")) {
      fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          alert(data.message || "User deleted successfully!")
          fetchUsers()
        })
        .catch((error) => console.error("Error deleting user:", error))
    }
  }
  
  