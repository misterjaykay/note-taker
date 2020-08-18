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

// Routes
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));

    

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
    var entry = req.body;
    console.log("Entered: ", entry);
    // look for simliar function like appendFile
    fs.appendFile(path.join(__dirname,"/db/db.json"), entry, function(err) {
        if (err) throw err;
        console.log("Checking to see this: ",entry);
    });
    
});

app.delete("/api/notes/:id", function(req, res) {
    res.json
});

// Listening
app.listen(PORT, function(){
    console.log("Listening to PORT :", PORT);
});