const express=require('express')
require('../db/mongoose')
app=express.Router()
const Vehicle=require('../models/vehicle')
const Nexmo = require('nexmo');




function sendmessage(mobileno,amount){
    const nexmo = new Nexmo({
        apiKey: 'e99d0ebb',
        apiSecret: 'SCEmJzV4we0tHi9J',
      });
      
      const from = 'Nexmo';
      const to = '919952121766';
      const text = 'You have violated traffic rules these';

      nexmo.message.sendSms(from, to, text);

}


app.post('/check',async(req,res)=>{
   
    try{
        var veh=await Vehicle.findOne({vehicleno:req.body.vehicleno})
    if(veh.record===[]){
        res.send('No records found for this vehicle')
    }else{
        const listval=Object.values(veh.record[0])
        sum=0
        for(var i=0;i<listval.length;i++){
            sum=sum+listval[i]
        }

        res.send(sum.toString())
    }

    }catch(e){
        res.send('Data for the vehicle not found')
    }
    

})

module.exports=app