document.addEventListener('DOMContentLoaded', function() {
    const userId = 1; // Replace with actual logged-in user ID
    fetchCartForCheckout(userId);
    
    document.getElementById('place-order-btn').addEventListener('click', placeOrder);
});

function fetchCartForCheckout(userId) {
    fetch(`http://localhost:5000/api/carts/user/${userId}`)
        .then(response => response.json())
        .then(data => displayOrderSummary(data))
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('order-summary').innerHTML = '<p>Error loading cart items</p>';
        });
}

function displayOrderSummary(items) {
    const orderSummary = document.getElementById('order-summary');
    const totalAmount = document.getElementById('total-amount');
    let total = 0;

    if (!items.length) {
        orderSummary.innerHTML = '<p>No items in cart</p>';
        document.getElementById('place-order-btn').disabled = true;
        return;
    }

    const itemsList = document.createElement('div');
    items.forEach(item => {
        const price = parseFloat(item.Price);
        const itemTotal = price * item.Quantity;
        total += itemTotal;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'checkout-item';
        itemDiv.innerHTML = `
            <p>${item.Name} x ${item.Quantity}</p>
            <p>$${itemTotal.toFixed(2)}</p>
        `;
        itemsList.appendChild(itemDiv);
    });

    orderSummary.innerHTML = '';
    orderSummary.appendChild(itemsList);
    totalAmount.textContent = total.toFixed(2);
}

function placeOrder() {
    const userId = 1; // Replace with actual logged-in user ID
    const payMethod = document.getElementById('payment-method').value;
    const totalAmount = parseFloat(document.getElementById('total-amount').textContent);

    if (!payMethod) {
        alert('Please select a payment method');
        return;
    }

    // First get cart items
    fetch(`http://localhost:5000/api/carts/user/${userId}`)
        .then(response => response.json())
        .then(cartItems => {
            const items = cartItems.map(item => ({
                Product_ID: item.Product_ID,
                Quantity: item.Quantity,
                Price: parseFloat(item.Price)
            }));

            // Then create the order with cart items
            return fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    User_ID: userId,
                    PayMethod: payMethod,
                    Total_Amount: totalAmount,
                    items: items
                })
            });
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                throw new Error(data.error);
            }
            alert('Order placed successfully!');
            window.location.href = 'orders.html';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to place order. Please try again.');
        });
}

