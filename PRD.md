# Product Requirements Document (PRD)

## 1. Product Overview

A web-based application to help users select and purchase rice based on their nutritional priorities. The system provides a recommendation score and suggests the most suitable product.

---

## 2. Goals

- Help users choose the right product easily
- Provide a personalized recommendation system
- Enable seamless online ordering
- Provide admin control for managing products and orders

---

## 3. Target Users

- Health-conscious consumers
- Customers looking for specific nutritional benefits

---

## 4. Key Features

### 4.1 User Flow

1. Landing Page

 - Introduction to product
 - “Get Started” button

2. Preference Selection

 - Users select priorities (e.g., minerals, protein, glycemic control)
 - Slider/input-based interface

3. Recommendation Result

 - Display recommendation level (1–10)
 - Show explanation (optional later)
 - Suggest suitable product

4. Product Page

 - Product details (name, price, description, image)
 - Add to cart

5. Checkout

 - User login/signup
 - Address details
 - Payment via Razorpay

6. Order Confirmation

 - Order summary
 - Confirmation message

---

### 4.2 Admin Features

- Admin login
- Add/edit/delete products
- View orders
- Update order status

---

## 5. Functional Requirements

- User authentication system
- Product management system
- Recommendation logic module (to be provided by client)
- Cart and order system
- Payment gateway integration (Razorpay)
- Responsive UI (mobile-first)

---

## 6. Non-Functional Requirements

- Fast loading pages
- Mobile responsiveness
- Basic security (auth, payment verification)
- Reliable deployment

---

## 7. Tech Stack

- Backend: Django
- Frontend: Django Templates + Tailwind CSS
- Database: PostgreSQL (production)
- Payments: Razorpay
- Hosting: Render

---

## 8. Timeline

- Week 1: Setup, models, basic UI
- Week 2: Core features (flow, auth, payment)
- Week 3: Testing, fixes, deployment

---

## 9. Out of Scope (for now)

- Advanced analytics dashboard
- AI-based recommendation explanation
- Mobile app
- Multi-vendor system

---

## 10. Success Criteria

- User can complete full flow (selection → recommendation → purchase)
- Admin can manage products and orders
- Payment works reliably
- System runs smoothly in production

---

## 11. Dependencies

- Recommendation logic from client
- Product data (images, pricing, descriptions)
- Payment account setup (Razorpay)

---

## 12. Maintenance

- 30 days post-delivery support for minor bug fixes
- Optional maintenance plan available

---

**End of Document**
