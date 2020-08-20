const path = require("path");
const fs = require("fs");
const indexData = require("../db/db.json") // test to use this on GET method

module.exports = function(app) {

    app.get("/api/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "../db/db.json"));
    });

    app.post("/api/notes", function(req, res) {
        const data = fs.readFileSync(path.join(__dirname,"../db/db.json"));
        const parseData = JSON.parse(data);

        var entry = req.body;
        parseData.push(entry);
        for (var i = 0; i < parseData.length; i++) {
            parseData[i].id = i + 1;   
        }
        
        const output = JSON.stringify(parseData, null, 2);

        fs.writeFile(path.join(__dirname, "../db/db.json"), output, function(err) {
            if (err) throw err;
        });

        res.json(output);    
    });

    app.delete("/api/notes/:id", function(req, res) {
        const data = fs.readFileSync(path.join(__dirname,"../db/db.json"));
        const parseData = JSON.parse(data);
        
        var idNumb = req.params.id;
        parseData.splice(idNumb, 1);
        for (var i = 0; i < parseData.length; i++) {
            parseData[i].id = i + 1;   
        }

        const output = JSON.stringify(parseData, null, 2);

        fs.writeFile(path.join(__dirname, "../db/db.json"), output, function(err) {
            if (err) throw err;
        });
        
        res.json(output);
    });
};
/// Ref to clear all
// const notes = require("./db/db.json");
// app.delete("/api/notes/", function(req,res) {
//     notes.length = 0;
//     res.json({ok: true});
// })