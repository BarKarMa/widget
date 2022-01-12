exports = module.exports = function (app, io, nodemailer) {

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
        io.to('room' + req.body.receiver_id).emit('chat message', req.body)
        //
          transport.sendMail(mailMessage, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log('Email was sent successfully: ' + info.response);
            }
          });
        //
        return res.sendStatus(200);
      }  catch(error) {
          
      }

  });

  app.get('/site.js', function(req, res){
    res.write("var BEESENDER_URL='" + process.env.BEESENDER_URL + "';");
    res.write(" var CHANNEL_ID='" + process.env.CHANNEL_ID + "';");
    res.write(" var MAIL_MY='" + process.env.MAIL_MY + "';");
    res.write(" var PASS_MY='" + process.env.PASS_MY + "';");
    res.end();
  });
  

  app.post('/send-email', function (req, res) {

    const mail_my = process.env.MAIL_MY
    const pass_my = process.env.PASS_MY

    var transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    // service: 'gmail',
    secure: false,
    auth: {
      user: mail_my,
      pass: pass_my
    }
    });
        
    var mailMessage = {
      from: 'addeee@bigmir.net',
      to: 'bezuhlov2andrii@gmail.com',
      subject: 'You have a new message on Terrasoft',
      text: 'Перейди за посиланням: https://windrose.terrasoft.ua/'
    };
          
    transport.sendMail(mailMessage, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email was sent successfully: ' + info.response);
      }
    });
    res.send( 'Send Mail with nodejs' );
  })


}

