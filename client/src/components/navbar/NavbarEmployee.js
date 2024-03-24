import React from "react";
import { Link } from "react-router-dom";
import "./stylesNavbarEmployee.css";

export default function NavbarEmployee() {
    return (
        <nav className="nav">
            <h3 className="site-title">Project SE</h3>
            <Link to="/homeemployee" className="nav-link"> {/* Link to home page */}
                <h4 className="site-title-b2">Employee</h4> {/* Make the h4 element a link */}
            </Link>
            <ul>
                <li>
                    <Link to="/employeeShift">Schedule</Link>
                </li>
                <li>
                    <Link to="">Leave</Link>
                </li>
                <li>
                    <Link to="/">Log out</Link>
                </li>
            </ul>
        </nav>
    );
}
