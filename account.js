let user = JSON.parse(localStorage.getItem("loggedInUser"));
document.getElementById("name").textContent = user.name;
document.getElementById("email").textContent = user.email;
document.getElementById("address").textContent =
    localStorage.getItem("deliveryAddress") || "No address set";

function logout() {
    localStorage.removeItem("loggedInUser");
    location.href = "front-page.html";
}
