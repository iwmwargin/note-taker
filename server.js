const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
var notes = require("./Develop/db/db.json");

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());
app.use(express.static("public"));


// starting the index html
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"))
});
// linking the notes page
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
});

// Calling in all posted notes
app.get('/api/notes', (req, res) => {
    
    res.json(notes);
});

// Posting new notes
app.post("/api/notes", (req, res) => {
    let newNote = req.body;
    notes.push(newNote);
    // adds id number to each note
    let num = 1
    notes.forEach((note) => {
        note.id = num;
        num++;
        return notes;
    })
    fs.writeFileSync("./Develop/db/db.json", JSON.stringify(notes));
    res.json(newNote);
});

// Deleting notes
app.delete("/api/notes/:id", (req, res) => {

})

app.listen(PORT, e => console.log("Running"))
