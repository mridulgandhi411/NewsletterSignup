//jshint esversion:6

const express=require("express");
const bodyParser=require("body-parser");
const request = require("request");

app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));



app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
});



app.post("/",function(req,res){
  var firstName=req.body.firstName;
  var lastName=req.body.lastName;
  var email=req.body.email;

  var data = {
    members : [
      {
        email_address: email,
        status: "subscribed",
        merge_fields : {
          FNAME: firstName,
          LNAME: lastName
        }
    }
    ]
  };

  var jsonData = JSON.stringify(data);

  console.log(jsonData);

  var options = {
   url: 'https://us3.api.mailchimp.com/3.0/lists/fced777104',
   method: "POST",
   headers: {
     "Authorization": "mridulgandhi411 bff660922090efa80f970e466dc933f0-us3"
   } ,
   body: jsonData
 };


request(options,function(error,response,body){
  if (error) {
    res.sendFile(__dirname + "/failure.html");
  } else {
     if(response.statusCode===200) {
       res.sendFile(__dirname + "/success.html");
     }
     else {
       res.sendFile(__dirname + "/failure.html");
     }
  }
});



});

app.post("/failure" , function(req,res){
    res.redirect("/");
});

app.listen(3000,function(){
  console.log("Server is running at port 3000");
});


//API KEY
//bff660922090efa80f970e466dc933f0-us3

//audience ID
//fced777104
