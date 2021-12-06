// все в индекс
const express = require('express')
const app = express();
const path = require('path');
const http = require('http').createServer(app)
const cors = require('cors')
const bodyParser = require('body-parser')
//const timeout = require('connect-timeout')
const io = require('socket.io')(http)

// раути АПИ
// const homeRoute = require('./src/routes.js')
// const newRoute = require('./src/routes.js')
// app.use('/', homeRoute)
// app.use('/newChat', newRoute)

// підключення сокетів
const sock = require('./socket-io.js')

// Use
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())


app.use("/src", express.static(__dirname + '/src'))
app.use("/src/client", express.static(__dirname + '/src/client'))
app.use(express.static(path.join(__dirname)));
app.use("/styles", express.static(__dirname + '/styles'));

// сама ініціалізація


// const io = require('socket.io')(http)
// users = []
// let clients = []
// let numUsers = 0;


// io.on('connection', (socket) => {
// console.log(`Client with id ${socket.id} connected`)
// console.log(`/////////////////////////////////////////`)
// clients.push(socket.id)
// ++numUsers;
// console.log(`Num of users: ${numUsers}`)
  
// socket.join("room"+socket.id)
  
  
// socket.on('chat message', (data) =>{
    
    
//   console.log(data)
//   io.to("room"+socket.id).emit('chat message', {
//     message: data.message,
//     name: data.name,
//   })
      
// })

// socket.on('disconnect', (data) => {
//   --numUsers;
//   console.log(`User disconnected. On server are: ${numUsers}`)
//   io.emit('user-disconnected', users[socket.id])
//   delete users[socket.id]
//   console.log(`'user-disconnected',  ${socket.id}`)
//   socket.leave("room"+socket.id);
//   })

// socket.on('typing', () => {
//   socket.emit('typing', {
//     username: socket.username
//   })
// })
  
// })


app.get("/", (req, res) => {
  console.log("1");
  res.sendFile(path.join(__dirname, '/index.html'))
});


app.post("/newChat", (req, res) => {
  try {
    //const sock = require('/socket-io.js')

    var contype = req.headers['content-type']
    
    console.log('full output')
    console.log(req.body)

    if(!contype)
      return res.sendStatus(400)
    if (contype.indexOf('application/x-www-form-urlencoded; charset=UTF-8') !== 0)
      sock.to('room'+req.body.receiver_id).emit('chat message', req.body)
      console.log("2");
      return res.sendStatus(200);
    }  catch(error) {
      
    }

});




const port = 3000;

http.listen(process.env.PORT || 3000, () => {

  console.log(`server launched on port ${port}`);
});

module.exports = {
    app: app,
    http: http,
    io: io
}