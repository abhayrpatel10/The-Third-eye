const express=require('express')
require('../db/mongoose')
app=express.Router()
const Vehicle=require('../models/vehicle')

app.post('/addvehicle',async(req,res)=>{
    const vehicle=new Vehicle(req.body)
    try{
        await vehicle.save()
        res.status(200).send('Vehicle added')
    }catch(e){
        res.send('Error'+e)
    }
})






module.exports=app