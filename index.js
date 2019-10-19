const express = require('express');
const app = express();
const multipart = require('connect-multiparty');
const cloudinary = require('cloudinary');
const cors = require('cors');
const bodyParser = require('body-parser');

const addveh=require('./routes/addvehicles')
const check=require('./routes/checkforviolations')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
//app.use(fileUpload())
app.use(check)
app.use(addveh)
port=process.env.PORT||3000

const multipartMiddleware = multipart();

cloudinary.config({
    cloud_name: 'dhw5dya3h',
    api_key: '241646421827913',
    api_secret: 'RSe-sJZxufTtmGnncSIscE3DugA'
});

app.post('/upload', multipartMiddleware, function(req, res) {
    cloudinary.v2.uploader.upload(req.files.image.path,
      {
        ocr: "adv_ocr"
      }, function(error, result) {
          if( result.info.ocr.adv_ocr.status === "complete" ) {
            res.json(result.info.ocr.adv_ocr.data[0].textAnnotations[0].description); // result.info.ocr.adv_ocr.data[0].textAnnotations[0].description (more specific)
          }
      });
  });

app.listen(port,()=>{
    console.log("Listening on port "+port)
})

