const express = require('express');
const app = express();
const multipart = require('connect-multiparty');
const cloudinary = require('cloudinary');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

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
            res.json(result); 
          }
      });
  });

app.listen(port,()=>{
    console.log("Listening on port "+port)
})

