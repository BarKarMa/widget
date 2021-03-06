// все в индекс
const express = require('express')
const app = express();
const path = require('path');
const http = require('http').createServer(app)
const cors = require('cors')
const bodyParser = require('body-parser')
const io = require('socket.io')(http)
const expressLayouts = require('express-ejs-layouts');
const fileUploader = require('./configs/cloudinary.config');
const uploadRouter = require('./uploads/uploads');
const cloudinary = require("cloudinary").v2;
const fs = require('fs')
var multer  = require('multer')


var nodemailer = require('nodemailer')


    
//initiate socket
require('/app/src/socket_io.js')(io, nodemailer)

// HERE WE WILL LET OUR APP TO GET ACCESS TO THE STATIC FOLDERS LIKE CSS, IMAGES.
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

app.use("/src", express.static(__dirname + '/src'))
app.use("/src/client", express.static(__dirname + '/src/client'))
app.use(express.static(path.join(__dirname)));
app.use("/styles", express.static(__dirname + '/styles'));
app.use("/configs", express.static(__dirname + '/configs'));
app.use("/uploads", express.static(__dirname + '/uploads'));
// app.use("/uploads", uploadRouter);

require('/app/uploads/uploads.js')


require('/app/src/routes.js')(app, io, nodemailer, fileUploader, cloudinary)


///

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});


///



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