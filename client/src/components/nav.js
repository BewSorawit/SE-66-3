import React, { useState , useEffect } from 'react';
import './Nav.css';
// import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'

function Nav() {
    
    return (

        <nav class="navbar navbar-expand-sm navbar-dark bg-primary">
        <div class="container-fluid">
            
            <a href="#" class="navbar-brand">We Healthy</a>
            <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarToggle">
                <span class="navbar-toggler-icon"></span>
            </button>
             
             <div class="collapse navbar-collapse" id="navbarToggle">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a href="" class="nav-link">Register User</a></li>
                    {/* <li class="nav-item"><a href="page_exe.html" class="nav-link">Exercise</a></li> */}
                    {/* <li class="nav-item"><a href="index com.html" class="nav-link">Community</a></li> */}
                    {/* <li class="nav-item"><a href="login.html" class="nav-link">Login</a></li> */}
                    {/* <li class="nav-item"><a href="index cal.html" class="nav-link">Cal</a></li> */}
                    {/* <li class="nav-item"><a href="index.html" class="nav-link">Home</a></li> */}
                    
                </ul>
            </div>
            
            <div class="features-icons-icon1">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                    <path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
                    <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
                  </svg>
            </div>
  
           
        </div>
    </nav>
    )
}

export default Nav 