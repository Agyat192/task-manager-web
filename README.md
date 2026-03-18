# Task Management Web Application 🎨

A modern, responsive task management dashboard built with **Next.js**, **TypeScript**, and **Tailored CSS (Glassmorphism)**.

## 🛠️ Tech Stack
- **Next.js** (App Router)
- **TypeScript**
- **Axios** (API Client with Interceptors)
- **React Context** (Auth State)
- **react-hot-toast** (Notifications)
- **Inter Font** (Typography)

## 📦 Features
- **Premium UI**: Modern dark theme with glassmorphism and smooth animations.
- **Secure Auth Flow**: Seamless login/registration with automatic token rotation.
- **Interactive Dashboard**: Create, edit, delete, and toggle tasks with instant UI feedback.
- **Search & Filter**: Find tasks quickly with search and status-based filtering.
- **Responsive Design**: Works perfectly across mobile, tablet, and desktop screens.
- **Real-time Notifications**: Instant feedback on every user action.

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Environment Setup
Create a `.env.local` file in the root:
```env
NEXT_PUBLIC_API_URL="http://localhost:5000"
```

### 3. Run Development Server
```bash
npm run dev
```
Access the app at `http://localhost:3000`.

## 📜 Available Scripts
- `npm run dev`: Start Next.js in development mode.
- `npm run build`: Create an optimized production build.
- `npm start`: Run the production server.

## 📁 Page Structure
- `/`: Main dashboard (Authenticated).
- `/login`: Secure sign-in page.
- `/register`: Account creation page.

## ☁️ Deployment
Optimized for **Vercel**.
Ensure `NEXT_PUBLIC_API_URL` is set in your Vercel project environment variables to point to your live backend API.
