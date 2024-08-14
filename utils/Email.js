const nodemailer=require("nodemailer");

const OTP_GENERATE_HTML=(option)=>{
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
             <h1>Hey ${option.data.username},</h1>
             <h6>Please Find Your One Time Otp Below</h6>
            </div>
            <h4>${option.data.sendOtp.OTP}</h4>
         </div>
    </div>
</body>
</html>

`)
}
const ExtensionNo_GENERATE_HTML = (Option) => {
    return (`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    font-family: Arial, sans-serif;
                }
                .container {
                    background-color: #111421;
                    border: solid 15px black;
                    border-radius: 5px;
                    width: 600px;
                    color: #EE4266;
                    padding: 20px;
                    box-sizing: border-box;
                    margin: 0 auto;
                }
                .header {
                    text-align: center;
                    margin-bottom: 20px;
                    color: white;
                }
                .content {
                    color: white;
                    font-weight: normal;
                    line-height: 1.5;
                }
                .permissions {
                    margin-top: 15px;
                    font-weight: bold;
                }
                h1, h4 {
                    margin: 0;
                }
                h1 {
                    font-size: 24px;
                }
                h4 {
                    font-size: 20px;
                    margin-top: 20px;
                }
                ul {
                    list-style-type: none;
                    padding: 0;
                }
                ul li {
                    margin-bottom: 10px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Hey ${Option.data.username},</h1>
                </div>
                <div class="content">
                    <p>Congratulations! Your OTP has been successfully verified, and your account has been activated in <strong>ModeThree</strong>.</p>
                    <p>Here are your Mode Extension details:</p>
                    <ul>
                        <li><strong>Username:</strong> ${Option.data.username}</li>
                        <li><strong>Email:</strong> ${Option.data.email}</li>
                        <li><strong>Phone Number:</strong> ${Option.data.PhoneNumber || 'Not Provided'}</li>
                        <li><strong>Extension Number:</strong>${Option.data.ExtensionNo}</li>
                    </ul>
                    <div class="permissions">
                        <p>Permissions Granted:</p>
                        <ul>
                            <li>1.GSM Calls   2.Audio Calls</li>
                            <li>3.Audio Calls 4.Audio Conference</li>
                            <li>5.Audio Conference 6.Video Calls</li>
                        </ul>
                    </div>
                    <p>Thank you for using our service. If you have any questions, feel free to reach out to our support team.</p>
                    <p>Best regards,</p>
                    <p>Gcm Technologies</p>
                </div>
            </div>
        </body>
        </html>
    `);
};

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
      html: (option?.type==="verifyOtp")?OTP_GENERATE_HTML(option):ExtensionNo_GENERATE_HTML(option) 
    };

    // Step 3: Send email
    return transporter.sendMail(mailOptions).then((data)=> ({status:"success",message:data}))
                                            .catch((err)=>({ status:"unsuccess",message:err.message}))
                                
}
module.exports=sendEmail