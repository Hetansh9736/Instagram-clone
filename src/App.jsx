import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import PrivateRoute from './Components/PrivateRoute';
import { useEffect, useState } from 'react';
import DashboardLayout from './Layout/DashboardLayout';
import Dashboard from './Pages/Dashboard';
import Profile from './Pages/Profile';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Helper/Firebase';
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from './Redux/Slices/authSlice';
import CreatePost from './Pages/CreatePost'
function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({
          name: user.displayName,
          email: user.email,
          uid: user.uid,
          photoURL: user.photoURL,
        }));
      } else {
        dispatch(clearUser());
      }
      setLoading(false);
    });

    return unsub;
  }, [dispatch]);

  if (loading) {
    return (
      <div className="bg-black h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white text-sm">Loading...</p>
        </div>
      </div>
    );
  }


  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={<PrivateRoute><DashboardLayout /></PrivateRoute>}
      >
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path='createpost' element={<CreatePost />} />
      </Route>
    </Routes>
  );
}

export default App;
