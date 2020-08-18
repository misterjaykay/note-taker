// Dependencies
const path = require("path");
const express = require("express");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
    // res.json("/db/db.json");
    

    // var mydata = JSON.parse(data);
    // console.log(mydata[0].title);
    // console.log(mydata[0].note);

    // fs.readFile(path.join(__dirname,"/db/db.json"), function(err){
    //     if (err) {
    //         return err;
    //     }
    // })
    // res.json();
    // // res.sendFile("/db.json");
});

app.post("/api/notes", function(req, res) {
    const noteArr = [];

    const data = fs.readFileSync("/db/db.json");
    const readData = JSON.parse(data);
    console.log(readData);

    var entry = req.body;

    noteArr.push(readData);
    noteArr.push(entry);
    
    const output = JSON.stringify(noteArr, null, 2);
    // look for simliar function like appendFile
    fs.writeFile(path.join(__dirname, "/db/db.json"), output, function(err) {
        if (err) throw err;
    });
    console.log("Done", output);
    
});

app.delete("/api/notes/:id", function(req, res) {
    res.json
});

// Listening
app.listen(PORT, function(){
    console.log("Listening to PORT :", PORT);
});