const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://admin:admin@cluster0.q76zp.mongodb.net/employeedata?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    
}).then(()=>{
    console.log("connection successfull");
}).catch((e)=>{
    console.log("not sucessfull")
})