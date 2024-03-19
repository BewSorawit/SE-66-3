import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route
import Shift from './components/Shift'; // Import Shift component
import ScheduleForm from './components/ScheduleForm'; // Import ScheduleForm component
import ShiftManager from './components/shiftManager'; // Import ShiftManager component




const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/shift" element={<Shift />} /> {/* Define Route for Shift component */}
        <Route path="/schedule" element={<ScheduleForm />} /> {/* Define Route for ScheduleForm component */}
        <Route path="/shiftManager" element={<ShiftManager />} /> {/* Define Route for ShiftManager component */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
