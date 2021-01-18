const express = require("express");
require("./db/conn");
const path = require("path");
const hbs = require("hbs");
const router = require("./routers/approute")

const port = process.env.PORT || 3000;

const app = express();

const staticPath = path.join(__dirname,"../public");
const templatePath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");
app.use(express.json());

app.use(express.urlencoded({extended:false}))

app.use(express.static(staticPath));


app.set("view engine", "hbs");
app.set("views",templatePath);

hbs.registerPartials(partialsPath);

app.use(router)

app.listen(port,()=>{
    console.log(`connection is succesfull at port no. ${port}`);
})