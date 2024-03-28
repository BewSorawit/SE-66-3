import { Link, useMatch } from "react-router-dom"
import "./stylesNavbarManager.css"

export default function NavbarAdmin({ handleLogout }) {

    return (
        <nav className="nav" >
            <h3 className="site-title" >
                Project SE
            </h3>
            <h4 className="site-title-b2" >
                Manager
            </h4>

            <ul>
                <li>
                    <Link to="/employeeShift">Schedule</Link>
                </li>

                <CustomLink to="/ManagerView">Manage Time</CustomLink>
                <CustomLink to="#">Add Schedule</CustomLink>
                <CustomLink to="#">Leave ( ลา ) </CustomLink>
                <CustomLink to="#">Contact to Fc </CustomLink>
                <CustomLink to="/" onClick={handleLogout}>Log out</CustomLink>
            </ul>

        </nav>
    )
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