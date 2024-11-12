import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './admin.css';
import { getMembers } from '../../services/firestore'; 
import { createNotification } from './notificationService';

const AdminDashboard = () => {
  useEffect(() => {
    const checkNotifications = async () => {
      const members = await getMembers(); // Fetch all members

      // Iterate through each member to check and send notifications
      members.forEach(async (member) => {
        const { id: memberId, email: memberEmail, dueDate } = member;
        
        // Trigger notification creation based on the member's due date
        await createNotification(memberId, memberEmail, dueDate);
      });
    };

    checkNotifications(); // Call the function on component load
  }, []);

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard">
        <h1>Admin Dashboard</h1>
        <nav className="admin-nav">
          <ul className="admin-nav-links">
            <li><Link to="/member">Manage Members</Link></li>
            <li><Link to="/member">Create Bills</Link></li>
            <li><Link to="/admin/notification">Notifications Dashboard</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default AdminDashboard;
