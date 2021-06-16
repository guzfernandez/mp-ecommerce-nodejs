var express = require('express');
var bodyParser = require("body-parser");
require('dotenv').config();
var exphbs  = require('express-handlebars');
var port = process.env.PORT || 3000

var app = express();
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));

app.use('/', require('./routes'));

app.listen(port);