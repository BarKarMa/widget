const express = require('express');
const router = express.Router();
const app = express();
const io = require('/app/server.js')





app.get("/", (req, res) => {
  console.log("1");
  res.sendFile(path.join(__dirname, '/index.html'))
});


// app.post("/newChat", (req, res) => {
//   try {
//     var contype = req.headers['content-type']
    
//     console.log('full output')
//     console.log(req.body)

//     if(!contype)
//       return res.sendStatus(400)
//     if (contype.indexOf('application/x-www-form-urlencoded; charset=UTF-8') !== 0)
//       sock.to('room'+req.body.receiver_id).emit('chat message', req.body)
//       console.log("2");
//       return res.sendStatus(200);
//     }  catch(error) {
      
//     }

// });

module.exports = router;

