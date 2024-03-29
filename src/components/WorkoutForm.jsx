import React from "react";
import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
export default function WorkoutForm() {
  const { dispatch } = useWorkoutContext();

  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = { title, load, reps };
    const res = await fetch(
      "https://workouts-api-dj.onrender.com/api/workouts",
      {
        method: "POST",
        body: JSON.stringify(workout),
        headers: { "Content-type": "application/json" },
      }
    );
    const json = await res.json();
    if (!res.ok) {
      setError(json.error);
    }
    if (res.ok) {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
      setStatus("Workout Added!");
      setTimeout(() => {
        setStatus("");
      }, 3000);
    }
  };
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Workout Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Load (kg):</label>
      <input
        type="number"
        value={load}
        onChange={(e) => setLoad(e.target.value)}
      />
      <label>Reps:</label>
      <input
        type="number"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
      />

      <button>Add a Workout</button>
      {error && <div className="error">{error}</div>}
      {status && <div className="status">{status}</div>}
    </form>
  );
}
