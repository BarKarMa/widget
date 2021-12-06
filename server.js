// все в индекс
const express = require('express')
const app = express();
const path = require('path');
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const cors = require('cors')
const bodyParser = require('body-parser')
const timeout = require('connect-timeout')

// раути АПИ
const homeRoute = require('./src/routes.js')
const chatRoute = require('./src/routes.js')

require('./src/socket-io.js')(http);

app.use('/', homeRoute)
app.use('/newChat', chatRoute)


const port = 3000;

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())


app.use(express.static(__dirname + '/src'))
app.use(express.static(path.join(__dirname)));
app.use("/styles", express.static(__dirname + '/styles'));

// users = []
// let clients = []
// let numUsers = 0;



// io.on('connection', (socket) => {
//   console.log(`Client with id ${socket.id} connected`)
//   console.log(`/////////////////////////////////////////`)
//   clients.push(socket.id)
//   ++numUsers;
//   console.log(`Num of users: ${numUsers}`)
  
//   socket.join("room"+socket.id)
  
  
//   socket.on('chat message', (data) =>{
    
    
//     console.log(data)
//     io.to("room"+socket.id).emit('chat message', {
//       message: data.message,
//       name: data.name,
//     })
      
//   })

//   socket.on('disconnect', (data) => {
//     --numUsers;
//     console.log(`User disconnected. On server are: ${numUsers}`)
//     io.emit('user-disconnected', users[socket.id])
//     delete users[socket.id]
//     console.log(`'user-disconnected',  ${socket.id}`)
//     socket.leave("room"+socket.id);
//     })

//   socket.on('typing', () => {
//     socket.emit('typing', {
//       username: socket.username
//     })
//   })
  
  
// })

// io.on('typing', () => {
//   socket.broadcast.emit('typing', {
//     username: socket.username
//   })
// })



/// перенос в Індекс
http.listen(process.env.PORT || 3000, () => {

  console.log(`server launched on port ${port}`);
});

