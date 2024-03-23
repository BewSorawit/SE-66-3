import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route

import Shift from './components/Shift'; // Import Shift component
import ShiftManager from './components/shiftManager'; 
import ScheduleForm from './components/ScheduleForm'; // Import ScheduleForm component

import Login from './components/Login'; // Import Login component
import Home1 from './components/Home1';
import Home2 from './components/Home2';
import Home3 from './components/Home3';

import FCviews from './components/FCviews';
import SendToManager from './components/SendToManager';
import ManagerView from './components/ManagerView';
import UpdateStatusFC from './components/UpdateStatusFC';



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Kong and fon */}
        <Route path="/" element={<Login />} />
        <Route path="/home1" element={<Home1 />} />
        <Route path="/home2" element={<Home2 />} />
        <Route path="/home3" element={<Home3 />} />

        {/* Bew and Focus */}
        <Route path="/shift" element={<Shift />} />
        <Route path="/shiftManager" element={<ShiftManager />} />
        <Route path="/schedule" element={<ScheduleForm />} />
        <Route path="/schedule" element={<ScheduleForm />} />

        {/* Name and fa */}
        <Route path='/FcView' element={<FCviews />}></Route>
        <Route path="/FcView/send/:absenceID" element={<SendToManager />}></Route>
        <Route path='/ManagerView' element={<ManagerView />}></Route>
        <Route path='/ManagerView/sendFC/:absenceID' element={<ManagerView />}></Route>
        <Route path='/FcView/UpdateStatusFC/:absenceID' element={<UpdateStatusFC />}></Route>

      </Routes>
    </BrowserRouter >
  );
};

export default App;
