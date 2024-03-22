// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'antd/dist/reset.css'
import axios from 'axios';

import {BrowserRouter} from "react-router-dom"

// ตั้งค่า Axios base URL เพื่อให้สามารถเรียกใช้ API ของเซิร์ฟเวอร์ได้
axios.defaults.baseURL = 'http://localhost:3002'; // เปลี่ยนเป็น URL ของเซิร์ฟเวอร์ของคุณ

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
      <App />
    {/* </BrowserRouter> */}
  </React.StrictMode>
);
