const mongoose = require('mongoose')


mongoose.connect('mongodb://abhay:iwphack2019@ds259245.mlab.com:59245/third-eye', {
    useNewUrlParser: true,
    useCreateIndex: true
})