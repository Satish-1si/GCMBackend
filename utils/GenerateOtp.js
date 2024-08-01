const { customAlphabet } = require("nanoid");

module.exports=function(){
   // Define a custom alphabet (numeric only)
   const numericAlphabet = '0123456789';
   // Define the length of the OTP
   const otpLength = 6;
   // Create a nanoid function with the custom alphabet and length
   const generateOTP = customAlphabet(numericAlphabet, otpLength);
   return generateOTP()
}

