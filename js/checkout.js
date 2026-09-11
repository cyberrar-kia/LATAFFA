const params = new URLSearchParams(window.location.search);
const product = getProductById(params.get("product")) || PRODUCTS[0];

document.getElementById("year").textContent = new Date().getFullYear();

const DELIVERY_FEE = 2500;

function renderSummary() {
  const summary = document.getElementById("order-summary");
  const total = product.price + DELIVERY_FEE;
  summary.innerHTML =
    "<h2>Order summary</h2>" +
    '<div class="order-line">' +
    '<img src="' +
    product.image +
    '" alt="' +
    product.name +
    '" />' +
    "<div>" +
    '<p class="order-line-name">' +
    product.name +
    "</p>" +
    '<p class="order-line-note">' +
    product.note +
    "</p>" +
    "</div>" +
    "</div>" +
    '<div class="summary-row"><span>Subtotal</span><span>' +
    formatNaira(product.price) +
    "</span></div>" +
    '<div class="summary-row"><span>Delivery (est.)</span><span>' +
    formatNaira(DELIVERY_FEE) +
    "</span></div>" +
    '<div class="summary-row total"><span>Total</span><span>' +
    formatNaira(total) +
    "</span></div>" +
    '<p class="payment-note">Payment is confirmed on delivery or by bank transfer — our team will share account details on the confirmation call. This is a training storefront, so no real payment is processed here.</p>';
}

renderSummary();

// ---- form validation + submit ----

const form = document.getElementById("checkout-form");

const validators = {
  fullName: (v) => v.trim().length > 1,
  phone: (v) => v.replace(/\D/g, "").length >= 10,
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  address: (v) => v.trim().length > 5,
  state: (v) => v.trim().length > 0,
};

function validateField(field) {
  const input = form.elements[field];
  const valid = validators[field](input.value);
  input.closest(".field").classList.toggle("invalid", !valid);
  return valid;
}

Object.keys(validators).forEach(function (field) {
  form.elements[field].addEventListener("blur", function () {
    validateField(field);
  });
});

function generateOrderId() {
  return "LTF-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const allValid = Object.keys(validators)
    .map(validateField)
    .every(Boolean);

  if (!allValid) {
    form.querySelector(".field.invalid input, .field.invalid select, .field.invalid textarea")?.focus();
    return;
  }

  const order = {
    orderId: generateOrderId(),
    productId: product.id,
    fullName: form.elements.fullName.value.trim(),
    phone: form.elements.phone.value.trim(),
    email: form.elements.email.value.trim(),
    address: form.elements.address.value.trim(),
    state: form.elements.state.value,
    total: product.price + DELIVERY_FEE,
  };

  // Handed to the thank-you page via sessionStorage rather than the URL,
  // so customer details don't sit in a shareable link.
  sessionStorage.setItem("lataffa_order", JSON.stringify(order));
  window.location.href = "thank-you.html";
});
