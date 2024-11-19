import { useState, useEffect } from "react";
import Note from "./Note.jsx";
import NotesForm from "./NotesForm.jsx";
import noteService from "./services/notes.js";

const App = () => {
    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState("");

    const addNote = (e) => {
        e.preventDefault();
        const noteObject = {
            content: note,
            important: Math.random() < 0.5,
        };
        noteService
            .create(noteObject)
            .then((returnedNote) => {
                setNotes([...notes, returnedNote]);
            });
        setNote("");
    };

    const toggleImportance = (id) => {
        const note = notes.filter((note) => note.id === id);
        const changedNote = { ...note, important: !note.important };
        noteService
            .update(id, changedNote)
            .then(returnedNotes => {
                setNotes(
                    notes.map((note) => (note.id === id ? returnedNotes : note))
                );
            })
            .catch(error => {
                alert(
                    `the note '${note.content}' was already deleted from server`
                )
                setNotes(notes.filter(note => note.id !== id))
            })
    };

    useEffect(() => {
        noteService
            .getAll()
            .then(initialNotes => {
                setNotes(initialNotes);
            });
    }, []);

    return (
        <div>
            <h1>Notes</h1>
            <ul>
                {notes.map((note) => (
                    <Note
                        key={note.id}
                        note={note}
                        toggleImportance={() => toggleImportance(note.id)}
                    />
                ))}
            </ul>
            <NotesForm addNote={addNote} note={note} setNote={setNote} />
        </div>
    );
};

export default App;
