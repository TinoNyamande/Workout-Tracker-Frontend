import WorkoutDetails from "./../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"
import { Suspense, useEffect } from "react"
import Loading from "../components/Loading"
import { useWorkoutContext } from "../context/workoutContext"
import { useAuth } from "../context/authContext"
import { useNavigate } from "react-router-dom"



export default function Home() {
    const { state } = useWorkoutContext();
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    if (!isLoggedIn) {
        navigate("/login")
     }
  
    return (
        <div className="home">
            <div className="workouts">
                {state.workouts && state.workouts.map((workout) => (
                    <Suspense key={workout._id} fallback={<Loading />}>
                        <WorkoutDetails workout={workout} />
                    </Suspense>
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}