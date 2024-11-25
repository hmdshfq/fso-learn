const http = require("http");
const PORT = 3001;

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

const app = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(notes));
});

app.listen(PORT);
console.log(`Server is running at port ${PORT}`);
