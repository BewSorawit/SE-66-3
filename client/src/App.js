import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

import Login from './components/Login';
import Signup from './components/Signup';
import HomeAdmin from './components/HomeAdmin';

import Shift from './components/Shift';
import ScheduleForm from './components/ScheduleForm';

// import FCviews from './components/FCviews';
// import SendToManager from './components/SendToManager';
// import ManagerView from './components/ManagerView';
// import UpdateStatusFC from './components/UpdateStatusFC';

import HomeFc from './components/HomeFc';
import HomeManager from './components/HomeManager';
import HomeEmployee from './components/HomeEmployee';

import NavbarAdmin from './components/navbar/NavbarAdmin';
import NavbarEmployee from './components/navbar/NavbarEmployee';
import NavbarManager from './components/navbar/NavbarManager';
import NavbarFc from './components/navbar/NavbarFc';

const AppLayoutAdmin = () => (
  <>
    <NavbarAdmin />
    <Outlet />
  </>
);

const AppLayoutEmployee = () => (
  <>
    <NavbarEmployee />
    <Outlet />
  </>
);

const AppLayoutManager = () => (
  <>
    <NavbarManager />
    <Outlet />
  </>
);

const AppLayoutFc = () => (
  <>
    <NavbarFc />
    <Outlet />
  </>
);

// const AppLayoutChiefShift = () => (
//   <>
//     <NavbarAdmin />
//     <Outlet />
//   </>
// );

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        <Route >

          {/* Admin Routes  Route can retack by switch but i don't know why  */}
          <Route element={<AppLayoutAdmin />}>
            <Route path="/homeadmin" element={<HomeAdmin />} />
            <Route path="/signup" element={<Signup />} />
          </Route>


          <Route element={<AppLayoutEmployee />} >
            <Route path="/homeemployee" element={<HomeEmployee />} />
          </Route>

          <Route element={<AppLayoutManager />} >
            <Route path="/homemanager" element={<HomeManager />} />
          </Route>
          
          <Route element={<AppLayoutFc />} >
            <Route path="/homefc" element={<HomeFc />} />
          </Route>


          {/* Bew and Focus Routes */}
          <Route>
            <Route path="/shift" element={<Shift />} />
            <Route path="/shift" element={<Shift />} />
            <Route path="/schedule" element={<ScheduleForm />} />
            <Route path="/schedule" element={<ScheduleForm />} />
          </Route>

          {/* Name and fa */}
          {/* <Route>
            <Route path='/FcView' element={<FCviews />}></Route>
            <Route path="/FcView/send/:absenceID" element={<SendToManager />}></Route>
            <Route path='/ManagerView' element={<ManagerView />}></Route>
            <Route path='/ManagerView/sendFC/:absenceID' element={<ManagerView />}></Route>
            <Route path='/FcView/UpdateStatusFC/:absenceID' element={<UpdateStatusFC />}></Route>
          </Route> */}


        </Route>

      </Routes>
    </Router>
  );
};

export default App;
