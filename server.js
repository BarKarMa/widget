// все в индекс
const express = require('express')
const app = express();
const path = require('path');
const http = require('http').createServer(app)
const cors = require('cors')
const bodyParser = require('body-parser')
const io = require('socket.io')(http)


const mail_my = MAIL_MY
const pass_my = PASS_MY

///
var nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
    host: 'smtp@gmail.com',
    port: 465,
    secure: false,
    requireTLS: true,
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
    
//socket
require('/app/src/socket_io.js')(io)

// Use
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())


app.use("/src", express.static(__dirname + '/src'))
app.use("/src/client", express.static(__dirname + '/src/client'))
app.use(express.static(path.join(__dirname)));
app.use("/styles", express.static(__dirname + '/styles'));

require('/app/src/routes.js')(app, io, nodemailer, transporter, mailMessage)


const port = 3000;

http.listen(process.env.PORT || 3000, () => {

  console.log(`server launched on port ${port}`);
});

module.exports = {
  app: app,
  path: path,
  http: http,
  nodemailer: nodemailer,
  transporter: transporter,
  mailMessage: mailMessage
}