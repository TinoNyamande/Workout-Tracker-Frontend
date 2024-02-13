import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react"
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuth } from "../../context/authContext";



export default function Register() {


    const [inputs, setInputs] =
        useState<{ firstname: string, lastname: string, email: string, password: string }>
            ({ firstname: "", lastname: "", email: "", password: "" });


    const [confirmPassword, setConfirmPassword] = useState("");


    const [errors, setErrors] = useState<{ firstname: string, lastname: string, email: string, password: string, cpassword: string }>
        ({ firstname: "", lastname: "", email: "", password: "", cpassword: "" })
    const { login } = useAuth();

    const addErrorMessage = (errorComponent: string, errorMessage: string) => {
        setErrors((prev) => ({ ...prev, [errorComponent]: errorMessage }))
    }
    const removeErrorMessages = () => {
        setErrors((prev) => ({ ...prev, email: "" }))
        setErrors((prev) => ({ ...prev, password: "" }))
        setErrors((prev) => ({ ...prev, firstname: "" }))
        setErrors((prev) => ({ ...prev, lastname: "" }))
        setErrors((prev) => ({ ...prev, cpassword: "" }))

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs((prevInputs) => ({ ...prevInputs, [name]: value }))

    };
    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        removeErrorMessages();
        const res = await fetch("http://localhost:4000/api/auth/signup", {
            method: "POST",
            body: JSON.stringify(inputs),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const json = await res.json();
        if (res.ok) {
            Cookies.set("token", json.token)
            login();
        }
        if (!res.ok) {
            if (json.errors.email) {
                addErrorMessage("email", json.errors.email);
            }
            if (json.errors.firstname) {
                addErrorMessage("firstname", json.errors.firstname)
            }
            if (json.errors.lastname) {
                addErrorMessage("lastname", json.errors.lastname)
            }
            if (json.errors.password) {
                addErrorMessage("password", json.errors.password)
            }
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
                                <label>Firstname</label>
                                <input className="form-control" type="text" name="firstname" value={inputs.firstname} onChange={handleChange} />
                                {errors.firstname && <div className="error-box">
                                    <p>{errors.firstname}</p>
                                </div>}
                            </div>
                            <div className="form-box">
                                <label>Lastname</label>
                                <input className="form-control" type="text" name="lastname" value={inputs.lastname} onChange={handleChange} />
                                {errors.lastname && <div className="error-box">
                                    <p>{errors.lastname}</p>
                                </div>}
                            </div>
                            <div className="form-box">
                                <label>Email</label>
                                <input className="form-control" type="text" name="email" value={inputs.email} onChange={handleChange} />
                                {errors.email && <div className="error-box">
                                    <p>{errors.email}</p>
                                </div>}
                            </div>
                            <div className="form-box">
                                <label>Password</label>
                                <input className="form-control" type="password" name="password" value={inputs.password} onChange={handleChange} />
                                {errors.password && <div className="error-box">
                                    <p>{errors.password}</p>
                                </div>}
                            </div>
                            <div className="form-box">
                                <label>Confirm Password</label>
                                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                {errors.cpassword && <div className="error-box">
                                    <p>{errors.cpassword}</p>
                                </div>}
                            </div>
                            <div>
                                <button className="form-control btn btn-primary" onClick={handleSubmit}>Register</button>

                            </div>
                            <div >
                                <p>Already have an account ? Click
                                    <span>
                                        <Link to="/" > here </Link>
                                    </span>
                                    to login
                                </p>
                            </div>


                        </div>
                    </form>
                </div >
            </div >
        </div >

    )
}

