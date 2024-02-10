import { useEffect,useState } from "react"
import WorkoutDetails from "./../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"
import { useWorkoutContext } from "../hooks/useWorkoutContext"
import { Suspense } from "react"
import Loading from "../components/Loading"

interface ReducerAction {
    type: string;
    payload: any; // Update with the appropriate payload type
}

export default function Home() {
     const [workouts, setWorkOuts] = useState<{_id:string,title:string,reps:number ,load:number,createdAt:string}[]>([])
    //const [workouts, dispatch] = useWorkoutContext();
    //const { state, dispatch } = useWorkoutContext();
    //const { workouts } = state;

    useEffect(() => {
        console.log(workouts)
        const fetchWorkout = async () => {
            const response = await fetch('http://localhost:4000/api/workouts')

            if (response.ok) {
                const json = await response.json();
                setWorkOuts(json)
               // dispatch({ type: 'SET_WORKOUTS', payload: json })
                debugger
                console.log(workouts)
            }
        }
        fetchWorkout();
    }, [])
    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <Suspense key={workout._id} fallback={<Loading/>}>
                        <WorkoutDetails  workout={workout} />
                    </Suspense>
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}