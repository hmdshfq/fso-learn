const mongoose = require("mongoose");

// Check if the password is provided
if (process.argv.length < 3) {
    console.log("give password as argument");
    process.exit(1);
}

// Encode the special characters in URL format for the password
const password = encodeURIComponent(process.argv[2]);

// Define the URL for the MongoDB
const url = `mongodb+srv://hmdshfq:${password}@fso-phonebook.fxrsg.mongodb.net/noteApp?retryWrites=true&w=majority&appName=fso-phonebook`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

// Define the schema for the note
const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
});

// Create a model for the note
const Note = mongoose.model("Note", noteSchema);

// Create a new note
const note = new Note({
    content: "HTML is easy",
    important: true,
});

// Save the newly created note
note.save().then((result) => {
    console.log("note saved!");
    mongoose.connection.close();
});

// Find all notes
Note.find({}).then((result) => {
    result.forEach((note) => {
        console.log(note);
    });
    mongoose.connection.close();
});