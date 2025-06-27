import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../Helper/Firebase';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../Redux/Slices/authSlice';
import Logo from '../Assets/Instagram-Logo.png';
import { FiHome, FiSearch, FiLogOut } from 'react-icons/fi';
import { LuCirclePlus } from "react-icons/lu";


const getInitials = (name = "") =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
      navigate('/');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const navLinkStyles = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-base transition font-medium 
     ${isActive ? 'bg-[#262626] text-white' : 'text-gray-300 hover:bg-[#262626]'}
     md:justify-start justify-center`;

  return (
    <>
      <div className="hidden md:flex flex-col  w-64 min-h-screen border-r border-[#262626] px-5 py-6 bg-black text-white fixed z-50">
        <div className="flex items-center justify-start mb-6">
          <img src={Logo} alt="Instagram Logo" className="h-16 invert" />
        </div>

        <nav className="flex flex-col gap-2 justify-center">
          <NavLink to="/dashboard" end className={navLinkStyles}>
            <FiHome size={20} /> Home
          </NavLink>
        
          <NavLink to='/dashboard/createpost' className={navLinkStyles}>
            <LuCirclePlus size={20}  /> Create
          </NavLink>
          <NavLink to="/dashboard/profile" className={navLinkStyles}>
            <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center text-xs font-semibold text-white">
              {getInitials(user?.name || user?.email)}
            </div>
            Profile
          </NavLink>
        </nav>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-base text-red-400 hover:bg-[#262626] transition font-medium"
        >
          <FiLogOut size={20} /> Logout
        </button>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-[#262626] text-white flex justify-around py-2 z-50">
        <NavLink to="/dashboard" end className={navLinkStyles}>
          <FiHome size={22} />
        </NavLink>
       
         <NavLink to='/dashboard/createpost' className={navLinkStyles}>
            <LuCirclePlus size={20}  /> 
          </NavLink>
        <NavLink to="/dashboard/profile" className={navLinkStyles}>
          <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center text-xs font-semibold text-white">
            {getInitials(user?.name || user?.email)}
          </div>
        </NavLink>
        <button onClick={handleLogout} className="text-red-400 hover:text-red-300">
          <FiLogOut size={22} />
        </button>
      </div>
    </>
  );
};

export default Sidebar;
