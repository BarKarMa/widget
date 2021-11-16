
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
//connections = [];


io.on('connection', (socket) => {
  console.log(`Client with id ${socket.id} connected`)
  console.log(`/////////////////////////////////////////`)
  clients.push(socket.id)
  
  
      
  socket.on('chat message', (data) =>{
    
    console.log(data)
    io.emit('chat message', {
      message: data.message,
      name: data.name,
    })
    
  })
  

  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
    })
})


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

      "sender":
    
     
     {
     
       "id": "4",
     
         "name": "Test User",
     
       "avatar":
     
     "https://media.fox9.com/media.fox9.com/photo/2018/03/02/5%20P%20MISSING%20DOG%20FOUND%20DEAD_00.00.06.04_1520042792006.png_5029487_ver1.0_640_360.jpg"
     
               },
     
      "message":
     
     {
     
                          "type": "text",
     
                          "text": "Test text"
     
               }
     
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

