
import { createContext, useReducer } from "react";
import { ReactNode } from "react";

interface Workout {
    title: string,
    _id: string,
    load: number,
    reps: number,
    createdAt: string
}

// interface WorkoutContextData {
//     state: { workouts: Workout[] | null },
//     dispatch: React.Dispatch<ReducerAction>
// }
interface WorkoutContextData {
    state: { workouts: Workout[] | null };
    dispatch: React.Dispatch<ReducerAction>;
}


interface WorkoutContextProviderProps {
    children: ReactNode;
}

interface ReducerAction {
    type: string,
    payload: any // Change 'any' to the specific type if known
}

export const WorkoutContext = createContext<WorkoutContextData>({
    state: { workouts: null },
    dispatch: () => {}
});

export const WorkoutContextProvider: React.FC<WorkoutContextProviderProps> = ({ children }) => {

    const workoutReducer = (state: { workouts: Workout[] | null }, action: ReducerAction) => {
        switch (action.type) {
            case 'SET_WORKOUT':
                console.log("Setting workout");
                debugger
                return {
                    
                    workouts: action.payload
                };
            case 'CREATE_WORKOUT':
                return {
                    workouts: action.payload ? [action.payload, ...(state.workouts || [])] : state.workouts
                };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(workoutReducer, { workouts: null });

    return (
        <WorkoutContext.Provider value={{ state, dispatch }}>
            {children}
        </WorkoutContext.Provider>
    );
};
