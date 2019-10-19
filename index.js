const express = require('express');
const app = express();
const multipart = require('connect-multiparty');
const cloudinary = require('cloudinary');
const cors = require('cors');
const bodyParser = require('body-parser');
require('./db/mongoose')
const Nexmo = require('nexmo');

const Vehicle=require('./models/vehicle')



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


port=process.env.PORT||3000

const multipartMiddleware = multipart();

cloudinary.config({
    cloud_name: 'dhc8pjk3a',
    api_key: '513854727551353',
    api_secret: '5G2lso3Ep70IGd3-h1ZD3J1wJOY'
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


app.post('/addvehicle',async(req,res)=>{
    const vehicle=new Vehicle(req.body)
    try{
        await vehicle.save()
        res.status(200).send('Vehicle added')
    }catch(e){
        res.send('Error'+e)
    }
})

function sendmessage(mobileno,amount,records){
    const nexmo = new Nexmo({
        apiKey: 'e99d0ebb',
        apiSecret: 'SCEmJzV4we0tHi9J',
      });
      
      const from = 'Nexmo';
      const to = '919952121766';
      const text = 'You have violated the traffic rules.Your total fine is '+amount;

      nexmo.message.sendSms(from, to, text);
      return text

}


app.post('/check',async(req,res)=>{
   
    try{
        var veh=await Vehicle.findOne({vehicleno:req.body.vehicleno})
    if(veh.record==[]){
        res.send('No records found for this vehicle')
    }else{
        const listval=Object.values(veh.record[0])
        sum=0
        for(var i=0;i<listval.length;i++){
            sum=sum+listval[i]
        }
        const r=sendmessage((veh.vehicleowner.details.mobileno).toString(),sum,(veh.record).toString())
        console.log((veh.vehicleowner.details.mobileno).toString())

        //res.send(sum.toString())
        res.send(r)
    }

    }catch(e){
        res.send(e)
    }
    

})

app.post('/payComplete',async(req,res)=>{
    var vehno=req.body.vehicleno

    try{
        

        await Vehicle.findOneAndUpdate({'vehicleno':req.body.vehicleno},{$set:{'record':[]}})
        res.send('You have no violation fees now')
    }catch(e){
        res.send(e)

    }
})

app.post('/details',async(req,res)=>{

    try{
        var veh=await Vehicle.findOne({'vehicleno':req.body.vehicleno})
        res.send(veh)

    }catch(e){
        res.send(e)
    }
   
})


app.listen(port,()=>{
    console.log("Listening on port "+port)
})

