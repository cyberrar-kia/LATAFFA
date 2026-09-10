document.getElementById("year").textContent = new Date().getFullYear();

const raw = sessionStorage.getItem("lataffa_order");

if (!raw) {
  // No order in this session — don't fabricate a PURCHASE event.
  document.getElementById("thanks-name").textContent = ".";
  document.getElementById("order-id").textContent = "";
  document.querySelector(".thanks p").textContent =
    "We couldn't find a recent order in this session. If you just placed one, check your email for confirmation — otherwise head back to the collection to order again.";
} else {
  const order = JSON.parse(raw);
  const product = getProductById(order.productId);

  document.getElementById("thanks-name").textContent = ", " + order.fullName.split(" ")[0] + ".";
  document.getElementById("order-id").textContent = order.orderId;

  const summary = document.getElementById("thanks-summary");
  summary.innerHTML =
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
    '<p class="order-line-note">Delivering to ' +
    order.state +
    "</p>" +
    "</div>" +
    "</div>" +
    '<div class="summary-row total"><span>Total</span><span>' +
    formatNaira(order.total) +
    "</span></div>";

  // This is the conversion event the ad campaign is optimized toward.
  trackSnapEvent("PURCHASE", product, {
    transaction_id: order.orderId,
    price: order.total,
  });

  // One-time order, so clear it — refreshing this page won't double-fire.
  sessionStorage.removeItem("lataffa_order");
}
