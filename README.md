# 🛍️ Namma Store



Namma Store is a modern e-commerce application built with Next.js, TypeScript, and Supabase. The project was created as a personal learning initiative to explore full-stack development, authentication, database management, cloud storage, and payment gateway integration.



The application allows users to browse products, manage their cart, complete purchases, and track order history through a responsive and user-friendly interface.



## ✨ Features



### Customer Features


* View product details

* View detailed product information

* Add products to cart

* Cart persistence using Local Storage

* Single-product checkout

* Cart-based checkout

* Order history management

* Address management

* Secure OTP-based authentication



### Authentication



* Email OTP authentication using Supabase Auth

* Passwordless login experience

* Session management handled by Supabase



### Product Management



* Product catalog

* Product image storage using Supabase Buckets



### Payments



* Paystack payment integration

* Razorpay integration planned for Indian customers



## 🛠️ Tech Stack



### Frontend



* Next.js (v16.2.7)

* TypeScript

* Tailwind CSS



### Backend & Database



* Supabase

* PostgreSQL (Supabase Database)

* Supabase Authentication

* Supabase Storage



### Validation



* Zod



### Deployment



* Vercel



## 📂 Database Schema



Current tables include:



* `users`

* `product`

* `category`

* `address`

* `orders`



## 🚀 Getting Started



### Prerequisites



* Node.js 20+

* npm, pnpm, or yarn

* Supabase Project



### Installation



Clone the repository:



```bash

git clone https://github.com/dhanishpraveen/e-commerce.git

cd e-commerce

```



Install dependencies:



```bash

npm install

```



Create a `.env.local` file:



```env

NEXT_PUBLIC_SUPABASE_URL=

NEXT_PUBLIC_SUPABASE_ANON_KEY=

NEXT_PUBLIC_SITE_URL=

PAYSTACK_SECRET_KEY=   

```



Run the development server:



```bash

npm run dev

```



Open:



```text

http://localhost:3000

```



## 🔐 Authentication Flow



1. User enters email address.

2. Supabase sends a one-time password (OTP).

3. User verifies OTP.

4. Session is created securely.

5. Protected routes become accessible.



## 🖼️ Image Storage



Product images are stored using Supabase Storage Buckets.



Benefits:



* Secure file uploads

* Fast CDN delivery

* Easy integration with Next.js



## 💳 Payments



### Current



* Paystack Integration



### Planned



* Razorpay Integration for Indian users



## 🌐 Deployment



The application is deployed on Vercel.



### Deploy Your Own



1. Fork the repository.

2. Create a Supabase project.

3. Configure environment variables.

4. Connect repository to Vercel.

5. Deploy.



## 📈 Future Improvements



* Razorpay integration

* Wishlist functionality

* Product search and filtering

* Product reviews and ratings

* Coupon and discount system

* Admin dashboard

* Inventory management

* Analytics and reporting

* Email notifications

* Order tracking updates



## 🎯 Learning Objectives



This project was built to gain hands-on experience with:



* Next.js App Router

* TypeScript

* Supabase Authentication

* Supabase Storage

* PostgreSQL Database Design

* Payment Gateway Integration

* Server-side Rendering

* Full-Stack Application Development



## 🤝 Contributing



Contributions, suggestions, and feedback are welcome.



1. Fork the repository

2. Create a feature branch

3. Commit your changes

4. Push your branch

5. Open a Pull Request



## 👨‍💻 Author



**Dhanish Praveen K**



Personal project focused on learning modern full-stack web development and payment gateway integrations.



