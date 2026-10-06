import React, { useState } from 'react';
import '../Pages/Home.css';

const STORAGE_KEY = 'customExercises';

function loadExercises() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
        return [];
    }
}

function CreateExercise() {
    const [exerciseName, setExerciseName] = useState('');
    const [type, setType] = useState('WeightBased');
    const [notes, setNotes] = useState('');
    const [exercises, setExercises] = useState(loadExercises);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!exerciseName.trim()) {
            return;
        }

        const newExercise = {
            exerciseID: Date.now().toString(),
            exerciseName: exerciseName.trim(),
            type,
            notes,
        };
        const updated = [...exercises, newExercise];
        setExercises(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

        setExerciseName('');
        setType('WeightBased');
        setNotes('');
    };

    return (
        <div className="auth-root">
            <h2>Create Exercise</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="exerciseName">Exercise Name:</label>
                    <input
                        type="text"
                        id="exerciseName"
                        value={exerciseName}
                        onChange={(e) => setExerciseName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="type">Type:</label>
                    <select
                        id="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="WeightBased">Weight Based</option>
                        <option value="TimeBased">Time Based</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="notes">Notes:</label>
                    <textarea
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>
                <button type="submit">Create Exercise</button>
            </form>

            <h3>Your Exercises</h3>
            {exercises.length === 0 ? (
                <p>No exercises yet.</p>
            ) : (
                <ul>
                    {exercises.map((exercise) => (
                        <li key={exercise.exerciseID}>
                            <strong>{exercise.exerciseName}</strong> ({exercise.type})
                            {exercise.notes && <p>{exercise.notes}</p>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CreateExercise;
