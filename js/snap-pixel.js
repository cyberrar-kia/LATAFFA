/* ==========================================================================
   LATAFFA — Snap Pixel
   ------------------------------------------------------------------------
   1. Replace YOUR_SNAP_PIXEL_ID below with the real Pixel ID from
      Snapchat Ads Manager → Events Manager → your pixel → Setup.
   2. This file is loaded on every page (see the <script> tag near the
      bottom of each .html file), so PAGE_VIEW fires everywhere and the
      snaptr() helper is available for the funnel events below:
        - index.html      → PAGE_VIEW (automatic) + VIEW_CONTENT per product
        - "Buy now" click  → ADD_CART
        - checkout.html   → START_CHECKOUT
        - thank-you.html  → PURCHASE  (this is the conversion event you
                              optimize the ad campaign toward)
   ========================================================================== */

(function (e, t, n) {
  if (e.snaptr) return;
  var a = (e.snaptr = function () {
    a.handleRequest ? a.handleRequest.apply(a, arguments) : a.queue.push(arguments);
  });
  a.queue = [];
  var s = "script";
  var r = t.createElement(s);
  r.async = true;
  r.src = n;
  var u = t.getElementsByTagName(s)[0];
  u.parentNode.insertBefore(r, u);
})(window, document, "https://sc-static.net/scevent.min.js");

snaptr("init", "YOUR_SNAP_PIXEL_ID");
snaptr("track", "PAGE_VIEW");

/**
 * Fires a Snap Pixel event with the standard e-commerce params.
 * Kept as one small wrapper so the class can see every call site
 * in main.js/checkout.js without repeating the raw snaptr syntax.
 */
function trackSnapEvent(eventName, product, extra) {
  var payload = {};
  if (product) {
    payload.item_ids = [product.id];
    payload.item_category = "Perfume";
    payload.price = product.price;
    payload.currency = "NGN";
  }
  if (extra) {
    Object.assign(payload, extra);
  }
  snaptr("track", eventName, payload);
}
