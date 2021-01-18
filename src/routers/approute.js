
const express = require("express");
const router = new express.Router();
const Register = require("../models/register")



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
       
        res.status(400).send("error");
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
                Useralreadyexists : "Wrong Email or Password !"
            })
          }
       
    }
    catch(e){
        res.status(400).status(e);
    }
})

module.exports = router;