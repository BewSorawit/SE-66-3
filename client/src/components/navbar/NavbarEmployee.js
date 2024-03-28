import React from "react";
import { Link } from "react-router-dom";
import "./stylesNavbarEmployee.css";

export default function NavbarEmployee() {
    
    const handleLogout = () => {
        // setUser(null);
        localStorage.removeItem('user'); // เมื่อออกจากระบบลบข้อมูลผู้ใช้ออกจาก localStorage
      };
    
    return (
        <nav className="nav">
            <h3 className="site-title p-3 ">Project SE</h3>
            
            <Link to="/homeemployee" className="nav-link p-3 mt-1 mp-1 "> {/* Link to home page */}
                <h4 className="site-title-b2">Employee</h4> {/* Make the h4 element a link */}
            </Link>
            
            <ul className="p-3 mt-1 mp-1" >
                <li>
                    <Link to="/employeeShift">Schedule</Link>
                </li>
                <li>
                    <Link to="">Leave</Link>
                </li>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/" >Log out</Link>
                </li>
            </ul>
        </nav>
    );
}


// <DropdownButton id="split-button-dropdown " title="Schedule" className="" >
//     <Dropdown.Item eventKey="1"><CustomLink to="/">Manage Time</CustomLink></Dropdown.Item>
//     <Dropdown.Item eventKey="2"><CustomLink to="/">Add Schedule</CustomLink></Dropdown.Item>
// </DropdownButton>