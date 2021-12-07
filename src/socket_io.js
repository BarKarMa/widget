
exports = module.exports = function(io) {

  users = []
  let clients = []
  let numUsers = 0;


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
 

}


