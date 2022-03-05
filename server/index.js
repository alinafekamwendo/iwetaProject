const express = require("express");
const app = express();
const cors = require("cors");
const swaggerUI=require("swagger-ui-express");
const YAML=require('yamljs');
const bodyPrser=require('body-parser');
const swaggerJSDocs=YAML.load("./swagger.yaml");
const logger = require('morgan');
const dotenv=require("dotenv").config();
app.use(express.json());
app.use(cors());
//vaccinate
const {VaccinationData:Vaccination,Khola: Kholas } = require("./src/models");
const vaccines=require("./src/models/Vaccines.json");
app.use(logger('dev'))
//socket

app.use(express.urlencoded({extended:true}));


app.use('/api/swagger-docs',swaggerUI.serve,swaggerUI.setup(swaggerJSDocs));

const db = require("./src/models");

// Routers
const postRouter = require("./src/routes/Posts");
app.use("/posts", postRouter);
const commentsRouter = require("./src/routes/Comments");
app.use("/comments", commentsRouter);
const usersRouter = require("./src/routes/Users");
app.use("/", usersRouter);
const likesRouter = require("./src/routes/Likes");
app.use("/likes", likesRouter);
const breedsRouter=require("./src/routes/Breeds");
app.use("/api/breeds",breedsRouter);
const livestockRouter=require("./src/routes/Livestock");
const userLivestock=require("./src/routes/UserLivestockRoute");
app.use("/",userLivestock);
app.use("/api/livestock",livestockRouter);
const kholaRoute=require("./src/routes/Khola");
app.use("/",kholaRoute);
//notifications
const pushNotifications=require("./src/routes/PushNotificationsRoute");
app.use("/notifications",pushNotifications);

//ussd
const ussd=require("./src/routes/Ussd");
app.use("/",ussd);

//for khola report
//whole route is localhost:3001/khola/report/vaccination/:id
//the id is khola id , you neeed to pass khola id 
const kholaReports=require("./src/routes/Reports");
app.use("/",kholaReports);

// ...

// Schedule tasks to be run on the server.no


app.get('/',(req,res)=>{

  res.send("IWETA SERVER RUNNING");
});

//populate vaccines
const populate=async()=>{
try {
  vaccines.map((element) => {

    const populated= Vaccination.findAll({where:{id:element.id}});
  if(!populated){
    console.log("already populated");
    Vaccination.update(element);
    console.log("updated succesfully");
  }else{
    Vaccination.create(element);
  }
  });
} catch (error) {
  
}
}



//
// app.use('*',(req,res,next)=>{
//   const error=new Error(`Not Found ${req.baseUrl}`);
//   error.status=404;
//   next(error);
// });

app.use((error,req,res,next)=>{
  const statusCode=error.status||500
  res.status(statusCode).json({
    message: error.message,
    stack:error.stack
  });
  next(error);
});
const   PORT=process.env.PORT||3001;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
  });
});