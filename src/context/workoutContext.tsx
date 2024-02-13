import React, { PropsWithChildren, createContext, useContext, useEffect, useReducer } from "react";
import Cookies from "js-cookie"

interface WorkoutObject {
    _id:string,
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
    | { type: "LOAD_WORKOUTS", value: WorkoutObject[] }
    |{type:"DELETE_WORKOUTS" ,value:WorkoutObject};

const workoutsReducerFunction = (state: WorkoutState, action: WorkoutReducerAction) => {
    switch (action.type) {
        case "CREATE_WORKOUT": {
            return { ...state, workouts: [...state.workouts, action.value] };
        }
        case "LOAD_WORKOUTS": {
            return { ...state, workouts: action.value };
        }
        case "DELETE_WORKOUTS" : {
              return {...state,workouts:[...state.workouts.filter((w)=>w._id !== action.value._id)]}
        }
        default:
            return state;
    }
}

const WorkoutContext = createContext<{
    state: WorkoutState;
    deleteWorkout:(workout:WorkoutObject)=>void;
    addWorkout: (workout: WorkoutObject) => void;
}>({
    state: { workouts: [] },
    addWorkout: () => {},
    deleteWorkout:()=>{}
});

export const useWorkoutContext = () => useContext(WorkoutContext);


export const WorkoutContextProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const [state, dispatch] = useReducer(workoutsReducerFunction, { workouts: [] });

    useEffect(() => {
        const getData = async () => {
            const response = await fetch('http://localhost:4000/api/workouts',{headers:{"Authorization":Cookies.get("token")}});
            const json = await response.json();
            dispatch({ type: "LOAD_WORKOUTS", value: json });
        }
        getData();
    }, []);

    const addWorkout = (newWorkout: WorkoutObject) => {
        dispatch({ type: "CREATE_WORKOUT", value: newWorkout });
    };
    const deleteWorkout = (deleteWorkout:WorkoutObject) =>{
        dispatch({type:"DELETE_WORKOUTS" ,value:deleteWorkout});
    };
   
    return (
        <WorkoutContext.Provider value={{ state, addWorkout, deleteWorkout }}>
            {children}
        </WorkoutContext.Provider>
    );
}
