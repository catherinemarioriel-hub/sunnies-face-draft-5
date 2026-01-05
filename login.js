function showRegister() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
}

function showLogin() {
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
}

function registerUser() {
    let name = document.getElementById("regName").value.trim();
    let email = document.getElementById("regEmail").value.trim();
    let pass = document.getElementById("regPassword").value;
    let confirm = document.getElementById("regConfirm").value;
    let error = document.getElementById("registerError");

    if (!name || !email || !pass || !confirm) {
        error.textContent = "All fields are required.";
        return;
    }

    if (pass !== confirm) {
        error.textContent = "Passwords do not match.";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find(u => u.email === email)) {
        error.textContent = "Email already registered.";
        return;
    }

    users.push({ name, email, pass });
    localStorage.setItem("users", JSON.stringify(users));

    error.style.color = "green";
    error.textContent = "Registration successful! Redirecting...";

    setTimeout(() => {
        showLogin();
    }, 1500);
}

function loginUser() {
    let email = document.getElementById("loginEmail").value.trim();
    let pass = document.getElementById("loginPassword").value;
    let error = document.getElementById("loginError");

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(u => u.email === email && u.pass === pass);

    if (!user) {
        error.textContent = "Wrong email or password.";
        return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));

    window.parent.location.href = "front-page.html";
}

function forgotPassword() {
    alert("Please contact customer support to reset your password.");
}

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

const logoutBtn = document.getElementById("logoutBtn");
const userGreeting = document.getElementById("userGreeting");

/* USER STATE UI */
if (loggedInUser) {
    userGreeting.textContent = "Hi, " + loggedInUser.name;
    logoutBtn.style.display = "inline-block";
} else {
    userGreeting.textContent = "";
    logoutBtn.style.display = "none";
}
 