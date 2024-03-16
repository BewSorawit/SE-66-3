import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route
import Shift from './components/Shift'; // Import Shift component
import ScheduleForm from './components/ScheduleForm'; // Import ScheduleForm component

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/shift" element={<Shift />} /> {/* Define Route for Shift component */}
        <Route path="/schedule" element={<ScheduleForm />} /> {/* Define Route for ScheduleForm component */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
