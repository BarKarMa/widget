// все в индекс
const express = require('express')
const app = express();
const path = require('path');
const http = require('http').createServer(app)
const cors = require('cors')
const bodyParser = require('body-parser')
//const timeout = require('connect-timeout')
const io = require('socket.io')(http)
const sock = require('/app/src/socket_io.js')(io)



// раути АПИ
// const homeRoute = require('/app/src/routes.js')
//  const newRoute = require('./src/routes.js')
//app.use('/', homeRoute)
//app.use('/newChat', homeRoute)


// підключення сокетів
// const io = require('socket.io')(http)
// const sock = require('./src/socket_io.js')(io)



// Use
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())


app.use("/src", express.static(__dirname + '/src'))
app.use("/src/client", express.static(__dirname + '/src/client'))
app.use(express.static(path.join(__dirname)));
app.use("/styles", express.static(__dirname + '/styles'));

// сама ініціалізація

require('/app/src/routes.js')(app)


const port = 3000;

http.listen(process.env.PORT || 3000, () => {

  console.log(`server launched on port ${port}`);
});

module.exports = {
    app: app,
    http: http,
    //io: io
}