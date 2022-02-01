// все в индекс
const express = require('express')
const app = express();
const path = require('path');
const http = require('http').createServer(app)
const cors = require('cors')
const bodyParser = require('body-parser')
const io = require('socket.io')(http)
const expressLayouts = require('express-ejs-layouts');
const fileUploader = require('../configs/cloudinary.config');
const uploadRouter = require('./routes/upload');



var nodemailer = require('nodemailer')


    
//initiate socket
require('/app/src/socket_io.js')(io, nodemailer)

// Use lubs
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

app.use("/src", express.static(__dirname + '/src'))
app.use("/src/client", express.static(__dirname + '/src/client'))
app.use(express.static(path.join(__dirname)));
app.use("/styles", express.static(__dirname + '/styles'));
app.use("/configs", express.static(__dirname + '/configs'));
app.use('/uploads', uploadRouter);


require('/app/src/routes.js')(app, io, nodemailer, fileUploader)




const port = 3000;

http.listen(process.env.PORT || 3000, () => {

  console.log(`server launched on port ${port}`);
});

module.exports = {
  app: app,
  path: path,
  http: http,
  nodemailer: nodemailer,
  fileUploader: fileUploader
}