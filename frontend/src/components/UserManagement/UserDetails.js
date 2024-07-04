import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserMangement.css';
import { Link } from 'react-router-dom';

export default function UserDetails({ onDelete }) {
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch('http://localhost:3000/user-details'); // Adjust the URL according to your backend endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUserDetails(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/userdelete/${userId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        onDelete(userId); // Notify parent component that deletion was successful
        setUserDetails(userDetails.filter((user) => user.id !== userId)); // Remove the deleted user from the state
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleEditChange = (e) => {
    setEditingUser({ ...editingUser, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/useredit/${editingUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingUser),
      });
      if (response.ok) {
        const updatedUser = await response.json();
        setUserDetails(userDetails.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
        setEditingUser(null);
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">User Details</h1>
      <div className="list-group">
        {userDetails.map((user) => (
          <div className="list-group-item" key={user.id}>
            {editingUser && editingUser.id === user.id ? (
              <form onSubmit={handleEditSubmit}>
                <input
                  type="text"
                  name="firstName"
                  value={editingUser.firstName}
                  onChange={handleEditChange}
                  placeholder="First Name"
                />
                <input
                  type="text"
                  name="lastName"
                  value={editingUser.lastName}
                  onChange={handleEditChange}
                  placeholder="Last Name"
                />
                <input
                  type="email"
                  name="email"
                  value={editingUser.email}
                  onChange={handleEditChange}
                  placeholder="Email"
                />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingUser(null)}>Cancel</button>
              </form>
            ) : (
              <>
                <h5>{user.firstName} {user.lastName}</h5>
                <p>Email: {user.email}</p>
                <div>
                  <button type='button' onClick={() => handleEdit(user)}>edit</button>
                  <button type='button' onClick={() => handleDelete(user.id)}>delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="mt-3">
        <span>Add more data <Link to="/user-management" className="btn btn-primary">Back</Link></span>
      </div>
    </div>
  );
}
