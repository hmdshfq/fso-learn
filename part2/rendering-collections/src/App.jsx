import { useState, useEffect } from "react";
import Note from "./Note.jsx";
import NotesForm from "./NotesForm.jsx";
import Notification from "./Notification.jsx";
import noteService from "./services/notes.js";

const Footer = () => {
    const footerStyle = {
        color: "green",
        fontStyle: "italic",
        fontSize: 16,
    };
    return (
        <div style={footerStyle}>
            <br />
            <em>
                Note app, Department of Computer Science, University of Helsinki
                2024
            </em>
        </div>
    );
};

const App = () => {
    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const addNote = (e) => {
        e.preventDefault();
        const noteObject = {
            content: note,
            important: Math.random() < 0.5,
        };
        noteService.create(noteObject).then((returnedNote) => {
            setNotes([...notes, returnedNote]);
        });
        setNote("");
    };

    const toggleImportance = (id) => {
        const note = notes.find((note) => note.id === id);
        const changedNote = { ...note, important: !note.important };
        
        noteService
            .update(id, changedNote)
            .then((returnedNotes) => {
                setNotes(
                    notes.map((note) => (note.id === id ? returnedNotes : note))
                );
            })
            .catch(() => {
                setErrorMessage(
                    `Note '${note.content}' was already removed from server`
                );
                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000);
                setNotes(notes.filter((note) => note.id !== id));
            });
    };

    useEffect(() => {
        noteService.getAll().then((initialNotes) => {
            setNotes(initialNotes);
        });
    }, []);

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />
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
            <Footer />
        </div>
    );
};

export default App;
