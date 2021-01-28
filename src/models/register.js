
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

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
    },
   tokens : [{
        token : {
            type : String,
            required : true
        }
   }]
        
   
})


employeeSchema.methods.generateAuthToken = async function(){
    try{
        const token = jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token : token});
        await this.save();
        return token;
    } catch(error){
        console.log(error);
    }
}


employeeSchema.pre("save",async function(next){
    if(this.isModified("password")){
       this.password=await bcrypt.hash(this.password,10);
        next();    
    }

})
 
const Register = new mongoose.model("Register",employeeSchema);

module.exports = Register;