const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true, 
        trim: true,
        lowercase:true,
    },
    lastname : {
        type : String,
        trim:true,
        lowercase:true,
    },
    email : {
        type : String,
        lowercase:true,
        required : true, 
        unique : true,
        trim : true
    },
    password : {
        type : String,
        required : true, 
    }
})

const Register = new mongoose.model("Register",employeeSchema);

module.exports = Register;