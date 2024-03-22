import { Link,useMatch,useResolvedPath } from "react-router-dom"
import "./stylesNavbarAdmin.css"

export default function NavbarAdmin() {

    return ( <nav className = "nav" >
            <h4 className="site-title" >
                Project SE
            </h4>
            <ul>
                <CustomLink to="/homeadmin">Home Admin</CustomLink>
                <CustomLink to="/signup">Sign up</CustomLink>
                <CustomLink to="/">Log out</CustomLink>
            </ul>
        </nav>
    )
}

function CustomLink({to, children , ...props}){
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path : resolvedPath.pathname, end: true })
    return (
        <li className={ isActive ? "active" : "" }>
            <Link to={to} {...props}> 
                {children} 
            </Link>
        </li>
    )
}