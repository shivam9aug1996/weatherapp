const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true, 
    },
    lastname : {
        type : String,
        
    },
    email : {
        type : String,
        required : true, 
        unique : true
    },
    password : {
        type : String,
        required : true, 
    }
})

const Register = new mongoose.model("Register",employeeSchema);

module.exports = Register;