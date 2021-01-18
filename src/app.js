const express = require("express");
require("./db/conn");
const path = require("path");
const hbs = require("hbs");
const router = require("./routers/approute")

const port = process.env.PORT || 3000;

const app = express();


const templatePath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");
app.use(express.static('public'));
app.use('/js',express.static(__dirname+"../public/js"));
app.use('/css',express.static(__dirname+"../public/css"));

 app.use(express.json());

app.use(express.urlencoded({extended:false}));


app.use(router);

app.set("view engine", "hbs");
app.set("views",templatePath);

hbs.registerPartials(partialsPath);



app.listen(port,()=>{
    console.log(`connection is succesfull at port no. ${port}`);
})