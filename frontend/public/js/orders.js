document.addEventListener('DOMContentLoaded', function() {
    const userId = 1; // Replace with actual logged-in user ID
    fetchOrders(userId);
});

function fetchOrders(userId) {
    fetch(`http://localhost:5000/api/orders/user/${userId}`)
        .then(response => response.json())
        .then(orders => displayOrders(orders))
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('orders-list').innerHTML = '<p>Error loading orders</p>';
        });
}

function cancelOrder(orderId) {
    if (!confirm("Are you sure you want to cancel this order?")) {
        return;
    }

    fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to cancel order');
        }
        return response.json();
    })
    .then(() => {
        alert('Order cancelled successfully');
        location.reload(); // Refresh the page to update the orders list
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to cancel order. Please try again.');
    });
}

function displayOrders(orders) {
    const ordersList = document.getElementById('orders-list');
    ordersList.innerHTML = '';

    if (!orders || !orders.length) {
        ordersList.innerHTML = '<p>No orders found</p>';
        return;
    }

    orders.forEach(order => {
        const orderCard = document.createElement('div');
        orderCard.className = 'order-card';
        
        orderCard.innerHTML = `
            <h3>Order #${order.Order_ID}</h3>
            <p><strong>Date:</strong> ${new Date(order.OrderDate).toLocaleDateString()}</p>
            <p><strong>Total:</strong> $${parseFloat(order.Total_Amount).toFixed(2)}</p>
            <p><strong>Status:</strong> ${order.Status || 'Processing'}</p>
            <div class="order-actions">
                <button onclick="cancelOrder(${order.Order_ID})" class="cancel-btn">
                    <i class="fas fa-times"></i> Cancel Order
                </button>
            </div>
        `;
        
        ordersList.appendChild(orderCard);
    });
}

function confirmOrder(orderId) {
    if (!confirm('Are you sure you want to confirm this order?')) {
        return;
    }

    fetch(`http://localhost:5000/api/orders/${orderId}/confirm`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(data => {
        alert('Order confirmed successfully!');
        window.location.href = 'index.html';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to confirm order. Please try again.');
    });
}

