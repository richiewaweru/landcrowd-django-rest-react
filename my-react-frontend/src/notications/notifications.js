import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem('token');
  const config = {
    headers: { 'Authorization': `Token ${token}` },
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/notifications/', config);
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  console.log(notifications)
  return (
    <div>
      <h2>My Notifications</h2>
      {notifications.length > 0 ? (
        notifications.map(notification => (   
            <p>{notification.message}</p>
        ))
      ) : (
        <p>No notifications.</p>
      )}
    </div>
  );
};

export default UserNotifications;
