import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { WorkoutContextProvider } from './context/workoutContext.tsx'
import { Authprovider } from './context/authContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Authprovider>
      <WorkoutContextProvider>
        <App />
      </WorkoutContextProvider>
    </Authprovider>

  </React.StrictMode>,
)
