exports = module.exports = function (app, io) {

  app.get("/", (req, res) => {
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
        return res.sendStatus(200);
      }  catch(error) {
          
      }

  });

  app.get('/site.js', function(req, res){
    res.write("var BEESENDER_URL='" + process.env.BEESENDER_URL + "';");
    res.write(" var CHANNEL_ID='" + process.env.CHANNEL_ID + "'");
    res.end();
  });
  

}

