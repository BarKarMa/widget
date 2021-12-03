
const express = require('express')
const app = express();
const path = require('path');
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const cors = require('cors')
const bodyParser = require('body-parser')
const timeout = require('connect-timeout')



const { connect, connection, connections } = require('mongoose');
const { request } = require('http');
const { urlencoded } = require('body-parser');
const { send } = require('process');
const { Console } = require('console');

const port = 3000;

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())


users = []
let clients = []
let numUsers = 0;
//connections = [];


io.on('connection', (socket) => {
  console.log(`Client with id ${socket.id} connected`)
  console.log(`/////////////////////////////////////////`)
  clients.push(socket.id)
  ++numUsers;
  console.log(`Num of users: ${numUsers}`)
  
  socket.join("room"+socket.id)
  
  
  socket.on('chat message', (data) =>{
    
    
    console.log(data)
    io.to("room"+socket.id).emit('chat message', {
      message: data.message,
      name: data.name,
    })
      
  })

  socket.on('disconnect', (data) => {
    --numUsers;
    console.log(`User disconnected. On server are: ${numUsers}`)
    io.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
    console.log(`'user-disconnected',  ${socket.id}`)
    socket.leave("room"+socket.id);
    })

  socket.on('typing', () => {
    socket.emit('typing', {
      username: socket.username
    })
  })
  
  
})

io.on('typing', () => {
  socket.broadcast.emit('typing', {
    username: socket.username
  })
})

app.use(express.static(__dirname + '/assets'))
app.use(express.static(__dirname + '/styles'))




app.get("/", (req, res) => {
  console.log("1");
  res.sendFile(path.join(__dirname, '/index.html'))
  res.sendFile(path.join(__dirname, '/styles/styles.css'))
  res.sendFile(path.join(__dirname, '/styles/media.css'))

});


// за допомогою експресу імітувати створення чату ?
app.post("/test", (req, res) => {
  try {
  //console.log(res.json({"message": "message recieved"}))
  //if(!req.body) return res.sendStatus(400);
  var contype = req.headers['content-type']
  
  console.log('full output')
  console.log(req.body)
  //console.log('---------- head ------------')
  //console.log(req.headers)

  if(!contype)
    return res.sendStatus(400)

  
  
  if (contype.indexOf('application/x-www-form-urlencoded; charset=UTF-8') !== 0)

    
    io.to('room'+req.body.receiver_id).emit('chat message', req.body)

    console.log("2");

    return res.sendStatus(200);
  }  catch(error) {
    
  }
  


});



// req is request and res is response
http.listen(process.env.PORT || 3000, () => {
//http.listen(port, () => {
  console.log(`server launched on port ${port}`);
});

