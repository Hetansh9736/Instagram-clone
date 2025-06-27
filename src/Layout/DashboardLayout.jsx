import React from 'react';
import Sidebar from '../Components/Sidebar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <Sidebar />
      <main className="md:ml-64 pt-4 px-4 pb-20 md:pb-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
