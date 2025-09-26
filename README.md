Instagram Clone

A fully functional Instagram-inspired social media app built with React, Redux Toolkit, Firebase, Cloudinary, and Tailwind CSS.
Includes user authentication, image uploads, profile management, real-time updates, and a responsive, modern UI.

🔗 Live Demo: instagram-clone-eight-wine.vercel.app

Features
User authentication (register / login)
Upload images with captions
View personal profile with posts
Delete posts
Comment support
Responsive design (mobile & desktop)
Cloudinary integration for image hosting
Firebase Firestore for real-time data

Tech Stack
Frontend: React, Redux Toolkit, React Router DOM
Styling: Tailwind CSS
Backend Services: Firebase Auth, Firebase Firestore, Cloudinary
Deployment: Vercel

Project Structure
src/
├── Assets/              # Static assets  
├── Components/          # Reusable UI components  
│   ├── CommentBox.jsx
│   ├── PostCard.jsx
│   ├── PostUpload.jsx
│   └── Sidebar.jsx
├── Helper/              # Firebase config  
│   └── Firebase.js
├── Layout/              # App layout  
│   └── DashboardLayout.jsx
├── Pages/               # Route views  
│   ├── CreatePost.jsx
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   ├── Profile.jsx
│   └── Register.jsx
├── Redux/               # State management  
│   ├── Slices/
│   │   ├── authSlice.js
│   │   └── postSlice.js
│   └── Store.js
├── Utils/               # Utilities (Cloudinary upload)  
│   └── cloudinary.js
├── App.jsx              # Routes & layout structure  
└── index.js             # Entry point  

Getting Started
1. Install Dependencies
npm install


2. Set Up Environment Variables

Create a .env file in the root directory:

# Firebase Config
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Cloudinary Config
VITE_CLOUD_NAME=your_cloud_name
VITE_UPLOAD_PRESET=your_upload_preset


⚠️ Make sure .env is included in .gitignore.

3. Start Development Server
npm run dev
