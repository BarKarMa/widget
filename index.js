
const express = require('express')
const app = express();
const path = require('path');
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const bodyParser = require('body-parser')



const { connect, connection, connections } = require('mongoose');
const { request } = require('http');
const { urlencoded } = require('body-parser');
const { send } = require('process');

const port = 3000;


app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json())


users = [];
//connections = [];

//app.use(express.static('/assets'))
app.use(express.static(__dirname + '/assets'))




app.get("/", (req, res) => {
  console.log("1");
  res.sendFile(path.join(__dirname, '/index.html'))
  //console.log(req.body)
  

  //res.send("hello");
});


// за допомогою експресу імітувати створення чату ?
app.post("/test", (req, res) => {
  //console.log(res.json({"message": "message recieved"}))
  //if(!req.body) return res.sendStatus(400);
  console.log("2");
  console.log(req.body);
  
  // body came with body-parser
  // numbers is name of textarea
});



io.on('connection', (socket) => {
  socket.on('chat message', (data) =>{
    console.log(data)
    io.emit('chat message', {
      message: data.message,
      name: data.name
    })
    
  })
})
// req is request and res is response
http.listen(process.env.PORT || 3000, () => {
//http.listen(port, () => {
  console.log(`server launched on port ${port}`);
});

