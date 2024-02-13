import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react"
import { Link, useNavigate} from "react-router-dom";
import Cookies from "js-cookie"
import { useAuth } from "../../context/authContext";

export default function Login() {
    const [inputs, setInputs] =
        useState<{ email: string, password: string }>
            ({ email: "", password: "" });
    const [error, setErrors] = useState<{ email: string, password: string }>({ email: "", password: "" });

     const {login} = useAuth();
     const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setErrors((prev)=>({...prev,email:""}))
        setErrors((prev)=>({...prev,password:""}))
        const name = e.target.name;
        const value = e.target.value;
        setInputs((prevInputs) => ({ ...prevInputs, [name]: value }))

    };
    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setErrors((prev)=>({...prev,email:""}))
        setErrors((prev)=>({...prev,password:""}))
        if (inputs.email == "" && inputs.password == "") {
            setErrors((prev) => ({ ...prev, email: "Email field cannot be empty" }))
            setErrors((prev) => ({ ...prev, password: "Password field cannot be empty" }))
            return

        }

        if (inputs.email == "") {
            setErrors((prev) => ({ ...prev, email: "Email field cannot be empty" }))
            return
        }
        if (inputs.password == "") {
            setErrors((prev) => ({ ...prev, password: "Password field cannot be empty" }))
            return
        }
        if(inputs.password.length<6) {
            setErrors((prev)=>({...prev,password:"Password must be at least 6 characters long"}))
            return 
        }
        const response = await fetch("http://localhost:4000/api/auth/login" ,{
            method:"POST",
            body:JSON.stringify(inputs),
            headers :{
                "Content-Type":"application/json"
            }
        });
        const json = await response.json();

        if(response.ok) {
            Cookies.set('token',json.token);
            login();
            navigate("/dashboard")
        }
        if(!response.ok) {
            console.log(json.errors);
        }

    }




    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-6">
                    <form className="form-container">
                        <div>
                            <div className="form-box">
                                <label>Email</label>
                                <input className="form-control" type="text" name="email" value={inputs.email} onChange={handleChange} />
                                {error.email &&
                                    <div className="error-box">
                                        <p>{error.email}</p>
                                    </div>}
                            </div>
                            <div className="form-box">
                                <label>Password</label>
                                <input className="form-control" type="password" name="password" value={inputs.password} onChange={handleChange} />
                                {error.password &&
                                <div className="error-box">
                                    <p>{error.password}</p>
                                </div>}
                            </div>
                           

                            <div>
                                <button className="form-control btn btn-primary" onClick={handleSubmit}>Login</button>

                            </div>
                            <div>
                                <p>Forgot password</p>
                            </div>
                            <div>
                                <p>Dont  have an account ? Click
                                    <Link to="/" > here </Link>

                                    to signup
                                </p>
                            </div>


                        </div>
                    </form>
                </div >
            </div >
        </div >

    )
}

