const express=require('express')
require('../db/mongoose')
app=express.Router()
const Vehicle=require('../models/vehicle')


app.post('/check',async(req,res)=>{
   
    var veh=await Vehicle.findOne({vehicleno:req.body.vehicleno})
    if(veh.record===[]){
        res.send('No records found for this vehicle')
    }else{
        res.send(veh.record)
    }

})

module.exports=app