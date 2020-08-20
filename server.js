// Dependencies
const path = require("path");
const express = require("express");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

// Data
const database = [];
// var dataFile = JSON.parse(path.join(__dirname,"/db/db.json"));
// $.getJSON('/db/db.json', function(data) {         
//     console.log('whats the data',data);
// });


// Routes
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.post("/api/notes", function(req, res) {
    const data = fs.readFileSync(path.join(__dirname,"/db/db.json"));
    const parseData = JSON.parse(data);

    var entry = req.body;
    parseData.push(entry);
    for (var i = 0; i < parseData.length; i++) {
        parseData[i].id = i + 1;   
    }
    
    const output = JSON.stringify(parseData, null, 2);

    fs.writeFile(path.join(__dirname, "/db/db.json"), output, function(err) {
        if (err) throw err;
    });

    res.json(output);    
});

app.delete("/api/notes/:id", function(req, res) {
    const data = fs.readFileSync(path.join(__dirname,"/db/db.json"));
    const parseData = JSON.parse(data);
    
    var idNumb = req.params.id;
    parseData.splice(idNumb, 1);
    for (var i = 0; i < parseData.length; i++) {
        parseData[i].id = i + 1;   
    }

    const output = JSON.stringify(parseData, null, 2);

    fs.writeFile(path.join(__dirname, "/db/db.json"), output, function(err) {
        if (err) throw err;
    });
    
    res.json(output);
});

/// Ref
// const notes = require("./db/db.json");
// app.delete("/api/notes/", function(req,res) {
//     notes.length = 0;
//     res.json({ok: true});
// })

// Listening
app.listen(PORT, function(){
    console.log("Listening to PORT :", PORT);
});