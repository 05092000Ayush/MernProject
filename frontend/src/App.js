import React from 'react';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Registration from './from/Registration';
import LoginForm from './from/Login';
import UserMangement from './components/UserManagement/UserMangement';
import UserDetails from './components/UserManagement/UserDetails';
import ViewUserDetails from './components/UserManagement/ViewUserDetails';

function App() {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Header />} />
        <Route exact path='/login' element={<LoginForm />} />
        <Route exact path="/registration" element={<Registration />} />
        <Route exact path='/user-management' element={<UserMangement />} />
        <Route exact path='/users-details' element={<UserDetails />} />
      </Routes>
    </div>
  );
}

export default App;
