import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

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
      await axios.patch(`http://localhost:8000/api/notifications/${id}/`, {is_read: true}, config);
      setNotifications(prevNotifications =>
        prevNotifications.map(notification =>
          notification.id === id ? { ...notification, is_read: true } : notification
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

  return (
    <div className="container" >
      <h2 className="text-center mb-4">My Notifications</h2>
      <div className="row">
        <div className="col">
          <h3>Unread Notifications</h3>
          {notifications.filter(notification => !notification.is_read).map(notification => (
            <div key={notification.id} className="card mb-3" style={{ borderRadius: '15px' }}>
              <div className="card-body">
                <h5 className="card-title">{notification.title}</h5>
                <p className="card-text">{notification.message}</p>
                <p className="card-text"><small>From: {notification.sender_username}</small></p>
                <p className="card-text"><small>To: {notification.recipient_username}</small></p>
                <div className="col p-2">
                  <button className="btn btn-primary w-50" onClick={() => markAsRead(notification.id)}>Mark as Read</button>
                </div>
                <div className="col p-2">
                  <button className="btn btn-danger w-50" onClick={() => deleteNotification(notification.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col">
          <h3>Read Notifications</h3>
          {notifications.filter(notification => notification.is_read).map(notification => (
            <div key={notification.id} className="card mb-3" style={{ borderRadius: '15px' }}>
              <div className="card-body">
                <h5 className="card-title">{notification.title}</h5>
                <p className="card-text">{notification.message}</p>
                <p className="card-text"><small>From: {notification.sender_username}</small></p>
                <p className="card-text"><small>To: {notification.recipient_username}</small></p>
                <button className="btn btn-danger" onClick={() => deleteNotification(notification.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserNotifications;
