let selectedProduct = {};
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function openProduct(name, price, img) {
    selectedProduct = { name, price, img };
    document.getElementById("modalName").textContent = name;
    document.getElementById("modalPrice").textContent = "₱" + price;
    document.getElementById("modalImg").src = img;
    document.getElementById("qty").value = 1;
    document.getElementById("productModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("productModal").style.display = "none";
}

function changeQty(n) {
    const qty = document.getElementById("qty");
    qty.value = Math.max(1, parseInt(qty.value) + n);
}

function addToCart() {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
        alert("Please log in first before adding items to cart.");
        location.href = "login.html";
        return;
    }

    const qty = parseInt(document.getElementById("qty").value);

    const existing = cart.find(p => p.name === selectedProduct.name);
    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ ...selectedProduct, qty });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    closeModal();
}

function updateCartCount() {
    const count = cart.reduce((sum, i) => sum + i.qty, 0);
    const badge = document.getElementById("cartCount");
    if (badge) badge.textContent = count;
}

updateCartCount();
