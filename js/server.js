// required packages & librarys
const express = require('express');
const path = require('path');
const fs = require('fs');

//set up the application and port
const app = express();
const PORT = process.env.PORT || '3000';
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//declare variables to use throughout app
const public = path.join(__dirname, "/public");
const db = path.join(__dirname, "./db/db.json");
var storedNote = JSON.parse(fs.readFileSync(db, "utf8"));

//set up routes
//all routes
app.get("*", function(req, res) {
  res.sendFile(path.join(public, "index.html"));
});
app.get("/", function(req, res) {
  res.sendFile(path.join(public, "index.html"));
});

//note route
app.get("/notes", function(req, res) {
    res.sendFile(path.join(public, "notes.html"));
});

//api note route
//getting all notes
app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(db));
});
//getting note by id
app.get("/api/notes/:id", function(req, res) {
    res.json(storedNote[Number(req.params.id)]);
});
//posting to the api note route
app.post("/api/notes", function(req, res) {
    let note = req.body;
    let newNoteID = (storedNote.length).toString();
    note.id = newNoteID;
    storedNote.push(note);

    fs.writeFileSync(db, JSON.stringify(storedNote));
    console.log("Note saved to db.json. Content: ", note);
    res.json(storedNote);
})

//delete note function


// Starts our server
app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});