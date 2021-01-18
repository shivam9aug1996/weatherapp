function validateForm() {
    
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var email = document.getElementById("email1").value;
   
   
    if(!(email.match(mailformat))){
      document.getElementById("emailMsg").innerHTML = "**Email is not valid";
      return false;
      }else{
      document.getElementById("emailMsg").innerHTML = "";
    }
  
  
  
 }