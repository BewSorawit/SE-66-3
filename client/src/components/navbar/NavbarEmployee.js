import React from "react";
import { Link } from "react-router-dom";
import "./stylesNavbarEmployee.css";
import { useMatch } from "react-router-dom";

export default function NavbarEmployee({ handleLogout }) {
    return (
        <nav className="nav">
            <h3 className="site-title">Project SE</h3>
            <Link to="/homeEmployee" className="nav-link"> {/* Link to home page */}
                <h4 className="site-title-b2">Employee</h4> {/* Make the h4 element a link */}
            </Link>
            <ul>
                <CustomLink to="/employeeShift">Schedule</CustomLink>
                <CustomLink to="/leaveFormEmPage">Leave</CustomLink>
                <CustomLink to="/" onClick={handleLogout}>Log out</CustomLink>
            
            </ul>
        </nav>
    );
}

function CustomLink({ to, children, ...props }) {
    const isActive = useMatch(to);
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    );
}
