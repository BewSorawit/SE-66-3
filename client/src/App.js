import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

import Shift from './components/Shift';
import ScheduleForm from './components/ScheduleForm';
import Login from './components/Login';
import Signup from './components/Signup';
import HomeAdmin from './components/HomeAdmin';
import HomeFc from './components/HomeFc';
import HomeManager from './components/HomeManager';
import HomeEmployee from './components/HomeEmployee';
import NavbarAdmin from './components/NavbarAdmin';

const AppLayoutAdmin = () => (
  <>
    <NavbarAdmin />
    <Outlet />
  </>
);

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/">

          {/* Admin Routes */}
          <Route element={<AppLayoutAdmin />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/homeadmin" element={<HomeAdmin />} />
            <Route path="/homefc" element={<HomeFc />} />
            <Route path="/homemanager" element={<HomeManager />} />
            <Route path="/homeemployee" element={<HomeEmployee />} />
          </Route>

          {/* Bew and Focus Routes */}
          <Route>
            <Route path="/shift" element={<Shift />} />
            <Route path="/schedule" element={<ScheduleForm />} />
          </Route>

        </Route>

      </Routes>
    </Router>
  );
};

export default App;
