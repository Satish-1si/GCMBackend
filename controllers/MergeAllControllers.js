const fs=require("fs")
const path=require("path")

const GetControllersData=fs.readdirSync(path.resolve(__dirname))
let AllMethods={}
// let Eachfloders={}
GetControllersData.filter((Path_name,index)=>{/*iterate the controllers Data */
   if(!Path_name.endsWith(".js")){/*Identify the controllers sub floder (!.js)*/
      let SubfloderData=fs.readdirSync(path.join(__dirname,Path_name))/*access the sub floder Data ==[f,f,f,f]*/ 
      SubfloderData.map((file,idx)=>{/*in sub floder ==>again get the Data */
        let file_method=require(path.join(__dirname,Path_name,file))
        // Object.assign(Eachfloders,{[Path_name]:file_method,...Eachfloders[Path_name]})
        Object.assign(AllMethods,file_method)/*add th file methods in single object */
      })
   }
  
})

// console.log(AllMethods)
module.exports=AllMethods;

