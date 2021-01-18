
const express = require("express");
const router = new express.Router();
const Register = require("../models/register")
const fetch = require('node-fetch');



router.get("",(req,res)=>{
    res.render("index");
})

 router.get("/weather",(req,res)=>{
    res.render("weather");
 })


router.get("/login",(req,res)=>{
    res.render("login");
})

router.get("/register",(req,res)=>{
    res.render("register");
})


router.post("/register", async (req,res)=>{
    try{
        const email1 = req.body.email;
        const usermail= await Register.findOne({email:email1})
        if(email1===usermail.email){
            res.status(400).render("login",{
                Useralreadyexists : "User Already Exists !"
            });
        }
             else{
                const registerEmployee = new Register({
                    firstname : req.body.fname,
                    lastname : req.body.lname,
                    email : req.body.email,
                    password :  req.body.psw
                })
                    const registered= await  registerEmployee.save();
                   
                    res.status(201).render("login");
                   
            }
       
               
    
       
    }
    catch(e){
       
        res.status(200).render("login",{
            Useralreadyexists : "Email ID alreadyexists !"
        })
    }
})

router.post("/login", async (req,res)=>{
    try{
        
        
            email1 = req.body.email
            password1 = req.body.psw
          const usermail= await Register.findOne({email:email1})
          
            if(password1===usermail.password){
                res.status(200).render("weather",{
                    User : usermail.firstname,
                    Login : usermail.firstname
                })
            }

          else{
            res.status(200).render("login",{
                Useralreadyexists : "Wrong Password !"
            })
          }
          
       
    }
    catch(e){
        res.status(200).render("login",{
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
             
               
              res.render("weather",{
                LocationCountry:`${arrData[0].name}, ${arrData[0].sys.country}`,
                temp: `${Math.round(arrData[0].main.temp)}°C , ${weather}`,
                min:`Min ${Math.round(arrData[0].main.temp_min)} °C | Max ${Math.round(arrData[0].main.temp_max)} °C `

              })
    
            })

        })


module.exports = router;