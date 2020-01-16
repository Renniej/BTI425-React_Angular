const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors") //WHAT IS CORS??????/
const data_services = require("./data-services.js")


var app = express();

app.use(bodyParser.json());
app.use(cors());

var HTTP_PORT = process.env.PORT || 8080; // http://localhost:8080/


function onHttpStart() {

    data_services.initializeDBConnection()

        .then(function (DB_msg) {

            console.log(DB_msg)
            console.log("Express http server listening on: " + HTTP_PORT);
        })
        .catch(function (err) {
            console.log("MongoDb Error : " + err);
        });

}

app.get('/api/cars', function (req, res) { //get all car documents

    data_services.Find().then(function (data) {
        var status;

        if (data.length) {
            status = 200; //Data didn't return as an empty query
        }
        else {
            status = 404; //Data returned is empty a.k.a data matching query was not found
        }

        res.status(status) //Sucessful response
        res.json(data)
    }
    ).catch(function (err) {
        res.status(500) //Api error ):
        res.send("API ERROR : " + err);
    })


})


app.get('/api/cars/:id', function (req, res) { //get single car documents

    data_services.Find(req.params.id).then(function (data) {
        res.json(data)
    }).catch(function (err) {
        res.send("ERROR : " + err);
    })


})

app.put("/api/cars/:id", (req, res) => {

    data_services.Update_Car(req.body)
        .then(function (data) {
            res.json(data);
        })
        .catch(function () {
            res.status(404)
            res.json({ "message": "Resource not found" });
        })
});


app.delete("/api/cars/:id", (req, res) => {

    data_services.carDelete(req.params.id)
        .then(function () {
            res.status(204).end();
        })
        .catch(function () {
            res.status(404)
            res.json({ "message": "Resource not found" });
        })
});


app.use((req, res) => {
    res.status(404)
    res.send("Resource not found");
});




app.listen(HTTP_PORT, onHttpStart);

