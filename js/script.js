const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-links a");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

navItems.forEach((item) => {
    item.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

let cart = {};

function saveCart() {
    localStorage.setItem("mprCart", JSON.stringify(cart));
}

function addToCart(productName) {
    if (cart[productName]) {
        cart[productName]++;
    } else {
        cart[productName] = 1;
    }

    displayCart();
    saveCart();
    updateCartCount();

    document.querySelector(".cart-section").scrollIntoView({
        behavior: "smooth"
    });
}

function displayCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";

    for (let product in cart) {
        const li = document.createElement("li");

        li.innerHTML = `
            ${product} x ${cart[product]}
            <button onclick="increaseQty('${product}')">+</button>
            <button onclick="decreaseQty('${product}')">-</button>
        `;

        cartItems.appendChild(li);
    }
    updateCartCount();
}

function increaseQty(productName) {
    cart[productName]++;
    displayCart();
    saveCart();
    updateCartCount();
}

function decreaseQty(productName) {
    cart[productName]--;

    if (cart[productName] <= 0) {
        delete cart[productName];
    }

    displayCart();
    saveCart();
    updateCartCount();
}

function sendCartToWhatsApp() {
    if (Object.keys(cart).length === 0) {
        alert("Keranjang masih kosong.");
        return;
    }

    let message = "Halo MPR, saya ingin order:%0A%0A";

    let number = 1;

    for (let product in cart) {
        message += `${number}. ${product} x ${cart[product]}%0A`;
        number++;
    }

    message += "%0ANama:%0AAlamat:%0ACatatan:";

    window.open(`https://wa.me/6281362676828?text=${message}`, "_blank");
}

const savedCart = localStorage.getItem("mprCart");

if (savedCart) {
    cart = JSON.parse(savedCart);
    displayCart();
}
updateCartCount();

function clearCart() {
    cart = {};
    displayCart();
    saveCart();
    updateCartCount();
}

function updateCartCount() {
    let total = 0;

    for (let product in cart) {
        total += cart[product];
    }

    document.getElementById("cart-count").textContent = total;
}