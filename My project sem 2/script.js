let cart = [];

const cartCount = document.getElementById("cart-count");
const cartHeaderCount = document.getElementById("cart-header-count");
const cartItemsContainer = document.getElementById("cart-items");
const totalItems = document.getElementById("total-items");
const totalPrice = document.getElementById("total-price");
const addCartButtons = document.querySelectorAll(".add-cart-btn");
const contactForm = document.getElementById("contact-form");

function formatPrice(price) {
    return "₹" + price.toLocaleString("en-IN");
}

function addToCart(productName, productPrice) {
    const product = {
        id: Date.now() + Math.random(),
        name: productName,
        price: productPrice
    };

    cart.push(product);
    updateCart();

    alert(productName + " added to cart!");
}

function removeFromCart(productId) {
    cart = cart.filter(function(product) {
        return product.id !== productId;
    });

    updateCart();
}

function updateCart() {
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML =
            '<p class="empty-cart">Your cart is empty. Add products to see them here.</p>';
    } else {
        cart.forEach(function(product) {
            const cartItem = document.createElement("div");
            cartItem.className = "cart-item";

            cartItem.innerHTML = `
                <div>
                    <h4>${product.name}</h4>
                    <p>${formatPrice(product.price)}</p>
                </div>

                <button class="remove-btn" onclick="removeFromCart(${product.id})">
                    Remove
                </button>
            `;

            cartItemsContainer.appendChild(cartItem);
        });
    }

    const totalCartPrice = cart.reduce(function(sum, product) {
        return sum + product.price;
    }, 0);

    cartCount.textContent = cart.length;
    cartHeaderCount.textContent = cart.length;
    totalItems.textContent = cart.length;
    totalPrice.textContent = formatPrice(totalCartPrice);
}

addCartButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const productName = button.dataset.name;
        const productPrice = Number(button.dataset.price);

        addToCart(productName, productPrice);
    });
});

contactForm.addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Thank you! Your message has been sent.");
    contactForm.reset();
});

updateCart();