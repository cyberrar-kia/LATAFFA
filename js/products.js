/* ==========================================================================
   LATAFFA — product data
   This is the ONLY file you need to edit to swap in the real products.
   For each product:
     - image: path to the product photo (drop files in /images and point here)
     - name / note / price: shown on the listing, checkout and order summary
   Prices are in NGN, stored as plain numbers (no commas/symbols).
   ========================================================================== */

const PRODUCTS = [
  {
    id: "1",
    name: "LATAFFA — Product 1",
    note: "Replace this with the real product name and a one-line description.",
    price: 18500,
    image: "https://placehold.co/640x800/1c1610/b9924f?text=LATAFFA%0AProduct+1",
  },
  {
    id: "2",
    name: "LATAFFA — Product 2",
    note: "Replace this with the real product name and a one-line description.",
    price: 21000,
    image: "https://placehold.co/640x800/1c1610/b9924f?text=LATAFFA%0AProduct+2",
  },
];

function formatNaira(amount) {
  return "₦" + amount.toLocaleString("en-NG");
}

function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id);
}
