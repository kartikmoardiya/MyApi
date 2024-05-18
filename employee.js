const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    name:String,
    salary:Number,
    username:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }
})
module.exports = mongoose.model('employee',employeeSchema);
