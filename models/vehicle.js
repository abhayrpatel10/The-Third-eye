const mongoose=require('mongoose')


const VehicleSchema=new mongoose.Schema({
    vehicleowner:{
        details:{
            name:{
                type:String,
                required:true

            },
            mobileno:{
                type:Number,
                required:true,
                maxlength:10,
                minlength:10,
                
            }
            
        }
    },
    vehicleno:{
        type:String,
        required:true

    },
    record:{
        type:Array,
        default:[]
    }


})

const Vehicle=mongoose.model('Vehicle',VehicleSchema)
module.exports=Vehicle