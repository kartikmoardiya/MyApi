const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    name:String,
    salary:Number
})
module.exports = mongoose.model('employee',employeeSchema);
