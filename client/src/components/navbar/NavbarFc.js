import { Link, useMatch } from "react-router-dom"
import "./stylesNavbarFc.css"
import logo from '../img/login-image.png';
export default function NavbarAdmin({ handleLogout }) {

    return (<nav className="nav" >
        <h3 className="site-title" >
        <img className='d-flex rounded ' src={logo} alt="Logo" width={75} height={75} />
        </h3>
        <h4 className="site-title-b2" >
            Fc
        </h4>

        <ul>
            <CustomLink to="/FcView">ดูคำร้องที่ส่งมา</CustomLink>
            <CustomLink to="/FcCheck">ดูคำร้องที่ตอบกลับ</CustomLink>
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