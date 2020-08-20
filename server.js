// Dependencies
const path = require("path");
const express = require("express");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Routes to API,HTML
var apiRoutes = require("./routes/apiRoutes")
var htmlRoutes = require("./routes/htmlRoutes")
apiRoutes(app);
htmlRoutes(app);

// Listening
app.listen(PORT, function(){
    console.log("Listening to PORT :", PORT);
});