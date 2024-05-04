import React, { useState } from 'react';
import axios from 'axios';
import "../style/RegistrationForm.css"
import Sidebar from '..//navigation/Sidebar'; 
import SearchBar from '../navigation/SearchBar'; 

function AddAdmin() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const addAdmin = () => {
      axios.post('http://localhost:5000/addadmin', { username, email, password })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.error('Error adding admin:', err);
          setError('Failed to add admin. Please try again.');
        });
    };
  
    return (
      <div className="registration-form">
        <Sidebar />
        <SearchBar />

        <h1>Add Admin</h1>
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <div className="form-error">{error}</div>}
        <button onClick={addAdmin}>Add Admin</button>
      </div>
    );
  }
  
  export default AddAdmin;