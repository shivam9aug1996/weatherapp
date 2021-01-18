const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/employeeRegistration2",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connection successfull");
}).catch((e)=>{
    console.log("not sucessfull")
})