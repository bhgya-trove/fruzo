# FRUVELLA — Freshness. Delivered.

FRUVELLA is a premium, modern quick-commerce web application for farm-fresh fruits, vegetables, leafy greens, exotic produce, and value combos delivered in 18–24 minutes.

---

## 🌟 Key Features

1. **Original Visual Identity & Design System**
   - Clean, light-themed aesthetic with lush emerald and forest green accents (`#16a34a`, `#15803d`).
   - Glassmorphic navigation headers, micro-animations, custom shadows, and rounded UI components.
   - Fully responsive for Desktop, Tablet, and Mobile viewports (including a dedicated Mobile Bottom Bar).

2. **End-to-End Shopping Journey**
   - **Register & Authentication**: Form validation, password strength indicator, session management in `localStorage`.
   - **Login**: Pre-seeded demo user (`aarav@fruvella.com` / `Password@123`) with one-click quick-fill.
   - **Home**: Dynamic hero section, category navigation, discount coupon banners, best-seller showcases, vegetable & fruit carousels, and value propositions.
   - **Produce Catalog (`/products`)**: Search bar, category filter pills, price slider (₹20 to ₹500), sorting (Relevance, Price, Rating, Popularity), best-seller and stock toggles, and skeleton loaders.
   - **Product Details (`/product/:id`)**: High-res imagery with fallback handling, harvest timestamps, origin details, shelf-life, quantity selector, "Add to Basket", and "Instant Checkout".
   - **Cart (`/cart`)**: Live quantity stepper controls, item removal, free delivery milestone progress bar (Free above ₹199), and coupon system (`FRESH10`, `SAVE50`, `WELCOME20`).
   - **Checkout (`/checkout`)**: Multi-step checkout with delivery address validation, delivery instructions, payment method selector, and expandable order summary.
   - **Payment Simulation (`/payment`)**: Realistic simulated payment for UPI, Credit/Debit Card, and Cash on Delivery with multi-stage processing loader.
   - **Order Placed (`/order-success`)**: Celebratory confetti animation, dynamic order ID generation (`#FV-XXXXXX`), and 18-minute countdown.
   - **Live Delivery Tracking (`/track-order/:orderId`)**: Interactive 4-stage progression timeline (Order Confirmed → Being Packed → Out for Delivery → Delivered), dynamic ETA countdown, rider card (Ramesh Kumar, 4.9★, EV Pod), and manual demo step controls.
   - **Order History (`/orders`)**: Complete past order log with item previews and live tracking links.
   - **User Profile (`/profile`)**: Address book manager, order stats, and logout.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v3 + Custom Design Tokens
- **Icons**: Lucide React
- **Routing**: React Router v7
- **Celebration Effects**: Canvas Confetti
- **State & Persistence**: React Context API (`AuthContext`, `CartContext`, `OrderContext`, `ToastContext`) + `localStorage`

---

## 🚀 How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Open in browser
http://localhost:5173
```
