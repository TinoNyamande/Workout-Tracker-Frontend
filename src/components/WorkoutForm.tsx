import { useState } from "react"

const WorkoutForm = () =>{
  const [title,setTitle] = useState("");
  const [load,setLoad] = useState("");
  const [reps,setReps] = useState("");
  const [error,setError] = useState("");
  const [emptyFields ,setEmptyFields] = useState<string[]>([])



  const onSubmit =async (e:any) =>{
     e.preventDefault();
     setError("")
     const workout = {title,load,reps};
     const response =await  fetch('http://localhost:4000/api/workouts',{
        method:"POST",
        body:JSON.stringify(workout),
        headers:{
            'Content-Type' :'application/json'
        }
     })
     const json = await response.json()
     if (!response.ok) {
        setEmptyFields(json.emptyFields)
        setError(json.error)
     }
     if (response.ok) {
        setError("");
        setTitle("")
        setLoad("")
        setReps("")
        setEmptyFields([])

     }
  }

  return (
    <form className="create">
        <h3>Add a new workout</h3>
        <label>Exersice Title</label>
        <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} 
        className={emptyFields.includes("title")?"error" :""} />
        <label>Load</label>
        <input type="number" value={load} onChange={(e)=>setLoad(e.target.value)}
        className={emptyFields.includes("load")?"error" :""}  />
        <label>Reps</label>
        <input type="number" value={reps} onChange={(e)=>setReps(e.target.value)} 
        className={emptyFields.includes("reps")?"error" :""} />
        <button onClick={onSubmit}>Add Workout</button>
        {error && <div className="error">{error}</div>}
    </form>
  )

}

export default WorkoutForm