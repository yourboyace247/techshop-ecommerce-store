// Initial cart UI update on page load
function initializeCartUI() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItems = document.getElementById("cart-items");
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p>Add some products to your cart</p>
                <a href="products.html" class="btn-primary">Continue Shopping</a>
            </div>
        `;
        updateOrderSummary(0, 0, 0, 0);
        return;
    }

    cartItems.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <div class="item-price">$${item.price.toFixed(2)}</div>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn plus" data-id="${item.id}">+</button>
            </div>
            <div class="item-total">$${(item.price * item.quantity).toFixed(2)}</div>
            <button class="remove-item" data-id="${item.id}">
                <i class="fas fa-trash"></i>
            </button>
        `;

        cartItems.appendChild(cartItem);
    });

    updateOrderSummaryFromCart(cart);
}

//Updating order summary from cart
function updateOrderSummaryFromCart(cart) {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.10;
    const total = subtotal + shipping + tax;

    updateOrderSummary(subtotal, shipping, tax, total);
}

//Updating order details in cart
function updateOrderSummary(subtotal, shipping, tax, total) {
    const subtotalElement = document.querySelector(".subtotal");
    const shippingElement = document.querySelector(".shipping");
    const taxElement = document.querySelector(".tax");
    const totalElement = document.querySelector(".total-price");

    if (subtotalElement) subtotalElement.textContent = `€${subtotal.toFixed(2)}`;
    if (shippingElement) shippingElement.textContent = `€${shipping.toFixed(2)}`;
    if (taxElement) taxElement.textContent = `€${tax.toFixed(2)}`;
    if (totalElement) totalElement.textContent = `€${total.toFixed(2)}`;
}

function addCartEventListeners() {
    const cartItems = document.getElementById("cart-items");
    
    cartItems.addEventListener("click", function(event) {
        const target = event.target;
        const button = target.closest(".quantity-btn") || target.closest(".remove-item");
        
        if (!button) return;
        
        const productId = Number(button.getAttribute("data-id"));
        
        if (button.classList.contains("plus")) {
            updateCartQuantity(productId, 1);
        } else if (button.classList.contains("minus")) {
            updateCartQuantity(productId, -1);
        } else if (button.classList.contains("remove-item")) {
            removeFromCart(productId);
        }
    });
}

//Updating cart quantity
function updateCartQuantity(productId, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItem = cart.find(item => item.id === Number(productId));
    
    if (cartItem) {
        cartItem.quantity += change;

        if (cartItem.quantity <= 0) {
            cart = cart.filter(item => item.id !== Number(productId));
        }
        
        localStorage.setItem("cart", JSON.stringify(cart));
        initializeCartUI();
        updateCartCount();
    }
}

//Removing item from cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== Number(productId));
    
    localStorage.setItem("cart", JSON.stringify(cart));
    initializeCartUI();
    updateCartCount();
}

//Updating cart in header
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCount = document.querySelector('.cart-count');
    
    if (cartCount) {
        cartCount.textContent = totalQuantity;
    }
}

//User cannot proceed to checkout with empty cart
function proceedToCheckout() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Your cart is empty. Please add items to proceed to checkout.");
        return;
    }
    window.location.href = "shipping.html";
}

//Event listener for initializeCartUI
document.addEventListener("DOMContentLoaded", function() {
    addCartEventListeners();
    initializeCartUI();
});