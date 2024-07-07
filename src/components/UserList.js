// src/components/UserList.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then(response => setUsers(response.data))
      .catch(error => console.log(error));
  }, []);

  const deleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      axios.delete(`http://localhost:5000/users/${id}`)
        .then(() => setUsers(users.filter(user => user.id !== id)))
        .catch(error => console.log(error));
    }
  };

  return (
    <div>
      <h1>User List</h1>
      <Link to="/add" className="btn btn-primary mb-2">Add User</Link>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Create on</th>
            <th>Role</th>
            <th>Status</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.date}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>{user.email}</td>
              <td>
                <Link to={`/edit/${user.id}`} className="btn btn-warning mr-2">Edit</Link>
                <button onClick={() => deleteUser(user.id)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
