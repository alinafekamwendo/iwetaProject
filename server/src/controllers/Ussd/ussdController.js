
const express = require("express");
const ussdController = express();
const cors = require("cors");
const swaggerUI=require("swagger-ui-express");
const YAML=require('yamljs');
const bodyPrser=require('body-parser');
const swaggerJSDocs=YAML.load("./swagger.yaml");
const logger = require('morgan');
const dotenv=require("dotenv").config();
const {Users}=require("../../models")
//const dairy=require("./src/models/DairyData.json");

ussdController.use(express.json());
ussdController.use(cors());
ussdController.use(logger('dev'))
//
// const str = '01-01-2020';

// // get everything after first dash
// const slug = str.substring(str.indexOf('-') + 1); // 01-2020

//app.use(bodyPrser.json());
//app.use(bodyPrser.urlencoded({extended:true}))
ussdController.use(express.urlencoded({extended:true}));

ussdController.post('/', async (req, res,next) => {

  let {sessionId,
    serviceCode, 
    phoneNumber, 
    text} = req.body
    let response;
if(text==="")
{
 response='CON Enter your username'

}
if(text!=="")
{
  // let incoming=text.split('*');
  // const username=incoming[0];
  // const password=incoming[1];
  // const user=Users.findOne({where:{username:username,password:password}});
  // console.log(user);
  console.log(`incomings ${incoming}`);
response='CON enter your password'
}

// setTimeout(()=>{
//   console.log(text);
//   res.send(response);
//   res.end();
// },20000);
   
  });

ussdController.get("/get",(req,res,next)=>{
  try {
    res.status(200).send("USSD RUNNING");
  
  } catch (error) {
    next(error);
  }
 
})

  module.exports =ussdController;