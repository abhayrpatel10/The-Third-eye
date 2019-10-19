const express=require('express')
require('../db/mongoose')
app=express.Router()
const Vehicle=require('../models/vehicle')
const multipart = require('connect-multiparty');
const cloudinary = require('cloudinary');
const multipartMiddleware = multipart();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
            res.json(result.info.ocr.adv_ocr.data[0].textAnnotations[0].description); 
          }
      });
    });







module.exports=app