# 🔗 TinyTrack

**TinyTrack** is a sleek and efficient URL shortener built with the **MERN stack** (MongoDB, Express, React, Node.js). It allows users to shorten URLs, generate custom short links, and track analytics like total clicks — all with a clean and user-friendly interface.

---

## 🚀 Features

- 🔐 **Authentication** — Secure login and signup using **JWT tokens**
- ✂️ **Shorten URLs** — Instantly convert long URLs into short, shareable links
- 🧩 **Custom Short IDs** — Choose your own short ID for personalization
- 📈 **Click Tracking** — Monitor clicks and view detailed analytics
- 🧭 **User-Friendly UI** — Minimal, responsive design with **Tailwind CSS**
- ⚠️ **Error Handling** — Handles invalid inputs and duplicate short IDs gracefully

---

## 🛠 Tech Stack

### 🔧 Frontend
- React
- Tailwind CSS

### 🔧 Backend
- Node.js
- Express.js
- JWT Authentication

### 🗃️ Database
- MongoDB 

### 📦 Other Libraries
- Axios (for API requests)
- Mongoose (MongoDB management)
- `shortid` (for generating unique short IDs)
- `qrcode.react` (for generating QR codes)
- `lucide-react` (for icons)

---
## 🧪 Getting Started

### ⚙️ Prerequisites

- Node.js (v14 or later)  
- npm or yarn  
- MongoDB  
- Git

---

### 🚀 Backend Setup

1. Navigate to the backend folder:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the backend folder and add:

   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

4. Start the backend server:

   ```bash
   npm start
   ```

   The backend will run at: `http://localhost:5000`

---

### 🎨 Frontend Setup

1. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend folder and add:

   ```env
   REACT_APP_BASE_URL=http://localhost:5000
   ```

4. Start the frontend server:

   ```bash
   npm start
   ```

   The frontend will run at: `http://localhost:3000`

---

### 🌐 Deployment Fix (for Netlify)

To fix React Router issues on refresh:

1. Inside the `public/` folder of your frontend, create a file named `_redirects`
2. Add the following line inside it:

   ```txt
   /*    /index.html   200
   ```
