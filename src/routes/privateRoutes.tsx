import {lazy} from "react"
import {Navigate} from "react-router-dom"
import Layout from "./Layout";

const Home = lazy(()=>import("./../pages/Home"))

export default function PrivateRoutes () {
    const isLoggedIn = true; // Replace with your authentication logic

    // If user is not authenticated, redirect to login page
    if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    }
    return {
        element: <Layout/>,
        children: [
          { path: "/", element: <Home /> },
          { path: "*", element: <Navigate to="/dashboard" replace /> },
        ],
      };
    
}