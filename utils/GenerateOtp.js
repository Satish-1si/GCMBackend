const { customAlphabet } = require("nanoid");

module.exports=function(no){
   // Define a custom alphabet (numeric only)
   const numericAlphabet = '0123456789';
   // Define the length of the OTP
   const otpLength = no;
   // Create a nanoid function with the custom alphabet and length
   const generateOTP = customAlphabet(numericAlphabet, otpLength);
   return generateOTP()
}

