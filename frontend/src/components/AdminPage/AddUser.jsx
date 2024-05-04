import React, { useState } from 'react';
import axios from 'axios';
import "../style/RegistrationForm.css";
import Sidebar from '..//navigation/Sidebar'; 
import SearchBar from '../navigation/SearchBar'; 

function AddUser() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const addUser = () => {
      axios.post('http://localhost:5000/adduser', { username, email, password })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.error('Error adding user:', err);
          setError('Failed to add user. Please try again.');
        });
    };
  
    return (
      <div className="registration-form">
        <Sidebar />
        <SearchBar />
        <h1>Add User</h1>
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <div className="form-error">{error}</div>}
        <button onClick={addUser}>Add User</button>
      </div>
    );
  }
  
  export default AddUser;
