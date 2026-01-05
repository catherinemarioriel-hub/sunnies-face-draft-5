const checkoutItems = JSON.parse(localStorage.getItem("checkoutItems")) || [];
const address = localStorage.getItem("deliveryAddress");

if (checkoutItems.length === 0) {
    alert("No items selected for checkout.");
    location.href = "cart.html";
}

document.getElementById("addr").textContent = address || "No address provided";

let subtotal = 0;
const itemsDiv = document.getElementById("items");

checkoutItems.forEach(item => {
    const itemTotal = item.price * item.qty;
    subtotal += itemTotal;

    itemsDiv.innerHTML += `
        <p>${item.name} × ${item.qty} — ₱${itemTotal}</p>
    `;
});

document.getElementById("sub").textContent = subtotal;
document.getElementById("total").textContent = subtotal;

function placeOrder() {
    if (!address) {
        alert("Please enter a delivery address.");
        return;
    }

    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    orders.push({
        date: new Date().toLocaleString(),
        address: address,
        items: checkoutItems,
        total: subtotal
    });

    localStorage.setItem("orders", JSON.stringify(orders));

    // Remove ONLY checked items from cart
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => !item.checked);
    localStorage.setItem("cart", JSON.stringify(cart));

    localStorage.removeItem("checkoutItems");

    location.href = "receipt.html";
}
