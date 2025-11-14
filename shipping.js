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

//User cannot proceed to payment without filling all required fields
document.addEventListener("DOMContentLoaded", function () {

    const continueBtn = document.getElementById("continue-btn");
    continueBtn.addEventListener("click", function (event) {
        event.preventDefault();
    const requiredFields  = [
        "first-name",
        "last-name",
        "email",
        "phone",
        "address",
        "city",
        "zip",
        "country"
    ];

      for (let id of requiredFields) {
        const input = document.getElementById(id);

        if (!input || !input.value.trim()) {
            alert("Please fill out all required fields before continuing.");
            if (input) input.focus();
            return;
        }
    }

    const email = document.getElementById("email").value;
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    window.location.href = "payment.html";
    });
});
