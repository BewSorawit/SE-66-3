import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import HomeAdmin from './components/HomeAdmin';
import EditUser from './components/EditUser';

import Shift from './components/Shift';
import FCviews from './components/FCviews';
import SendToManager from './components/SendToManager';
import ManagerView from './components/ManagerView';
import UpdateStatusFC from './components/UpdateStatusFC';

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
  const [user, setUser] = useState(null);

  const handleLogin = async (values) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, values);
      setUser(response.data);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleLogout = () => {
    // setUser(null);
    localStorage.removeItem('user'); // เมื่อออกจากระบบลบข้อมูลผู้ใช้ออกจาก localStorage
  };


  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUser={handleLogin} />} />


        <Route >
          {/* Admin Routes */}
          {user && user.roleID === "1" && (
            <Route element={<AppLayoutAdmin />}>
              
              <Route path="/homeAdmin" element={<HomeAdmin user={user} />} />
              <Route path="/signup" element={<Signup user={user} />} />
              <Route path="/adminShift" element={<Shift user={user} />} />
              <Route path="/EditUser/:id" element={<EditUser />} />
              
            </Route>
          )}

          {/* Employee Routes */}
          {user && user.roleID === "3" && (
            <Route element={<AppLayoutEmployee />} >
              <Route path="/homeemployee" element={<HomeEmployee user={user} />} />
              <Route path="/employeeShift" element={<Shift user={user} />} />
            </Route>
          )}

          {user && user.roleID === "2" && (
            <Route element={<AppLayoutManager />} >
              <Route path="/homemanager" element={<HomeManager />} />
              <Route path="/managerShift" element={<Shift user={user} />} />
            </Route>
          )}

          {user && user.roleID === "4" && (
            <Route element={<AppLayoutFc />} >

              <Route path="/homefc" element={<HomeFc />} />
              <Route path='/FcView' element={<FCviews />}></Route>
              <Route path="/FcView/send/:absenceID" element={<SendToManager />}></Route>
              <Route path='/FcView/UpdateStatusFC/:absenceID' element={<UpdateStatusFC />}></Route>
              {/* <Route path="/shift" element={<Shift />} /> */}

            </Route>
          )}


          {/* Name and fa */}
          <Route>

            <Route path='/ManagerView' element={<ManagerView />}></Route>
            <Route path='/ManagerView/sendFC/:absenceID' element={<ManagerView />}></Route>

          </Route>


            {/* Logout Route */}
          <Route path="/logout" element={<Logout handleLogout={handleLogout} />} />



          {/* Fallback Route */}
          <Route path="*" element={<Login setUser={handleLogin} />} />
        </Route>
      </Routes>
    </Router>
  );
};

const Logout = ({ handleLogout }) => {
  // เรียกใช้งาน handleLogout เมื่อ component ถูก render
  // ซึ่งจะทำให้ผู้ใช้ logout และกลับไปยังหน้า login โดยอัตโนมัติ
  handleLogout();
  return null;
};




export default App;
