import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route
import Shift from './components/Shift'; // Import Shift component
import ScheduleForm from './components/ScheduleForm'; // Import ScheduleForm component
import Login from './components/Login'; // Import Login component
import Home1 from './components/Home1';
import Home2 from './components/Home2';
import Home3 from './components/Home3';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/shift" element={<Shift />} />
        <Route path="/schedule" element={<ScheduleForm />} /> 
        <Route path="/schedule" element={<ScheduleForm />} /> 
        <Route path="/" element={<Login />} />
        <Route path="/home1" element={<Home1 />} />
        <Route path="/home2" element={<Home2 />} />
        <Route path="/home3" element={<Home3 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
