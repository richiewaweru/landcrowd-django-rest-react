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


  const markAsRead = async (id) => {
    try {
      await axios.patch(`http://localhost:8000/api/notifications/${id}/`, {},config);
      setNotifications(prevNotifications =>
        prevNotifications.map(notification =>
          notification.id === id
            ? { ...notification, is_read: true }
            : notification
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/notifications/${id}`, config);
      setNotifications(prevNotifications =>
        prevNotifications.filter(notification => notification.id !== id)
      );
      
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  console.log(notifications)
  return (
    <div>
      <h2>My Notifications</h2>
      {notifications.length > 0 ? (
        notifications.map(notification => (
          <>
            <p key={notification.id}></p>   
            <p>{notification.title}</p>
            <p>{notification.is_read}</p> 
            <p>{notification.message}</p>
            <p>from:{notification.sender_username}</p>
            <p>to:{notification.recipient_username}</p>
            {!notification.is_read && (
              <button onClick={() => markAsRead(notification.id)}>Mark as Read</button>
            )}
            <button onClick={() => deleteNotification(notification.id)}>Delete</button>
          </>  
        ))
      ) : (
        <p>No notifications.</p>
      )}
    </div>
  );
};

export default UserNotifications;
