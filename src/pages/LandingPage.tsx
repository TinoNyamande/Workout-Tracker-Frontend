import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (isLoggedIn && navigate) {
            navigate("/dashboard")
        } else if(!isLoggedIn&&navigate) {
            navigate("/login")
        }
    }, [isLoggedIn,navigate])
    return (
        <></>
    )
}

