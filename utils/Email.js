const GENERATE_HTML=(userName,userotp)=>{
    return (`
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
       
        .container {
            background-color:#111421;
            border: solid 15px black;
            border-radius: 5px;
            height: 200px;
            width:600px;
            color: #EE4266;
            padding: 10px;
            box-sizing: border-box;
        }
        .header {
            text-align: center;
            margin-bottom: 10px;
            color:"white"
        }
        .child{
           color:white;
           fontWeight:"bold";
        }
           
        
    </style>
</head>
<body>
    <div class="container">
         <div class="header">
            <div class="child">
             <h1>Hey ${userName},</h1>
             <h6>Please Find Your One Time Otp Below</h6>
            </div>
            <h4>${userotp}</h4>
         </div>
    </div>
</body>
</html>

`)
}
const nodemailer=require("nodemailer");

const sendEmail=async(option)=>{
    console.log(option)
    // Step 1: Create a Nodemailer transporter ==> gamil settings
     let transporter =await nodemailer.createTransport({
        host: "smtp.gmail.com",     // SMTP server hostname (for Gmail)
        port: 587,                  // Port for TLS (587 for secure transmission)
        secure: false,              // TLS requires secure connection (false because we're using port 587)
        auth: {
           user: process.env.Email,  // Sender's email address
           pass: process.env.EmailPassword  // App-specific password for Gmail (generated for SMTP)
        }
});
// Step 2: Define email options
let mailOptions = {
      from: option.frommail,      // Sender's email address (who is sending the email)
      to: option.tomail  ,       // Recipient's email address (who will receive the email)
      subject: option.subject ,  // Subject line of the email
      text: option.link ,  // Plain text body of the email      
      html: GENERATE_HTML(option.userName, option.userotp), 
    
};

// Step 3: Send email
return transporter.sendMail(mailOptions).then((data)=> ({status:"success",message:data}))
                                       .catch((err)=>({ status:"unsuccess",message:err.message}))
                                
}
module.exports=sendEmail