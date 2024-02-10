import { WorkoutContext } from "../context/workoutContext";
import { useContext } from "react";

export const useWorkoutContext = () =>{
    const context = useContext(WorkoutContext);
    if (!context) {
        throw Error("outside context provider")
    }

    return context;
}