import { Link, useMatch, useResolvedPath } from "react-router-dom"
import "./stylesNavbarFc.css"

export default function NavbarAdmin() {

    const handleLogout = () => {
        // setUser(null);
        localStorage.removeItem('user'); // เมื่อออกจากระบบลบข้อมูลผู้ใช้ออกจาก localStorage
      };

    return (<nav className="nav" >
        <h3 className="site-title" >
            Project SE
        </h3>
        <h4 className="site-title-b2" >
            Fc
        </h4>

        <ul className="p-3 mt-1 mp-1" >
            <CustomLink to="/FcView">ดูคำร้องที่ส่งมา</CustomLink>
            <CustomLink to="/">ดูคำร้องที่ตอบกลับ</CustomLink>
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



//  <DropdownButton id="split-button-dropdown " title="Schedule" className="" >
//     <Dropdown.Item eventKey="1"><CustomLink to="/">Manage Time</CustomLink></Dropdown.Item>
//     <Dropdown.Item eventKey="2"><CustomLink to="/">Add Schedule</CustomLink></Dropdown.Item>
// </DropdownButton> 