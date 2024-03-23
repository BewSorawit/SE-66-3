import { Link, useMatch, useResolvedPath } from "react-router-dom"
import "./stylesNavbarFc.css"

export default function NavbarAdmin() {

    return (<nav className="nav" >
        <h3 className="site-title" >
            Project SE
        </h3>
        <h4 className="site-title-b2" >
            Fc
        </h4>

        <ul>
            <CustomLink to="/">View ดูคำร้อง </CustomLink>
            <CustomLink to="/">Approve Leave</CustomLink>
            <CustomLink to="/">Log out</CustomLink>
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