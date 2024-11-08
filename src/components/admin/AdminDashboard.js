import React from 'react';
import { Link } from 'react-router-dom';
import './admin.css'; // Importing the CSS file for styling

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard">
        <h1>Admin Dashboard</h1>
        <nav className="admin-nav">
          <ul className="admin-nav-links">
            <li><Link to="/member">Manage Members</Link></li>
            <li><Link to="/member">Create Bills</Link></li>
            <li><Link to="/member">Assign Notifications</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default AdminDashboard;
