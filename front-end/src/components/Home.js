import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const [message, setMessage] = useState('');

  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data);
        console.log('Fetched users:', response.data);
      } catch (error) {
        setMessage('Error fetching users');
      }
    };
    fetchUsers();
  }, []);

  const handleEdit = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevEditedUser) => ({ ...prevEditedUser, [name]: value }));
  };

  const saveChanges = async (userId) => {
    console.log('Saving changes for user:', userId, editedUser);
    try {
      await axios.put(`http://localhost:5000/api/users/${userId}`, editedUser);
      setMessage('s');
      setIsEditing(null);
      setEditedUser({});

      
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, ...editedUser } : user
        )
      );
    } catch (error) {
      console.error('Error updating user:', error);
      setMessage('Error updating user details');
    }
  };

  const deleteUser = async (userId) => {
    console.log('Deleting user with ID:', userId);
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`);
      setMessage('');
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      setMessage('Error deleting user');
    }
  };

  return (
    <div>
      <h2 style={{ marginTop: '20px' }}>USER DETAILS</h2>
      {message && <p>{message}</p>}
      {users.length === 0 ? (
        <p>No users available</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              {isEditing === user._id ? (
                <div>
                  <input
                    type="text"
                    name="name"
                    value={editedUser.name || user.name}
                    onChange={handleEdit}
                  />
                  <input
                    type="text"
                    name="profession"
                    value={editedUser.profession || user.profession}
                    onChange={handleEdit}
                  />
                  <input
                    type="text"
                    name="phoneNumber"
                    value={editedUser.phoneNumber || user.phoneNumber}
                    onChange={handleEdit}
                  />
                  <button style={{ marginBottom: '15px' }} onClick={() => saveChanges(user._id)}>Save</button>
                  <button style={{ marginBottom: '15px' }} onClick={() => setIsEditing(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  <p>Name: {user.name}</p>
                  <p>Profession: {user.profession}</p>
                  <p>Phone: {user.phoneNumber}</p>
                  <button
                    style={{ marginBottom: '5px' }}
                    onClick={() => {
                      setIsEditing(user._id);
                      setEditedUser({
                        name: user.name,
                        profession: user.profession,
                        phoneNumber: user.phoneNumber,
                      });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    style={{ marginBottom: '5px' }}
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
