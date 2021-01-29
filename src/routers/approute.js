
const express = require("express");
const auth = require("../middleware/auth")
const compression = require("compression");



const app = express();
app.use(compression());


const router = new express.Router();
const Register = require("../models/register")
const fetch = require('node-fetch');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")



  
  









router.get("", auth ,  (req,res)=>{
    try {
        
        res.render("weather")
    } catch (error) {
        res.render("index");
    }
    
})





 router.get("/logout", auth ,async (req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((currElement)=>{
            return currElement.token != req.token
        })
       
        res.clearCookie("jwt");
        await req.user.save();
        res.render("login",{
            Useralreadyexists : "Logout Successfully !"
        });
    } catch (error) {
        require.status(500).send(error);
    }
 })

 router.get("/logoutall", auth ,async (req,res)=>{
    try {
        req.user.tokens = [];
       
        res.clearCookie("jwt");
        await req.user.save();
        res.render("login",{
            Useralreadyexists : "Logout Successfully !"
        });
    } catch (error) {
        require.status(500).send(error);
    }
 })

router.get("/login",(req,res)=>{
    res.render("login");
})

router.get("/register",(req,res)=>{
    res.render("register");
})



router.post("/register", async (req,res)=>{
    try{
        const email1 = req.body.email.toLowerCase();
        const usermail= await Register.findOne({email:email1})
        
             
                const registerEmployee = new Register({
                    firstname : req.body.fname,
                    lastname : req.body.lname,
                    email : req.body.email,
                    password :  req.body.psw
                })
                  



                    const token  = await registerEmployee.generateAuthToken();

                    res.cookie("jwt", token,{
                        expires : new Date(Date.now()+10000),
                        httpOnly : true
                    });

                   const registered= await  registerEmployee.save();

                    res.status(201).render("login",{
                        Useralreadyexists : "Registration Successfull"
                    });
                   
       
    }
    catch(e){
       
        res.status(200).render("login",{
            Useralreadyexists : "An Account is already registered with this Email Address !"
        })
    }
})

router.post("/login", async (req,res)=>{
    try{
        
        
           const email1 = req.body.email.toLowerCase()
          const password1 = req.body.psw
          const usermail= await Register.findOne({email:email1})
          
           const isMatch = await bcrypt.compare(password1,usermail.password);
           const token  =await usermail.generateAuthToken();

           res.cookie("jwt", token,{
            //expires : new Date(Date.now()+20000),
            httpOnly : true
        });  
            
            
            
            const fname=usermail.firstname;
            const y=fname.charAt(0).toUpperCase()+fname.substring(1);
            
            if(isMatch){
                res.status(200).render("weather",{
                    Login : y
                })
            }

          else{
            res.status(200).render("login",{
                Useralreadyexists : "Wrong Password !"
            })
          }
          
       
    }
    catch(e){
        res.status(404).render("login",{
            Useralreadyexists : "Couldn't find your Account !"
        })
    }
})

router.post("/weather",  (req,res)=>{
   
       
            
            fname = req.body.fname;
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${fname}&units=metric&appid=b14425a6554d189a2d7dc18a8e7d7263`)
            .then(res => res.json())
            .then((json) => {
                const arrData = [json];
                const weatherDescription=arrData[0].weather[0].description;
               const weather= weatherDescription.charAt(0).toUpperCase()+weatherDescription.substring(1);
               const weathericon=arrData[0].weather[0].icon;
                const iconurl = "http://openweathermap.org/img/wn/"+weathericon+"@2x.png"
               
              res.render("weather",{
                LocationCountry:`${arrData[0].name}, ${arrData[0].sys.country}`,
                temp: `${Math.round(arrData[0].main.temp)}°C | ${weather}`,
                image : iconurl

              })
    
            }).catch((e)=>{
                res.status(404).render("weather");
            })

        })


module.exports = router;