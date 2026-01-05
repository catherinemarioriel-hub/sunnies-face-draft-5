let cart = JSON.parse(localStorage.getItem("cart")) || [];
let address = localStorage.getItem("deliveryAddress") || "";

const cartItems = document.getElementById("cartItems");
const emptyCart = document.getElementById("emptyCart");
const totalSpan = document.getElementById("cartTotal");
const addressText = document.getElementById("addressText");

addressText.textContent = address || "No address set";

function renderCart() {
    cartItems.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        emptyCart.style.display = "block";
        cartItems.style.display = "none";
        totalSpan.textContent = "0";
        return;
    }

    emptyCart.style.display = "none";
    cartItems.style.display = "block";

    cart.forEach((item, i) => {
        // default checked if undefined
        if (item.checked === undefined) item.checked = true;

        if (item.checked) {
            total += item.price * item.qty;
        }

        cartItems.innerHTML += `
        <div class="cart-item">
            <input 
                type="checkbox" 
                ${item.checked ? "checked" : ""} 
                onchange="toggleItem(${i}, this.checked)"
            >

            <img src="${item.img}">
            <div>${item.name}</div>

            <div class="qty-box">
                <button onclick="updateQty(${i}, -1)">-</button>
                <input value="${item.qty}" onchange="setQty(${i}, this.value)">
                <button onclick="updateQty(${i}, 1)">+</button>
            </div>

            <div class="item-total">₱${item.price * item.qty}</div>
            <div class="remove" onclick="removeItem(${i})">Delete</div>
        </div>`;
    });

    totalSpan.textContent = total;
}

function toggleItem(index, isChecked) {
    cart[index].checked = isChecked;
    save(false);
}

function updateQty(i, change) {
    cart[i].qty = Math.max(1, cart[i].qty + change);
    save(false);
}

function setQty(i, val) {
    cart[i].qty = Math.max(1, parseInt(val) || 1);
    save(false);
}

function removeItem(i) {
    cart.splice(i, 1);
    save(true);
}

function save(reRender = true) {
    localStorage.setItem("cart", JSON.stringify(cart));
    if (reRender) renderCart();
    else updateTotalOnly();
}

function updateTotalOnly() {
    let total = 0;
    cart.forEach(item => {
        if (item.checked) {
            total += item.price * item.qty;
        }
    });
    totalSpan.textContent = total;
}

function editAddress() {
    let newAddr = prompt("Enter delivery address:", address);
    if (newAddr) {
        address = newAddr;
        localStorage.setItem("deliveryAddress", address);
        addressText.textContent = address;
    }
}

function checkout() {
    const selectedItems = cart.filter(item => item.checked);

    if (selectedItems.length === 0) {
        alert("Please select at least one item to check out.");
        return;
    }

    if (!address) {
        alert("Please enter delivery address.");
        return;
    }

    localStorage.setItem("checkoutItems", JSON.stringify(selectedItems));
    location.href = "checkout.html";
}

renderCart();
