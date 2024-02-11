import { useEffect, useReducer } from "react";

interface WorkoutObject {
    title: string,
    load: number,
    reps: number,
    createdAt: string
}

interface WorkoutState {
    workouts: WorkoutObject[]
}

type WorkoutReducerAction =
    | { type: "CREATE_WORKOUT", value: WorkoutObject }
    | { type: "LOAD_WORKOUTS", value: WorkoutObject[] };

const workoutsReducerFunction = (state: WorkoutState, action: WorkoutReducerAction) => {
    switch (action.type) {
        case "CREATE_WORKOUT": {
            return { ...state, workouts: [...state.workouts, action.value] };
        }
        case "LOAD_WORKOUTS": {
            return { ...state, workouts: action.value };
        }
        default:
            return state;
    }
}

const Counter = () => {
    const [state, dispatch] = useReducer(workoutsReducerFunction, { workouts: [] });

    useEffect(() => {
        const getData = async () => {
            const response = await fetch('http://localhost:4000/api/workouts');
            const json = await response.json();
            dispatch({ type: "LOAD_WORKOUTS", value: json });
        }
        getData();
    }, []);

    const addWorkout = (newWorkout: WorkoutObject) => {
        dispatch({ type: "CREATE_WORKOUT", value: newWorkout });
    }

    return (
        <div>
            <h1>Workouts</h1>
            <button onClick={() => addWorkout({ title: "New Workout", load: 0, reps: 0, createdAt: new Date().toISOString() })}>Add Workout</button>
            <ul>
                {state.workouts.map((workout, index) => (
                    <li key={index}>{workout.title} - Load: {workout.load}, Reps: {workout.reps}</li>
                ))}
            </ul>
        </div>
    );
}

export default Counter;
