import { Link, useMatch } from "react-router-dom"
import { DropdownButton, Dropdown } from "react-bootstrap";
import "./stylesNavbarManager.css"
import logo from '../img/login-image.png';
export default function NavbarAdmin({ handleLogout }) {

    return (
        <nav className="nav" >
            <h3 className="site-title" >
            <img className='d-flex rounded ' src={logo} alt="Logo" width={75} height={75} />
            </h3>

            <Link to="/homeManager" className="nav-link"> {/* Link to home page */}
                <h4 className="site-title-b2">Manager</h4> {/* Make the h4 element a link */}
            </Link>

            <ul>
                <DropdownButton id="split-button-dropdown " title="Schedule Management" className="" >
                    <Dropdown.Item eventKey="1"><CustomLink to="/timeManager">Manage Time</CustomLink></Dropdown.Item>
                    <Dropdown.Item eventKey="2"><CustomLink to="/shiftManagementPage">Add Schedule</CustomLink></Dropdown.Item>
                </DropdownButton>


                <DropdownButton id="split-button-dropdown " title="Leave Management" className="" >
                    <Dropdown.Item eventKey="3"><CustomLink to="/leaveFormMgPage">แจ้งการลา</CustomLink></Dropdown.Item>
                    <Dropdown.Item eventKey="4"><CustomLink to="/absenceManagePage">จัดการการลาของพนักงาน</CustomLink></Dropdown.Item>
                </DropdownButton>

                <CustomLink to="/ManagerView">จัดการคำร้องจากนอกสาขา</CustomLink>
                <CustomLink to="/employeeShift">Schedule</CustomLink>
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