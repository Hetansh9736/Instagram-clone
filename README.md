Instagram Clone

A fully functional **Instagram Clone** built using **React**, **Redux Toolkit**, **Firebase**, **Cloudinary**, and **Tailwind CSS**. This clone includes user authentication, photo uploads, profile viewing, and a responsive, sleek UI.

---

🚀 Features

- 🔐 User Authentication (Register / Login)
- 📷 Upload images with captions
- 👤 View personal profile with posts
- 🗑️ Delete posts
- 💬 Comment support
- 🌐 Fully responsive design
- ☁️ Cloudinary integration for image hosting
- 🔥 Firebase Firestore for real-time data

---

Project Structure

```
src/
│
├── Assets/                # Static assets like images
│
├── Components/            # Reusable UI components
│   ├── CommentBox.jsx
│   ├── PostCard.jsx
│   ├── PostCardSkeleton.jsx
│   ├── PostUpload.jsx
│   ├── PrivateRoute.jsx
│   └── Sidebar.jsx
│
├── Helper/
│   └── Firebase.js        # Firebase config
│
├── Layout/
│   └── DashboardLayout.jsx
│
├── Pages/                 # Main route views
│   ├── CreatePost.jsx
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   ├── Profile.jsx
│   └── Register.jsx
│
├── Redux/
│   ├── Actions/
│   │   ├── HomeAction.js
│   │   └── postActions.js
│   ├── Slices/
│   │   ├── authSlice.js
│   │   └── postSlice.js
│   └── Store.js
│
├── Utils/
│   └── cloudinary.js      # Image upload utility
│
├── App.jsx                # Routes & layout structure
├── App.css                # Main app styles
├── index.css              # Tailwind / global styles
└── index.js
```

Built With

- **React**
- **Redux Toolkit**
- **Firebase Auth + Firestore**
- **Cloudinary**
- **Tailwind CSS**
- **React Router DOM**

---
Getting Started

1.Install Dependencies

```bash
npm install
```

2.Environment Variables

Create a `.env` file in the root:

```env
# 👉 Firebase Config
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# 👉 Cloudinary Config
VITE_CLOUD_NAME=dfu7smvul
VITE_UPLOAD_PRESET=unsigned_posts
```

> ⚠️ **DO NOT COMMIT** `.env` files to GitHub. Add `.env` to `.gitignore`.

3.Start Development Server

```bash
npm run dev
```

License

This project is open source and available under the MIT License.
