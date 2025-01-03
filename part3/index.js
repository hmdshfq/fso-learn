const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const cors = require("cors");
// Middleware to parse the body of the request
app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

const requestLogger = (request, response, next) => {
    console.log("Method: ", request.method);
    console.log("Path:   ", request.path);
    console.log("Body:   ", request.body);
    console.log("---");
    next();
};

app.use(requestLogger);

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

app.get("/", (request, response) => {
    response.send("<h1>Hello world!</h1>");
});

app.get("/api/notes", (request, response) => {
    response.json(notes);
});

app.get("/api/notes/:id", (request, response) => {
    const id = request.params.id;
    const note = notes.find((note) => note.id === id);
    if (note) {
        response.json(note);
    } else {
        response.status(404).end();
    }
});

app.delete("/api/notes/:id", (request, response) => {
    const id = request.params.id;
    notes = notes.filter((note) => note.id !== id);

    response.status(204).end();
});

app.post("/api/notes", (request, response) => {
    const body = request.body;

    const generateId = () => {
        const maxId = notes.length > 0 ? Math.max(...notes.map((note) => note.id)) : 0;
        return String(maxId + 1);
    };

    if (!body.content) {
        return response.send(400).json({
            error: "content missing",
        });
    }

    const note = {
        content: body.content,
        important: Boolean(body.important) || false,
        id: generateId(),
    };

    notes = [...notes, note];
    console.log({ notes });

    response.json(note);
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "Unknown endpoint" });
};

app.use(unknownEndpoint);

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
});