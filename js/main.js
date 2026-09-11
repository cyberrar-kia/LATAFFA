document.getElementById("year").textContent = new Date().getFullYear();

const grid = document.getElementById("product-grid");

PRODUCTS.forEach(function (product) {
  const card = document.createElement("article");
  card.className = "product-card";
  card.innerHTML =
    '<div class="product-media"><img src="' +
    product.image +
    '" alt="' +
    product.name +
    '" loading="lazy" /></div>' +
    '<h3 class="product-name">' +
    product.name +
    "</h3>" +
    '<p class="product-note">' +
    product.note +
    "</p>" +
    '<div class="product-row">' +
    '<span class="price">' +
    formatNaira(product.price) +
    "</span>" +
    '<a class="btn btn-primary" href="checkout.html?product=' +
    product.id +
    '" data-product-id="' +
    product.id +
    '">Buy now</a>' +
    "</div>";
  grid.appendChild(card);

  // Someone looking at this card on the storefront = viewed the product.
  trackSnapEvent("VIEW_CONTENT", product);
});

// Fire START_CHECKOUT ("Initiate Checkout") the moment someone clicks
// "Buy now", before the navigation to checkout.html happens.
grid.addEventListener("click", function (event) {
  const link = event.target.closest("[data-product-id]");
  if (!link) return;
  const product = getProductById(link.dataset.productId);
  if (product) {
    trackSnapEvent("START_CHECKOUT", product);
  }
});
