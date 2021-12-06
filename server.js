// все в индекс
const express = require('express')
const app = express();
const path = require('path');
const http = require('http').createServer(app)
const cors = require('cors')
const bodyParser = require('body-parser')
//const timeout = require('connect-timeout')

// раути АПИ
const homeRoute = require('./src/routes.js')
const chatRoute = require('./src/routes.js')
app.use('/', homeRoute)
app.use('/newChat', chatRoute)

// підключення сокетів
const sock = require('./src/socket-io.js')(http);

// Use
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())


app.use(express.static(__dirname + '/src'))
app.use(express.static(__dirname + '/src/client'))
app.use(express.static(path.join(__dirname)));
app.use("/styles", express.static(__dirname + '/styles'));

// сама ініціалізація




const port = 3000;

http.listen(process.env.PORT || 3000, () => {

  console.log(`server launched on port ${port}`);
});

