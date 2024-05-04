import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Auth from './components/Auth/Auth';
import Homepage from './components/AdminPage/HomePage';
import FeedbackForm from './AddFeedback';
import GetFeedback from './GetFeedback';
import AddAdmin from './components/AdminPage/AddAdmin';
import AddUser from './components/AdminPage/AddUser';

function App() {
  return (
    <div className="main-content">
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard_data" element={<Homepage />} />
        <Route path="/feedback" element={<FeedbackForm />} />
        <Route path="/getfeedback" element={<GetFeedback />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/addadmin" element={<AddAdmin />} />
      </Routes>
    </div>
  );
}

export default App;
