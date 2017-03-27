var express = require("express");
var app = express();
var port = 3000;

app.engine(".html", require("ejs").__express);
app.set("views", __dirname + "/views");
app.set("view engine", "html");
app.use(express.static(__dirname));

app.get("*", function(request, response) {
    response.render("index");
});

app.listen(port, function() {
    console.log("Listening on port " + port);
});