# Game Shop

A simple e-commerce app for browsing and buying video games. Built to practice with **Next.js 15** and **React 19**, focusing on a smooth user experience with filtering, pagination, clean UI, and component-level testing.

## 📦 What's Inside

- Game catalog with static data (30 games)
- Filter games by genre
- URL-based pagination
- Shopping cart with add/remove/update logic
- Responsive design for mobile and desktop
- Loading states for better UX
- **Unit tests for components and cart logic (Jest + React Testing Library)**

## Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Jest
- React Testing Library

## 🧪 Testing

This project includes a full suite of tests to ensure UI components and state logic behave consistently across scenarios.

### What’s tested?

- **Cart Context**
  - Add items
  - Remove items
  - Update quantity
  - Totals calculation
  - Local storage persistence  

- **Order Summary**
  - Renders items
  - Shows “Show more / Show less”
  - Displays correct total price  

- **Add to Cart Button**
  - Toggles between “ADD TO CART” and “REMOVE”
  - Adds/removes items correctly  

## Getting Started

```bash
npm install
npm run dev
```
### Run tests

```bash
npm run test


