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


require('/app/src/routes.js')(app, io, nodemailer, fileUploader, upload)


///

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })



async function uploadToCloudinary(locaFilePath) {
  // locaFilePath :
  // path of image which was just uploaded to "uploads" folder

  var mainFolderName = "main"
  // filePathOnCloudinary :
  // path of image we want when it is uploded to cloudinary
  var filePathOnCloudinary = mainFolderName + "/" + locaFilePath

  return cloudinary.uploader.upload(locaFilePath,{"public_id":filePathOnCloudinary})
  .then((result) => {
    // Image has been successfully uploaded on cloudinary
    // So we dont need local image file anymore
    // Remove file from local uploads folder 
    fs.unlinkSync(locaFilePath)
    
    return {
      message: "Success",
      url:result.url
    };
  }).catch((error) => {
    // Remove file from local uploads folder 
    fs.unlinkSync(locaFilePath)
    return {message: "Fail",};
  });
}

function buildSuccessMsg(urlList){
  // Building success msg
  var response = '<h1><a href="/">Click to go to Home page</a><br></h1><hr>'
  
  for(var i=0;i<urlList.length;i++){
    response += "File uploaded successfully.<br><br>"
    response += `FILE URL: <a href="${urlList[i]}">${urlList[i]}</a>.<br><br>`
    response += `<img src="${urlList[i]}" /><br><hr>`
  }

  response += `<br><p>Now you can store this url in database or do anything with it  based on use case.</p>`
  return response  
}


app.post('/profile-upload-single', upload.single('profile-file'), async (req, res, next) => {
  // req.file is the `profile-file` file
  // req.body will hold the text fields, if there were any
  var locaFilePath = req.file.path
  var result = await uploadToCloudinary(locaFilePath)
  var response = buildSuccessMsg([result.url])

  return res.send(response)
})

app.post('/profile-upload-multiple', upload.array('profile-files', 12), async (req, res, next) => {
    // req.files is array of `profile-files` files
    // req.body will contain the text fields, if there were any
    var imageUrlList = []
    
    for(var i=0;i<req.files.length;i++){
      var locaFilePath = req.files[i].path
      var result = await uploadToCloudinary(locaFilePath)
      imageUrlList.push(result.url)
    }
    var response = buildSuccessMsg(imageUrlList)
    
    return res.send(response)
})

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