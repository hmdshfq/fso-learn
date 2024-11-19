import { useState, useEffect } from 'react';
import axios from 'axios';
import Note from './Note.jsx';


const App = () => {
    const [notes, setNotes] = useState([]);
    useEffect(()=>{
        axios
            .get('http://localhost:3001/notes')
            .then(response=>{
                console.log('Promise fulfilled');
                setNotes(response.data)
            });
    }, []);
    return (
        <div>
            <h1>Notes</h1>
            <ul>
                {notes.map( note => <Note key={note.id} note={note} />)}
            </ul>
        </div>
    );
};

export default App;
