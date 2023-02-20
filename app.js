const express=require("express");
const request=require("request");  
const app=express();
const bodyParser=require("body-parser");
const https=require("https");
const { json } = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname));
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/signup.html");
});

app.listen(3000,function(req,res){
    console.log("server is running");
});
app.post("/",function(req,res) {
    const firstName=req.body.fname;
    const lastName=req.body.lname;
    const email=req.body.email;

    var data={
        members:[
            {
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName
            }
            }
        ]
    };
    const jsonData=JSON.stringify(data);
    const options={
        method:"POST",
        auth:"adarsh:034a254dfc7e8a3a3a2bf8fc8bb270bd-us17"
    }

    const url="https://us17.api.mailchimp.com/3.0/lists/fe265ab24b"
    const request=https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
            console.log(request.statusCode);
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
            
        })
    });
    request.write(jsonData);
    request.end();
})
app.post("/failure",function (req,res) {    
    res.redirect("/");
})


// 034a254dfc7e8a3a3a2bf8fc8bb270bd-us17
// fe265ab24b