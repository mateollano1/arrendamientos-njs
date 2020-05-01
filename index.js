var express = require('express');
var app = express();
const controllers = require('./src/index');
const mongoose = require('mongoose');
const morgan = require('morgan');
const config = require("./config/config")

app.use(morgan("tiny"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use("/api", controllers);

app.get('/**', function(req, res) {
    res.status(404).json({"error": "Route not found"});
});

app.listen(config.PORT, function() {
    console.log(`Example app listening on port ${config.PORT}`);
    mongoose.connect(`${config.MONGODB}`, { useNewUrlParser: true })
    .then(()=>{
        console.log("mongo conected!");
    }).catch(err => console.log(err));
});