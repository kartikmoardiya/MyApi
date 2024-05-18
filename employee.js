const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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
});
employeeSchema.pre('save',async function(next){
    const person = this;
    if(!person.isModified('password')){
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(person.password,salt);
        person.password = hashPassword;
        next();
    } catch (error) {
        return next(error);
    }
})
employeeSchema.methods.comparePassword  = async function (candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword,this.password);
        return isMatch;
    } catch (err) {
        return err;
    }
}
module.exports = mongoose.model('employee',employeeSchema);
