//Function for order summary display
function shippingSummary() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.10;
    const total = subtotal + shipping + tax;

    const subtotalElement = document.querySelector(".subtotal");
    const shippingElement = document.querySelector(".shipping");
    const taxElement = document.querySelector(".tax");
    const totalElement = document.querySelector(".total-price");

    if (subtotalElement) subtotalElement.textContent = `€${subtotal.toFixed(2)}`;
    if (shippingElement) shippingElement.textContent = `€${shipping.toFixed(2)}`;
    if (taxElement) taxElement.textContent = `€${tax.toFixed(2)}`;
    if (totalElement) totalElement.textContent = `€${total.toFixed(2)}`;
}

    document.addEventListener("DOMContentLoaded", shippingSummary);

//Function and event listeners proceed with your order
document.addEventListener("DOMContentLoaded", function () {

    const placeOrderBtn = document.getElementById("place-order-btn");
    placeOrderBtn.addEventListener("click", function (event) {
        event.preventDefault();
    const requiredFields  = [
        "card-number",
        "expiry-date",
        "cvv",
        "card-name"
    ];

      for (let id of requiredFields) {
        const input = document.getElementById(id);

        if (!input || !input.value.trim()) {
            alert("Please fill out all required fields before continuing.");
            if (input) input.focus();
            return;
        }
    }

    window.location.href = "thank-you.html";
    });
});