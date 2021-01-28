require('dotenv').config()


const express = require("express");

require("./db/conn");
const path = require("path");
const hbs = require("hbs");
const router = require("./routers/approute")
const port = process.env.PORT || 3000;
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());
 

const templatePath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");
app.use(express.static('public'));
app.use('/js',express.static(__dirname+"../public/js"));
app.use('/css',express.static(__dirname+"../public/css"));
app.use('/images',express.static(__dirname+"../public/images"));

 app.use(express.json());

app.use(express.urlencoded({extended:false}));


app.use(router);

app.set("view engine", "hbs");
app.set("views",templatePath);

hbs.registerPartials(partialsPath);

app.listen(port,()=>{
    console.log(`connection is succesfull at port no. ${port}`);
})