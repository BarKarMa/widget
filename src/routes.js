exports = module.exports = function (app, io, nodemailer, fileUploader) {

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
    
  });


// initiate new chat on client side and wait for sandind message 
  app.post("/newChat", (req, res) => {
    try { 
      var contype = req.headers['content-type']  
      console.log('full output')
      console.log(req.body)

      if(!contype)
        return res.sendStatus(400)
      if (contype.indexOf('application/x-www-form-urlencoded; charset=UTF-8') !== 0)
        io.to('room' + req.body.receiver_id).emit('chat message', req.body)
        return res.sendStatus(200);
      }  catch(error) {
          
      }

  });

  app.get('/site.js', function(req, res){
    res.write("var BEESENDER_URL='" + process.env.BEESENDER_URL + "';");
    res.write(" var CHANNEL_ID='" + process.env.CHANNEL_ID + "';");
    res.write(" var MAIL_MY='" + process.env.MAIL_MY + "';");
    res.write(" var PASS_MY='" + process.env.PASS_MY + "';");
    res.write(" var CLOUDINARY_KEY='" + process.env.CLOUDINARY_KEY + "';");
    res.write(" var CLOUDINARY_NAME='" + process.env.CLOUDINARY_NAME + "';");
    res.write(" var CLOUDINARY_SECRET='" + process.env.CLOUDINARY_SECRET + "';");
    res.end();
  });


  app.post('/cloudinary-upload', fileUploader.single('file'), (req, res, next) => {
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  res.json({ secure_url: req.file.path });
  });
  

  app.post('/send-email', function (req, res) {
    const mail_my = process.env.MAIL_MY
    const pass_my = process.env.PASS_MY
  
    var transport = nodemailer.createTransport({
    host: 'smtp.bigmir.net',
    port: 465,
    // service: 'gmail',
    secure: true,
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
    })

  })


}

