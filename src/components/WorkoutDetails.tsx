import { useWorkoutContext } from "../context/workoutContext"
import {format} from "date-fns"
interface Workout {
    _id:string,
    title:string,
    load:number,
    reps:number,
    createdAt:string
}
interface Props {
    workout:Workout
}

const  WorkoutDetails: React.FC<Props> = ({workout})=> {
    const {deleteWorkout} = useWorkoutContext();

    const handleDelete = async () =>{
        const response = await fetch('http://localhost:4000/api/workouts/' +workout._id,{
            method:"DELETE"
        });
        if (response.ok) {
            deleteWorkout(workout)
        }
    
    }

    return (
           <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg):</strong>{workout.load}</p>
            <p><strong>Reps :</strong> {workout.load}</p>
            <p>{format(new Date(workout.createdAt),"dd-MM-yy HH:MM")}</p>
            <span onClick={handleDelete}>delete</span>
           </div>
    )
}

export default WorkoutDetails


