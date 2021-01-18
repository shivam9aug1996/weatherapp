function validateForm() {
    //collect form data in JavaScript variables
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var email = document.getElementById("email1").value;
    var pw1 = document.getElementById("psw1").value;
    var pw2 = document.getElementById("cpsw1").value;
    var name1 = document.getElementById("fname1").value;
	var name2 = document.getElementById("lname1").value;
    
    //check empty first name field
    if(name1 == "") {
      document.getElementById("blankMsg").innerHTML = "**Fill the first name";
      return false;
    }
    
    //character data validation
    if(!isNaN(name1)){
      document.getElementById("blankMsg").innerHTML = "**Only characters are allowed";
      return false;
    }else{
      document.getElementById("blankMsg").innerHTML = "";
    }
   

   //character data validation
    if(!isNaN(name2)){
      document.getElementById("charMsg").innerHTML = "**Only characters are allowed";
      return false;
    } else{
      document.getElementById("charMsg").innerHTML = "";
    }

    if(!(email.match(mailformat))){
      document.getElementById("emailMsg").innerHTML = "**Email is not valid";
      return false;
      }else{
      document.getElementById("emailMsg").innerHTML = "";
    }
  
    //check empty password field
    if(pw1 == "") {
      document.getElementById("message1").innerHTML = "**Fill the password please!";
      return false;
    }
  
    //check empty confirm password field
    if(pw2 == "") {
      document.getElementById("message2").innerHTML = "**Enter the password please!";
      return false;
    } 
   
    //minimum password length validation
    if(pw1.length < 8) {
      document.getElementById("message1").innerHTML = "**Password length must be atleast 8 characters";
      return false;
    }else{
      document.getElementById("message1").innerHTML = "";
    }

    //maximum length of password validation
    if(pw1.length > 15) {
      document.getElementById("message1").innerHTML = "**Password length must not exceed 15 characters";
      return false;
    }else{
      document.getElementById("message1").innerHTML = "";
    }
  
    if(pw1 != pw2) {
      document.getElementById("message2").innerHTML = "**Passwords are not same";
      return false;
    } else{
      document.getElementById("message2").innerHTML = "";
    }
 }