
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
  
  
      
  socket.on('chat message', (data) =>{
    
    console.log(data)
    io.emit('chat message', {
      message: data.message,
      name: data.name,
    })
    
  })

  socket.on('typing', () => {
    socket.broadcast.emit('typing', {
      username: socket.username
    })
  })
  
})

io.on('disconnect', (socket) => {
  --numUsers;
  console.log(`Num of users: ${numUsers}`)
  socket.broadcast.emit('user-disconnected', users[socket.id])
  delete users[socket.id]
  })


io.on('typing', () => {
  socket.broadcast.emit('typing', {
    username: socket.username
  })
})

io.on('stop typing', () => {
  socket.broadcast.emit('stop typing', {
    username: socket.username
  });
});




//app.use(express.static('/assets'))
app.use(express.static(__dirname + '/assets'))




app.get("/", (req, res) => {
  console.log("1");
  res.sendFile(path.join(__dirname, '/index.html'))
  
  //console.log(req.body)
  

});



// за допомогою експресу імітувати створення чату ?
app.post("/test", (req, res) => {
  try {
  //console.log(res.json({"message": "message recieved"}))
  //if(!req.body) return res.sendStatus(400);
  var contype = req.headers['content-type']
  
  console.log('full output')
  console.log(req.body);

  


  if(!contype)
    return res.sendStatus(400)
  
  if (contype.indexOf('application/x-www-form-urlencoded; charset=UTF-8') !== 0)
  ////
    
    ///
    io.emit('chat message', req.body);
    console.log("2");
    return res.sendStatus(200);
  }  catch(error) {
    
  }
  
  
  //io.emit('chat message', req.body);
  // сдесь иф который будет отправлять только когда идет запрос через АПИ
  //io.emit('chat message', req.body)
  //res.sendStatus(200);
  

});


app.post("/webhook", (req, res) => {
  try {
    res.json({

      "channel_id" : "28528776-3130-4C66-E811-08D55CEAB346",

      "receiver_id" : "123",

      "type" : "text",

      "content" :

       {

           "text" : "test",

           "buttons" : []

      },

      "operatorInfo": ""

});
  
    return res.sendStatus(200);
  }  catch(error) {
    
  }
  
  
  //io.emit('chat message', req.body);
  // сдесь иф который будет отправлять только когда идет запрос через АПИ
  //io.emit('chat message', req.body)
  //res.sendStatus(200);
  

});



// req is request and res is response
http.listen(process.env.PORT || 3000, () => {
//http.listen(port, () => {
  console.log(`server launched on port ${port}`);
});

