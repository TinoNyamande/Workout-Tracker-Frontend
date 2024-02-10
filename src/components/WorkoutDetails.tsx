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

    const handleDelete = async () =>{
        const response = await fetch('http://localhost:4000/api/workouts/' +workout._id,{
            method:"DELETE"
        })
    
    }

    return (
           <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg):</strong>{workout.load}</p>
            <p><strong>Reps :</strong> {workout.load}</p>
            <p>{workout.createdAt}</p>
            <span onClick={handleDelete}>delete</span>
           </div>
    )
}

export default WorkoutDetails


