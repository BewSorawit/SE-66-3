import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import HomeAdmin from './components/HomeAdmin';

import Shift from './components/Shift';
import FCviews from './components/FCviews';
import SendToManager from './components/SendToManager';
import ManagerView from './components/ManagerView';
import UpdateStatusFC from './components/UpdateStatusFC';
import FcCheck from './components/FcCheck';
import FcCheckDetail from './components/FcCheckDetail';
import InfoModal from './components/InfoModal';

import HomeFc from './components/HomeFc';
import HomeManager from './components/HomeManager';
import HomeEmployee from './components/HomeEmployee';

import NavbarAdmin from './components/navbar/NavbarAdmin';
import NavbarEmployee from './components/navbar/NavbarEmployee';
import NavbarManager from './components/navbar/NavbarManager';
import NavbarFc from './components/navbar/NavbarFc';
import { Outlet } from 'react-router-dom';
import Test from './components/Test';

const AppLayoutAdmin = ({ handleLogout, children }) => (
  <>
    <NavbarAdmin handleLogout={handleLogout} />
    <Outlet />
  </>
);

const AppLayoutEmployee = ({ handleLogout, children }) => (
  <>
    <NavbarEmployee handleLogout={handleLogout} />
    <Outlet />
  </>
);

const AppLayoutManager = ({ handleLogout, children }) => (
  <>
    <NavbarManager handleLogout={handleLogout} />
    <Outlet />
  </>
);

const AppLayoutFc = ({ handleLogout, children }) => (
  <>
    <NavbarFc handleLogout={handleLogout} />
    <Outlet />
  </>
);

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }

  }, []);

  const handleLogin = async (values) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, values);
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };


  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      setUser(null);
      localStorage.removeItem('user');
      return <Navigate to="/" />;
    } else {
      return null;
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? (
            user.roleID === "1" ? (
              <Navigate to="/homeAdmin" />
            ) : user.roleID === "2" ? (
              <Navigate to="/homeManager" />
            ) : user.roleID === "3" ? (
              <Navigate to="/homeEmployee" />
            ) : user.roleID === "4" ? (
              <Navigate to="/homeFc" />
            ) : null
          ) : (
            <Login setUser={handleLogin} />
          )}
        />

        {/* Admin Routes */}
        {user && user.roleID === "1" && (
          <Route element={<AppLayoutAdmin handleLogout={handleLogout} />}>
            <Route path="/homeAdmin" element={<HomeAdmin user={user} />} />
            <Route path="/signup" element={<Signup user={user} />} />
            <Route path="/adminShift" element={<Shift user={user} />} />
            <Route path="/FcView" element={<FCviews user={user} />} />
          </Route>
        )}

        {/* Employee Routes */}
        {user && user.roleID === "3" && (
          <Route element={<AppLayoutEmployee handleLogout={handleLogout} />} >
            <Route path="/homeEmployee" element={<HomeEmployee user={user} />} />
            <Route path="/employeeShift" element={<Shift user={user} />} />
          </Route>
        )}

        {user && user.roleID === "2" && (
          <Route element={<AppLayoutManager handleLogout={handleLogout} />} >
            <Route path="/homeManager" element={<HomeManager user={user} />} />
            <Route path="/employeeShift" element={<Shift user={user} />} />
          </Route>
        )}

        {user && user.roleID === "4" && (
          <Route element={<AppLayoutFc handleLogout={handleLogout} />} >
            <Route path="/homeFc" element={<HomeFc />} />
          </Route>
        )}
        {/* Name and fa */}
        <Route>
          <Route path='/FcView' element={<FCviews user={user} />}></Route>
          <Route path="/FcView/send/:absenceID" element={<SendToManager user={user} />}></Route>
          <Route path='/ManagerView' element={<ManagerView user={user} />}></Route>
          <Route path='/ManagerView/sendFC/:absenceID' element={<InfoModal user={user} />}></Route>
          <Route path='/FcCheck' element={<FcCheck />}></Route>
          <Route path='/FcCheck/send/:absenceID' element={<FcCheckDetail />}></Route>
          <Route path='/FcView/UpdateStatusFC/:absenceID' element={<UpdateStatusFC user={user} />}></Route>
        </Route>


        <Route path='/test' element={<Test user={user} />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
