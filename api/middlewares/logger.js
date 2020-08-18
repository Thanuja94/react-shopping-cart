let logger = (req,res,next)=>{

console.log("user"); 
 next();
}
module.exports = logger;