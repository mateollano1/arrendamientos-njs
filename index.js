var express = require('express');
var app = express();
const controllers = require('./src/index')

app.route("/api", controllers)

// app.get('/', function(req, res) {
//     res.send('Hello World!');
// });

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});