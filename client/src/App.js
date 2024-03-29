import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route
import { UserProvider } from './components/UserContext';

import Shift from './components/Shift'; // Import Shift component
import TimeManager from './components/timeManager';
import AbsenceManagePage from './components/absenceManagePage';
import AbsenceEditEmp from './components/absenceEditEmp';
import AbsenceSum from './components/absenceSum';
import AbsenceSelect from './components/absenceSelect';
import LeaveFormEmPage from './components/leaveFormEmPage';
import LeaveFormMgPage from './components/leaveFormMgPage';
import AddShiftPage from './components/addShiftPage';
import AddShiftDetailPage from './components/addShiftDetailPage';
import ShiftManagementPage from './components/shiftManagementPage';
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
      <UserProvider>
        <Routes>
          {/* Kong and fon */}
          <Route path="/" element={<Login />} />
          <Route path="/home1" element={<Home1 />} />
          <Route path="/home2" element={<Home2 />} />
          <Route path="/home3" element={<Home3 />} />
          
          {/* Bew and Focus */}
          <Route path="/shift" element={<Shift />} />
          <Route path="/timeManager" element={<TimeManager />} />
          <Route path="/absenceManagePage/absenceSum" element={<AbsenceSum />} />
          <Route path="/absenceManagePage/absenceSelect" element={<AbsenceSelect />} />
          <Route path="/absenceManagePage/absenceEditEmp" element={<AbsenceEditEmp />} />
          <Route path="/absenceManagePage" element={<AbsenceManagePage />} />
          <Route path="/leaveFormEmPage" element={<LeaveFormEmPage />} />
          <Route path="/leaveFormMgPage" element={<LeaveFormMgPage />} />
          <Route path="/shiftManagementPage" element={<ShiftManagementPage />} />
          <Route path="/shiftManagementPage/addShiftPage" element={<AddShiftPage />} />
          <Route path="/shiftManagementPage/addShiftDetailPage" element={<AddShiftDetailPage />} />
          <Route path="/schedule" element={<ScheduleForm />} />
          
          {/* Name and fa */}
          <Route path='/FcView' element={<FCviews />} />
          <Route path="/FcView/send/:absenceID" element={<SendToManager />} />
          <Route path='/ManagerView' element={<ManagerView />} />
          <Route path='/ManagerView/sendFC/:absenceID' element={<ManagerView />} />
          <Route path='/FcView/UpdateStatusFC/:absenceID' element={<UpdateStatusFC />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
