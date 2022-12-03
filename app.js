const path = require('path');
const express = require("express");
const https =require("https");
const bodyParser = require("body-parser");
const request =("request");

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));




app.get("/",function(req,res){
  res.sendFile(__dirname +"/signup.html");
});


app.get("/",function(req,res){
  res.sendFile(__dirname +"/index.html");

});


app.route('/*').get(function(req, res) { 
  return res.sendFile(path.join(__dirname, 'public/index.html')); 
  
});
//app.get("/",function(req,res){
  //res.sendFile(__dirname +"/css/favicon.ico");
//});


//app.get("/",function(req,res){
  //res.sendFile(__dirname +"/css/styles.css");
//});


app.post("/",function(req,res){

    var vorname=req.body.fName;
    var nachname = req.body.nName;
    var email = req.body.email;




//object erstellen und members array für Request body parmeters
const data ={
  members:[{
    email_address:email,
    status:"subscribed",
    merge_fields:{
      FNAME:vorname,
      LNAME:nachname
    }
  }
  ]
};

const url = "https://us21.api.mailchimp.com/3.0/lists/1e78587392";

const option ={
  method :"POST",
  auth:"KAREEM1:0fa6dac00d6052288ade29fa4b947155-us21" // من اجل المصادقة 
}


const jsonData = JSON.stringify(data);

const request = https.request(url,option,function(response){
  if (response.statusCode === 200){
    res.sendFile(__dirname + "/index.html");
  }else{
    res.sendFile(__dirname + "/failure.html");
  }
response.on("data",function (data){
  console.log(JSON.parse(data));
 })
})



request.write(jsonData);
request.end();

});

app.post("/index",function(req,res){
 res.redirect("/");
});



app.post("/failure",function(req,res){
  res.redirect("/");
 });
  
 
 //app.post("/css",function(req,res){
 // res.redirect("/");
 //});
  

app.listen(process.env.PORT || 3000,function(){
    console.log("3000 on the server");
})
//API key
//0fa6dac00d6052288ade29fa4b947155-us21

//1e78587392
//const jsonData = JSON.stringify(data); joson file organieseren