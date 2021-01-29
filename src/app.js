require('dotenv').config()


const express = require("express");
const compression = require("compression");
require("./db/conn");
const path = require("path");
const hbs = require("hbs");
const router = require("./routers/approute")
const port = process.env.PORT || 3000;
const cookieParser = require("cookie-parser");
const app = express();
app.use(compression());
app.use(cookieParser());


const templatePath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");


var options = {
    etag: true,
    //maxAge: 3600000, //in ms i.e 1 hr in this case
    redirect: true,
    setHeaders: function (res, path, stat) {
      //any other header in response
      res.set({
          'x-timestamp': Date.now(),
          'joseph' : 'hi',
          'Cache-Control' : 'public, max-age=60'
        });
    }
}



app.use(express.static('public',options));

app.use('/js',express.static(__dirname+"../public/js"));
app.use('/css',express.static(__dirname+"../public/css"));
app.use('/images',express.static(__dirname+"../public/images"))




 app.use(express.json());

app.use(express.urlencoded({extended:false}));


app.use(router);

app.set("view engine", "hbs");
app.set("views",templatePath);

hbs.registerPartials(partialsPath);

app.listen(port,()=>{
    console.log(`connection is succesfull at port no. ${port}`);
})