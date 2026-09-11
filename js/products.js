/* ==========================================================================
   LATAFFA — product data
   Images are embedded as base64 data URIs so the storefront has zero
   dependency on external image hosting — swap PRODUCTS below to update
   names, notes, prices, or images (replace the "image" data URI, or point
   it at a file in /images instead).
   Prices are in NGN, stored as plain numbers (no commas/symbols).
   ========================================================================== */

const PRODUCTS = [
  {
    id: "1",
    name: "Lattafa Dynasty EDP 100ml",
    note: "A crowned crystal flacon holding a bold, fruity-woody eau de parfum — juicy top notes over a warm, regal base.",
    price: 32000,
    image: "REPLACE_DYNASTY",
  },
  {
    id: "2",
    name: "Lattafa Khamrah Qahwa",
    note: "Rich Arabic coffee and cardamom wrapped in amber, spice and a gourmand sweetness.",
    price: 35000,
    image: "REPLACE_KHAMRAH",
  },
];

function formatNaira(amount) {
  return "₦" + amount.toLocaleString("en-NG");
}

function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id);
}
