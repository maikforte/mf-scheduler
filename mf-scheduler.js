var express = require("express");
var taskTypeModule = require("./lib/task-type.js");
var filters = require("./lib/filters.js");
var app = express();
var port = 3000;

app.engine(".html", require("ejs").__express);
app.set("views", __dirname + "/views");
app.set("view engine", "html");
app.use(express.static(__dirname));

app.get("/get-task-type", function(request, response) {
    taskTypeModule.listTaskType(request, response);
});

app.get("/get-hours", function(request, response) {
    filters.listHours(request, response);
});

app.get("/get-intervals", function(request, response) {
    filters.listIntervals(request, response);     
});

app.get("*", function(request, response) {
    response.render("index");
});

app.listen(port, function() {
    console.log("Listening on port " + port);
});