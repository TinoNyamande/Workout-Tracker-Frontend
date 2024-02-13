import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import LandingPage from "./pages/LandingPage"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
function App() {

  return (
    <div className="App">
       <BrowserRouter>
      <Navbar/>
        <div className="pages">
          <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/dashboard"  element={<Home/>}/>
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Register/>} />
          </Routes>
        </div>
      </BrowserRouter> 
      
    </div>
  )
}

export default App
