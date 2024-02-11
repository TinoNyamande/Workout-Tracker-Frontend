import WorkoutDetails from "./../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"
import { Suspense } from "react"
import Loading from "../components/Loading"
import { useWorkoutContext } from "../context/workoutContext"



export default function Home() {
     const {state}= useWorkoutContext();


    return (
        <div className="home">
            <div className="workouts">
                {state.workouts && state.workouts.map((workout) => (
                    <Suspense key={workout._id} fallback={<Loading/>}>
                        <WorkoutDetails  workout={workout} />
                    </Suspense>
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}