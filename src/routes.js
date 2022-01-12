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
        io.to('room'+req.body.receiver_id).emit('chat message', req.body)
        return res.sendStatus(200);
      }  catch(error) {
          
      }

  });

  app.get('/site.js', function(req, res){
    res.write("var BEESENDER_URL='" + process.env.BEESENDER_URL + "';");
    res.write(" var CHANNEL_ID='" + process.env.CHANNEL_ID + "'");
    res.write("var MAIL_MY='" + process.env.MAIL_MY + "';");
    res.write(" var PASS_MY='" + process.env.PASS_MY + "'");
    res.end();
  });
  

  app.post('/send-email', function (req, res) {
    
    const mail_my = MAIL_MY
    const pass_my = PASS_MY
   
    var receiver = 'bezuhlov2andrii@gmail.com';
    var subject = 'test';
    var message = 'message';
    
    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: false,
      requireTLS: true,
      auth: {
        user: mail_my, // enter your email address
        pass: pass_my  // enter your visible/encripted password
      }
    });
      
    var mailOptions = {
      from: 'addeee@bigmir.net',
      to: 'bezuhlov2andrii@gmail.com',
      subject: 'sub',
      text: 'mess'
    };
      
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email was sent successfully: ' + info.response);
      }
    });
    res.render('mail-form', { title: 'Send Mail with nodejs' });
  })


}

