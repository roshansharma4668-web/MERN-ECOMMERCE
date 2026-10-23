# RoshanStore - MERN Stack E-Commerce Platform

A production-ready, full-stack e-commerce web application developed as a final year BCA project. Features a responsive React UI, secure Node.js API, and a complete Admin Dashboard for inventory and order management.

## Key Features
* **User System:** JWT-based Authentication & Authorization, Profile Management.
* **Shopping Experience:** Dynamic Cart, Real-time Search, Secure Checkout.
* **Admin Panel:** Full CRUD for Products, Order Status Management (Processing/Delivered), User Management, and Real-time Analytics Dashboard.
* **Tech Stack:** MongoDB, Express.js, React (Vite), Node.js, Tailwind CSS, Axios.

## Environment Variables (.env)
Create a `.env` file in the `backend` directory:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key

## Run Locally
1. cd backend -> `npm install` -> `npm run dev`
2. cd frontend -> `npm install` -> `npm run dev`