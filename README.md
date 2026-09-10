# LATAFFA — demo perfume storefront

A small static e-commerce site built as a teaching example for running a
direct-sales campaign: real product listing pages, a checkout form, and a
thank-you page that fires a Snapchat Pixel `PURCHASE` event — the full
funnel an ad account needs to optimize toward conversions.

## Structure

```
index.html        product listing / homepage
checkout.html      customer details + order summary
thank-you.html     order confirmation, fires the PURCHASE pixel event
css/style.css       all styling
js/products.js      product data — EDIT THIS to swap in real products
js/snap-pixel.js    Snap Pixel base code + event helper — set your Pixel ID here
js/main.js          renders the product grid, tracks VIEW_CONTENT / ADD_CART
js/checkout.js       renders order summary, validates the form, tracks START_CHECKOUT
js/thank-you.js      renders confirmation, tracks PURCHASE
```

## Before going live

1. **Add the real products.** Open `js/products.js` and replace the `name`,
   `note`, `price`, and `image` for each of the two products. Drop product
   photos in `/images` and point `image` at them (e.g. `images/product-1.jpg`).
2. **Set the Snap Pixel ID.** Open `js/snap-pixel.js` and replace
   `YOUR_SNAP_PIXEL_ID` with the real Pixel ID from Snapchat Ads Manager →
   Events Manager.
3. **Set delivery fee / pricing** if needed — `DELIVERY_FEE` is at the top
   of `js/checkout.js`.

## Funnel events fired (for the class to inspect in Snap's Pixel Helper)

| Page | Event | When |
|---|---|---|
| Every page | `PAGE_VIEW` | on load |
| `index.html` | `VIEW_CONTENT` | per product card rendered |
| `index.html` → checkout | `ADD_CART` | on "Buy now" click |
| `checkout.html` | `START_CHECKOUT` | on page load |
| `thank-you.html` | `PURCHASE` | on load, only if a real order exists in the session |

`PURCHASE` deliberately will not fire if someone lands on `thank-you.html`
without having placed an order in that browser session — good practice for
teaching, since a real ad account should never record a conversion that
didn't happen.

## Deploy

This is a static site — no build step. Push to GitHub and import the repo
into Vercel (framework preset: "Other"), or run `vercel` from this folder
with the Vercel CLI.

## Note

No real payment processor is wired up — checkout collects the order and
routes straight to the thank-you page so the pixel funnel can be
demonstrated end to end. Wire in Paystack/Flutterwave before taking real
orders.
