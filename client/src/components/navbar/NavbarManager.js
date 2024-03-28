import { DropdownButton, Dropdown } from "react-bootstrap";
import { Link, useMatch, useResolvedPath } from "react-router-dom"
import "./stylesNavbarManager.css"

export default function NavbarAdmin() {

    const handleLogout = () => {
        // setUser(null);
        localStorage.removeItem('user'); // เมื่อออกจากระบบลบข้อมูลผู้ใช้ออกจาก localStorage
      };

    return (
        <nav className="nav" >
            <h3 className="site-title  p-2" >
                Project SE
            </h3>
            
            <h4 className="site-title-b2" >
                <CustomLink to="/">Manager</CustomLink>
            </h4>

            <ul className="p-3 mt-1 mp-1" >

                <DropdownButton id="split-button-dropdown " title="Schedule" className="" >
                    <Dropdown.Item eventKey="1"><CustomLink to="/">Manage Time</CustomLink></Dropdown.Item>
                    <Dropdown.Item eventKey="2"><CustomLink to="/">Add Schedule</CustomLink></Dropdown.Item>
                </DropdownButton>


                <DropdownButton id="split-button-dropdown " title="Approve Leave" className="" >
                    <Dropdown.Item eventKey="3"><CustomLink to="/">Leave ( ลา - ทำไงต่อ ) </CustomLink></Dropdown.Item>
                </DropdownButton>


                <DropdownButton id="split-button-dropdown " title="Contact" className="" >
                    <Dropdown.Item eventKey="4"><CustomLink to="/">Contact to Fc </CustomLink></Dropdown.Item>
                </DropdownButton>

                {/* Edit */}
                <CustomLink to="/ManagerEditSchedule">Edit Schedule</CustomLink>
                
                {/* home manager */}
                <CustomLink to="/ManagerEditSchedule">Home</CustomLink>

                {/* Contact */}
                <CustomLink to="/" >Log out</CustomLink>



            </ul>

        </nav>
    )
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}


// import { DropdownButton, Dropdown } from "react-bootstrap";

// const SplitButtonDropdown = () => {
//   return (
//     <DropdownButton id="split-button-dropdown" title="Dropdown Title">
//       <Dropdown.Item eventKey="1">Dropdown Item 1</Dropdown.Item>
//       <Dropdown.Item eventKey="2">Dropdown Item 2</Dropdown.Item>
//       <Dropdown.Item eventKey="3">Dropdown Item 3</Dropdown.Item>
//       <Dropdown.Divider />
//       <Dropdown.Item eventKey="4">Dropdown Item 4</Dropdown.Item>
//     </DropdownButton>
//   );
// };

// export default SplitButtonDropdown;
