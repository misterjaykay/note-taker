// Dependencies
const path = require("path");
const express = require("express");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Data

// Routes
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function(req, res){
    res.sendFile(path.join(__dirname, "/db/db.json"));
    // fs.readFile(path.join(__dirname,"/db/db.json"), function(err){
    //     if (err) {
    //         return err;
    //     }
    // })
    // res.json();
    // // res.sendFile("/db.json");
});

// Listening
app.listen(PORT, function(){
    console.log("Listening to PORT :", PORT);
});