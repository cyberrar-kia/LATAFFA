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

1. **Products are live** — `js/products.js` has the two real Lattafa products
   (Dynasty EDP 100ml, Khamrah Qahwa) with images embedded as data URIs.
   Edit names, notes, or prices there any time.
2. **Snap Pixel ID is set** — `js/snap-pixel.js` is initialized with the real
   pixel ID from Snapchat Ads Manager.
3. **Set delivery fee / pricing** if needed — `DELIVERY_FEE` is at the top
   of `js/checkout.js`.

## Funnel events fired (for the class to inspect in Snap's Pixel Helper)

| Page | Event | When |
|---|---|---|
| Every page | `PAGE_VIEW` | on load |
| `index.html` | `VIEW_CONTENT` | per product card rendered |
| `index.html` → checkout | `START_CHECKOUT` | on "Buy now" click (Initiate Checkout) |
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
