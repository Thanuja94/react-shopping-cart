const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const express = require('express'); 
const router = express.Router();

 //create a write stream, in append mode, so we don’t overwrite the old logs everytime we write  a new one.  
let accessLogStream = fs.createWriteStream(path.join(__dirname, 'userLogs.log'),{flags: "a"}); 

let getLogger = router.get('/',async function (req, res, next) {
  next(); 
}); 

router.use(morgan(':method :url :date :url => :status',{
  interval: '7d', // logs will rotate every week
  stream: accessLogStream  ,
  noColors: true 
})); 

module.exports =  getLogger;
