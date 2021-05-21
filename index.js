const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var session = require('express-session');
require('dotenv').config();

const app = express();

app.use(session({
    secret: 'MySeession',
    resave: true,
    saveUninitialized: true
}))

require('./App/DB');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/',express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


require('./App/Routes/routes')(app);



const Port = process.env.Port || 3000;
app.listen(Port, () => {
    console.log("Server Listing at :- 3000");
})