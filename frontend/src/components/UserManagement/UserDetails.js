import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserMangement.css';
import { Link } from 'react-router-dom';
export default function UserDetails({ user, onDelete }) {
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch('http://localhost:3000/user-details'); // Adjust the URL according to your backend endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("data", data)
        setUserDetails(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }


  const handleDelete = async () => {
    try {
      const response = await fetch('http://localhost:3001/userdelete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: user.id }), // Ensure user.id is a valid ID
      });
      if (response.ok) {
        // Optionally handle success or notify parent component
        onDelete(user.id); // Notify parent component that deletion was successful
      } else {
        // Handle error
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };



  return (
    <>
      <div className="container mt-5">
        <h1 className="text-center mb-4">User Details</h1>
        <div className="list-group">
          {userDetails.map((user) => (
            <div className="list-group-item" key={user.id}>
              <h5>{user.firstName} {user.lastName}</h5>
              <p>Email: {user.email}</p>
              <div>
                <button type='button' >edit</button><button type='button' onClick={handleDelete}>delete</button>
              </div>
            </div>

          ))}
        </div>
        <div className="mt-3">
          <span>Add more data <Link to="/user-management" className="btn btn-primary">Back</Link></span>

        </div>
      </div>
    </>
  );
}


