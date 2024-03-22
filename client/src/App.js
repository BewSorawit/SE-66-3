import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route
import Shift from './components/Shift'; // Import Shift component
import ScheduleForm from './components/ScheduleForm'; // Import ScheduleForm component

import Login from './components/Login'; // Import Login component
import Signup from './components/Signup';

import HomeAdmin from './components/HomeAdmin';
import HomeFc from './components/HomeFc';
import HomeManager from './components/HomeManager';
import HomeEmployee from './components/HomeEmployee';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/shift" element={<Shift />} />
        <Route path="/schedule" element={<ScheduleForm />} /> 
        <Route path="/schedule" element={<ScheduleForm />} /> 
        
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/homeadmin" element={<HomeAdmin />} />
        <Route path="/homefc" element={<HomeFc />} />
        <Route path="/homemanager" element={<HomeManager />} />
        <Route path="/homeemployee" element={<HomeEmployee />} />
      
      </Routes>
    </BrowserRouter>
  );
};

export default App;
