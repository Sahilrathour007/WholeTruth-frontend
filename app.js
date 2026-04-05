// ─────────────────────────────────────────────────────────────
//  THE WHOLE TRUTH — APP LOGIC v3
//  Cart · Modal · Checkout · Order Submission
//
//  CHANGES FROM v2:
//  [1] EmailJS completely removed — was crashing page on load
//      because emailjs.init() called with no SDK loaded.
//  [2] handleReorderLink() duplicate removed — was defined twice,
//      second definition overwrote first and ran on every page
//      load, breaking normal shopping flow.
//  [3] /track-click called via Render backend (no CORS issues).
// ─────────────────────────────────────────────────────────────

// ── CONFIG ───────────────────────────────────────────────────
const API_BASE        = "https://wholetruth.onrender.com";
const ORDER_DEDUP_KEY = "twt_placed_orders";

// ── STATE ─────────────────────────────────────────────────────
let cart = JSON.parse(localStorage.getItem("twt_cart") || "[]");

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCartUI();
  handleReorderLink();
});


// ══════════════════════════════════════════════════════════════
// REORDER PRE-FILL SYSTEM
// Triggered only when utm_source=email is in the URL.
// Reads all customer data from URL params, autofills form,
// pings Render /track-click silently in background.
// ══════════════════════════════════════════════════════════════
function handleReorderLink() {
  const params = new URLSearchParams(window.location.search);

  // Exit immediately if this is not a reorder link
  if (params.get("utm_source") !== "email") return;

  const name    = params.get("name")    || "";
  const email   = params.get("email")   || "";
  const phone   = params.get("phone")   || "";
  const city    = params.get("city")    || "";
  const address = params.get("address") || "";
  const product = params.get("product") || "";

  // ── Ping click tracker via Render (no CORS, no GAS redirect) ──
  if (phone || email) {
    fetch(`${API_BASE}/track-click`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ phone, email, product, name }),
    }).catch(() => {});
  }

  // ── Add product to cart ──────────────────────────────────
  if (product) {
    const match = PRODUCTS.find(p =>
      p.name.toLowerCase().includes(product.toLowerCase()) ||
      product.toLowerCase().includes(p.name.toLowerCase())
    );
    if (match) {
      cart = [{ ...match, qty: 1 }];
      saveCart();
      updateCartUI();
    }
  }

  // ── Open checkout directly ───────────────────────────────
  document.getElementById("checkoutSection").style.display = "block";
  renderCheckoutSummary();

  // ── Pre-fill form fields ─────────────────────────────────
  document.getElementById("custName").value    = name;
  document.getElementById("custEmail").value   = email;
  document.getElementById("custPhone").value   = phone;
  document.getElementById("custCity").value    = city;
  document.getElementById("custAddress").value = address;

  // ── Store UTM for order submission ───────────────────────
  window._utmSource   = params.get("utm_source")   || "organic";
  window._utmMedium   = params.get("utm_medium")   || "";
  window._utmCampaign = params.get("utm_campaign") || "reorder_reminder";

  // ── Welcome-back banner ──────────────────────────────────
  if (name) {
    const existing = document.getElementById("reorderBanner");
    if (existing) existing.remove();
    const banner = document.createElement("div");
    banner.id = "reorderBanner";
    banner.style.cssText = [
      "background:#1D9E75",
      "color:white",
      "padding:14px 20px",
      "text-align:center",
      "font-size:15px",
      "font-weight:500",
      "position:sticky",
      "top:60px",
      "z-index:999",
    ].join(";");
    banner.textContent =
      "Welcome back " + name.split(" ")[0] + "! Your details are pre-filled — just confirm and place your order.";
    document.getElementById("checkoutSection").prepend(banner);
  }

  // ── Scroll to checkout ───────────────────────────────────
  setTimeout(() => {
    document.getElementById("checkoutSection").scrollIntoView({ behavior: "smooth" });
  }, 150);
}


// ── PRODUCTS ──────────────────────────────────────────────────
function renderProducts() {
  const grid = document.getElementById("productsGrid");
  grid.innerHTML = PRODUCTS.map(p => `
    <div class="product-card" onclick="openModal(${p.id})">
      <div class="product-img-wrap">
        ${p.badge ? `<span class="product-tag-badge">${p.badge}</span>` : ""}
        <span>${p.emoji}</span>
      </div>
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="product-sub">${p.subtitle}</div>
        <div class="product-macros">
          <span class="macro">🥩 ${p.macros.protein}</span>
          <span class="macro">🔥 ${p.macros.calories}</span>
        </div>
        <div class="product-footer">
          <div class="product-price">₹${p.price}</div>
          <button class="add-btn" onclick="event.stopPropagation(); addToCart(${p.id})">Add to Cart</button>
        </div>
      </div>
    </div>
  `).join("");
}

// ── MODAL ─────────────────────────────────────────────────────
function openModal(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  document.getElementById("modalBody").innerHTML = `
    <div class="modal-img">${p.emoji}</div>
    <h2 class="modal-title">${p.name}</h2>
    <p class="modal-desc">${p.description}</p>
    <div class="modal-section-title">Nutrition (per bar)</div>
    <div class="modal-macros">
      <div class="modal-macro"><strong>${p.macros.protein}</strong><small>Protein</small></div>
      <div class="modal-macro"><strong>${p.macros.carbs}</strong><small>Carbs</small></div>
      <div class="modal-macro"><strong>${p.macros.fat}</strong><small>Fat</small></div>
      <div class="modal-macro"><strong>${p.macros.calories}</strong><small>Calories</small></div>
    </div>
    <div class="modal-section-title">Ingredients</div>
    <div class="ingredients-list">
      ${p.ingredients.map(i => `<span class="ingredient-tag">${i}</span>`).join("")}
    </div>
    <div class="modal-footer">
      <div class="modal-price">₹${p.price}</div>
      <button class="cta-btn" onclick="addToCart(${p.id}); closeModal()">Add to Cart →</button>
    </div>
  `;
  document.getElementById("modalOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("modalOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

// ── CART ──────────────────────────────────────────────────────
function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  const existing = cart.find(i => i.id === id);
  if (existing) { existing.qty++; }
  else          { cart.push({ ...product, qty: 1 }); }
  saveCart();
  updateCartUI();
  showCartNotification(product.name);
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  updateCartUI();
  renderCartItems();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else { saveCart(); updateCartUI(); renderCartItems(); }
}

function saveCart()     { localStorage.setItem("twt_cart", JSON.stringify(cart)); }
function getCartTotal() { return cart.reduce((s, i) => s + i.price * i.qty, 0); }
function getCartCount() { return cart.reduce((s, i) => s + i.qty, 0); }

function updateCartUI() {
  document.getElementById("cartCount").textContent = getCartCount();
  renderCartItems();
}

function renderCartItems() {
  const container = document.getElementById("cartItems");
  const footer    = document.getElementById("cartFooter");
  if (cart.length === 0) {
    container.innerHTML = `<p class="empty-cart">Your cart is empty.<br>Add some clean food 🌿</p>`;
    footer.style.display = "none";
    return;
  }
  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <span class="cart-item-emoji">${item.emoji}</span>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">₹${item.price} × ${item.qty} = ₹${item.price * item.qty}</div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
          <span>${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, +1)">+</button>
        </div>
      </div>
      <button class="remove-btn" onclick="removeFromCart(${item.id})" title="Remove">✕</button>
    </div>
  `).join("");
  document.getElementById("cartTotal").textContent = getCartTotal();
  footer.style.display = "block";
}

function toggleCart() {
  const drawer  = document.getElementById("cartDrawer");
  const overlay = document.getElementById("cartOverlay");
  const isOpen  = drawer.classList.contains("open");
  drawer.classList.toggle("open");
  overlay.classList.toggle("open");
  document.body.style.overflow = isOpen ? "" : "hidden";
  if (!isOpen) renderCartItems();
}

function showCartNotification(name) {
  const old = document.getElementById("cartNotif");
  if (old) old.remove();
  const notif = document.createElement("div");
  notif.id = "cartNotif";
  notif.style.cssText = [
    "position:fixed",
    "bottom:32px",
    "left:50%",
    "transform:translateX(-50%)",
    "background:#1A1A1A",
    "color:white",
    "padding:12px 24px",
    "border-radius:4px",
    "font-size:0.9rem",
    "z-index:9999",
    "animation:fadeUp 0.3s ease",
  ].join(";");
  notif.textContent = `✓ ${name} added to cart`;
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 2500);
}

// ── CHECKOUT ──────────────────────────────────────────────────
function goToCheckout() {
  if (cart.length === 0) return;
  toggleCart();
  document.getElementById("checkoutSection").style.display = "block";
  renderCheckoutSummary();
  document.getElementById("checkoutSection").scrollIntoView({ behavior: "smooth" });
}

function renderCheckoutSummary() {
  const summary = document.getElementById("checkoutSummary");
  summary.innerHTML = cart.map(item => `
    <div class="summary-item">
      <span>${item.emoji} ${item.name} × ${item.qty}</span>
      <span>₹${item.price * item.qty}</span>
    </div>
  `).join("");
  document.getElementById("checkoutTotal").textContent = getCartTotal();
}

function goBackToShop() {
  document.getElementById("checkoutSection").style.display = "none";
  toggleCart();
}

// ── VALIDATION ────────────────────────────────────────────────
function validate() {
  let valid = true;
  const name    = document.getElementById("custName").value.trim();
  const email   = document.getElementById("custEmail").value.trim();
  const phone   = document.getElementById("custPhone").value.trim();
  const city    = document.getElementById("custCity").value.trim();
  const address = document.getElementById("custAddress").value.trim();

  ["errName","errEmail","errPhone","errCity","errAddress"].forEach(id => {
    document.getElementById(id).textContent = "";
  });

  if (!name || name.length < 2) {
    document.getElementById("errName").textContent = "Please enter your full name.";
    valid = false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    document.getElementById("errEmail").textContent = "Please enter a valid email address.";
    valid = false;
  }
  if (!/^\d{10}$/.test(phone)) {
    document.getElementById("errPhone").textContent = "Enter a valid 10-digit phone number.";
    valid = false;
  }
  if (!city || city.length < 2) {
    document.getElementById("errCity").textContent = "Please enter your city.";
    valid = false;
  }
  if (!address || address.length < 10) {
    document.getElementById("errAddress").textContent = "Please enter a complete address.";
    valid = false;
  }
  return valid;
}

// ── DUPLICATE ORDER GUARD ─────────────────────────────────────
function isDuplicate(name, phone) {
  const placed = JSON.parse(localStorage.getItem(ORDER_DEDUP_KEY) || "[]");
  const key    = `${name.toLowerCase()}::${phone}`;
  const recent = placed.filter(o => Date.now() - o.ts < 60000);
  return recent.some(o => o.key === key);
}
function markOrderPlaced(name, phone) {
  const placed = JSON.parse(localStorage.getItem(ORDER_DEDUP_KEY) || "[]");
  placed.push({ key: `${name.toLowerCase()}::${phone}`, ts: Date.now() });
  localStorage.setItem(ORDER_DEDUP_KEY, JSON.stringify(placed.slice(-20)));
}

// ── ORDER SUBMISSION ──────────────────────────────────────────
async function placeOrder(e) {
  e.preventDefault();
  if (!validate()) return;

  const name    = document.getElementById("custName").value.trim();
  const email   = document.getElementById("custEmail").value.trim();
  const phone   = document.getElementById("custPhone").value.trim();
  const city    = document.getElementById("custCity").value.trim();
  const address = document.getElementById("custAddress").value.trim();
  const btn     = document.getElementById("placeOrderBtn");
  const errBox  = document.getElementById("orderError");

  if (isDuplicate(name, phone)) {
    errBox.textContent = "You placed an identical order recently. Please wait a minute before placing again.";
    errBox.style.display = "block";
    return;
  }

  btn.textContent = "Placing order...";
  btn.disabled    = true;
  errBox.style.display = "none";

  const utm_source   = window._utmSource   || "organic";
  const utm_medium   = window._utmMedium   || "";
  const utm_campaign = window._utmCampaign || "";

  const orders = cart.map(item => ({
    name, email, phone, city, address,
    product_name: item.name,
    order_value:  item.price * item.qty,
    quantity:     item.qty,
    utm_source, utm_medium, utm_campaign,
  }));

  try {
    const res  = await fetch(`${API_BASE}/order`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ orders }),
    });
    const data = await res.json();

    if (res.ok && data.success) {
      markOrderPlaced(name, phone);
      cart = [];
      saveCart();
      updateCartUI();
      window._utmSource = window._utmMedium = window._utmCampaign = null;
      document.getElementById("checkoutSection").style.display = "none";
      document.getElementById("successMsg").textContent =
        `Thank you ${name}! We've received your order and will confirm on ${phone} shortly. A confirmation has been sent to ${email}.`;
      document.getElementById("successOverlay").style.display = "flex";
    } else {
      throw new Error(data.message || "Order failed");
    }
  } catch (err) {
    errBox.textContent = "Failed to place order. Please try again or contact support.";
    errBox.style.display = "block";
    console.error("[ORDER ERROR]", err);
  } finally {
    btn.textContent = "Place Order →";
    btn.disabled    = false;
  }
}

function resetAll() {
  document.getElementById("successOverlay").style.display = "none";
  document.getElementById("checkoutForm").reset();
  document.body.style.overflow = "";
  const banner = document.getElementById("reorderBanner");
  if (banner) banner.remove();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
