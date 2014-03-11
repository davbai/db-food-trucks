var express     = require("express"),
    app         = express(),
    server      = require("http").createServer(app),
    router      = require("./routes/router");


app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
    res.sendfile(__dirname + "/public/index.html");
});

app.get("/foodtrucks", router.findAllFoodTrucks);
app.get("/neighborhoods", router.findAllNeighborhoods);
app.get("/neighborhoods/:id", router.findNeighborhoodById);

var port = process.env.PORT || 3000;
server.listen(port);

