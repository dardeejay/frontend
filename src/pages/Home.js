import React from 'react'
import { useEffect } from 'react'
import { useWorkoutContext } from '../hooks/useWorkoutContext'
// components
import WorkoutForm from '../components/WorkoutForm'
import WorkoutDetails from '../components/WorkoutDetails'
export default function Home() {
  const {workouts, dispatch} = useWorkoutContext()

  useEffect(()=>{
    const fetchWorkouts = async () => {
      const res = await fetch('https://workouts-api-dj.onrender.com//api/workouts')
      const data = await res.json()
      if(res.ok){
        dispatch({type: 'SET_WORKOUTS', payload: data})
      }
    }
    fetchWorkouts()
  },[])
  
  return (
    <div className='home'>
      <div className='workouts'>
        {workouts && workouts.map((workout) =>(
          <WorkoutDetails key={workout.id} workout={workout} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  )
}
