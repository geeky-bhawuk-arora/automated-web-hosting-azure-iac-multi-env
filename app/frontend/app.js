let restaurants = [];
const cart = {};

async function fetchRestaurants() {
  try {
    const response = await fetch('http://localhost:3000/restaurants');
    restaurants = await response.json();
    filterRestaurants();
  } catch (err) {
    console.error('Error fetching restaurants:', err);
  }
}

function renderRestaurants(list) {
  const container = document.getElementById("restaurantList");
  container.innerHTML = "";

  list.forEach((r) => {
    const card = document.createElement("div");
    card.className = "restaurant-card";

    card.innerHTML = `
      <img src="${r.image}" alt="${r.name}" class="restaurant-image" />
      <div class="restaurant-info">
        <h3 class="restaurant-name">${r.name}</h3>
        <div class="restaurant-cuisine">${capitalize(r.cuisine)}</div>
        <div class="restaurant-rating">⭐ ${r.rating}</div>
        <button class="add-to-cart-btn" data-id="${r.id}">Add to Cart</button>
      </div>
    `;

    container.appendChild(card);
  });

  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      addToCart(parseInt(id));
    });
  });
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function addToCart(id) {
  if (cart[id]) {
    cart[id].quantity += 1;
  } else {
    const item = restaurants.find((r) => r.id === id);
    cart[id] = { ...item, quantity: 1 };
  }
  renderCart();
}

function removeFromCart(id) {
  if (cart[id]) {
    cart[id].quantity -= 1;
    if (cart[id].quantity <= 0) {
      delete cart[id];
    }
  }
  renderCart();
}

function renderCart() {
  const cartItemsDiv = document.getElementById("cartItems");
  cartItemsDiv.innerHTML = "";

  const items = Object.values(cart);
  if (items.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
    document.getElementById("checkoutBtn").disabled = true;
    document.getElementById("cartTotal").innerText = "0";
    return;
  }

  items.forEach((item) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span>${item.name} x${item.quantity}</span>
      <span>
        <button onclick="removeFromCart(${item.id})" style="margin-right: 6px;">-</button>
        <button onclick="addToCart(${item.id})">+</button>
      </span>
    `;
    cartItemsDiv.appendChild(div);
  });

  const total = items.reduce((sum, item) => sum + item.quantity * 100, 0);
  document.getElementById("cartTotal").innerText = total.toFixed(2);
  document.getElementById("checkoutBtn").disabled = false;
}

const categories = document.querySelectorAll(".category");
categories.forEach((btn) => {
  btn.addEventListener("click", () => {
    categories.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    filterRestaurants();
  });
});

document.getElementById("searchInput").addEventListener("input", filterRestaurants);

function filterRestaurants() {
  const selectedCategory = document.querySelector(".category.active").dataset.category;
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();

  let filtered = restaurants;

  if (selectedCategory !== "all") {
    filtered = filtered.filter((r) => r.cuisine === selectedCategory);
  }

  if (searchTerm) {
    filtered = filtered.filter(
      (r) => r.name.toLowerCase().includes(searchTerm)
    );
  }

  renderRestaurants(filtered);
}

document.getElementById("checkoutBtn").addEventListener("click", () => {
  alert("Thank you for your order! Your total is ₹" + document.getElementById("cartTotal").innerText);
  Object.keys(cart).forEach(key => delete cart[key]);
  renderCart();
});

// Initial fetch and render
fetchRestaurants();
