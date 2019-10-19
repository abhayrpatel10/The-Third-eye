const express = require('express');
const app = express();
const multipart = require('connect-multiparty');
const cloudinary = require('cloudinary');
const cors = require('cors');
const bodyParser = require('body-parser');
const vehcilerouter=require('./routes/addvehicles')
const imagerecogrouter=require('./routes/framerecog')
const check=require('./routes/checkforviolations')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(vehcilerouter)
app.use(imagerecogrouter)
app.use(check)
app.use(cors());


port=process.env.PORT||3000

app.listen(port,()=>{
    console.log("Listening on port "+port)
})

