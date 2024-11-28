const express = require('express')
const PORT = 3001;
const app = express();
// Middleware to parse the body of the request
app.use(express.json());

let notes = [
    {
        id: "1",
        content: "HTML is easy",
        important: true,
    },
    {
        id: "2",
        content: "Browser can execute only JavaScript",
        important: false,
    },
    {
        id: "3",
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true,
    },
];

app.get('/', (req, res) => {
    res.send('<h1>Hello world!</h1>');
})

app.get('/api/notes', (req, res) => {
    res.json(notes);
})

app.get('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    const note = notes.find(note => note.id === id)
    if (note) {
        res.json(note);
    } else {
        res.status(404).end();
    }
})

app.delete('/api/notes/:id', (req, res)=>{
    const id = req.params.id;
    notes = notes.filter(note => note.id !== id);

    res.status(204).end();
})

app.post('/api/notes', (req, res) => {
    const body = req.body;

    const generateId = () => {
        const maxId = notes.length > 0 ? Math.max(...notes.map(note => note.id)) : 0;
        return String(maxId + 1);
    };

    if (!body.content) {
        return res.send(400).json({
            error: "content missing"
        })
    }

    const note = {
        content: body.content,
        important: Boolean(body.important) || false,
        id: generateId(),
    }

    notes = [...notes, note];
    console.log({notes});
    
    res.json(note);
})

app.listen(PORT);
console.log(`Server is running at port ${PORT}`);
