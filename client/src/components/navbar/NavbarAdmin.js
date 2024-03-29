import { Link, useMatch, useResolvedPath } from "react-router-dom"
import "./stylesNavbarAdmin.css"

export default function NavbarAdmin({ handleLogout }) {

    return (<nav className="nav" >
        <h3 className="site-title" >
            Project SE
        </h3>
        <h4 className="site-title-b2 " >
            Admin
        </h4>

        <ul>
            <CustomLink to="/homeAdmin">Home Admin</CustomLink>
            <CustomLink to="/signup">Sign up</CustomLink>
            {/* <CustomLink to="/FcView"></CustomLink> */}
            <CustomLink to="/" onClick={handleLogout}>Log out</CustomLink>
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