import {Link} from "react-router-dom"
export default function Navbar() {
    return (
        <div className="header">
            <div className="header-container">
                <Link className="header-link" to="/">
                    <h3>Home</h3>
                </Link>
            </div>
        </div>
    )
}