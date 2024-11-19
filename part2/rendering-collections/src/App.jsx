import { useState, useEffect } from "react";
import axios from "axios";
import Note from "./Note.jsx";
import NotesForm from "./NotesForm.jsx";

const App = () => {
    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState("");

    const addNote = (e) => {
        e.preventDefault();
        const noteObject = {
            content: note,
            important: Math.random() < 0.5,
        };
        axios
            .post("http://localhost:3001/notes", noteObject)
            .then((response) => {
                console.log(response.data);
                setNotes([...notes, response.data]);
            });
        setNote("");
    };

    const toggleImportance = (id) => {
        const url = `http://localhost:3001/notes/${id}`;
        const note = notes.filter(note => note.id === id);
        const nextNote = {...note, important: !note.important};
        axios
            .put(url, nextNote)
            .then(response => {
                setNotes(notes.map(note => note.id === id ? response.data : note))
            })
    };

    useEffect(() => {
        axios.get("http://localhost:3001/notes").then((response) => {
            setNotes(response.data);
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
            <NotesForm addNote={addNote} note={note} setNote={setNote}/>
        </div>
    );
};

export default App;
