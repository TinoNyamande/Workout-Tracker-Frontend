import { Link } from "react-router-dom"
import { useAuth } from "../context/authContext"
export default function Navbar() {
    const {isLoggedIn,logout} = useAuth();
    
    return (
        <div className="header">
            <div className="left-section">
                <Link className="header-link" to="/">
                    Home
                </Link>
            </div>
            <div className="right-section">
                {!isLoggedIn &&  <Link className="header-link" to="/login">
                    Login
                </Link>}
               {!isLoggedIn &&<Link className="header-link" to="/signup">
                    Sign up
                </Link> }
                {isLoggedIn && <Link className="header-link" to="/">Profile</Link>}
                {isLoggedIn && <Link onClick={()=>logout()} className="header-link" to="/">Logout</Link>}
                
            </div>
        </div>
    )
}