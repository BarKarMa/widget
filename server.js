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
require('./src/socket-io.js')(http);

// Use
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())


app.use(express.static(__dirname + '/src'))
app.use(express.static(__dirname + '/src/client'))
app.use(express.static(path.join(__dirname)));
app.use("/styles", express.static(__dirname + '/styles'));

// сама ініціалізація


app.get("/", (req, res) => {
  console.log("1");
  res.sendFile(path.join(__dirname, '/index.html'))
});


app.post("/newChat", (req, res) => {
  try {

    var contype = req.headers['content-type']
    
    console.log('full output')
    console.log(req.body)

    if(!contype)
      return res.sendStatus(400)
    if (contype.indexOf('application/x-www-form-urlencoded; charset=UTF-8') !== 0)
      io.to('room'+req.body.receiver_id).emit('chat message', req.body)
      console.log("2");
      return res.sendStatus(200);
    }  catch(error) {
      
    }

});

const port = 3000;

http.listen(process.env.PORT || 3000, () => {

  console.log(`server launched on port ${port}`);
});

