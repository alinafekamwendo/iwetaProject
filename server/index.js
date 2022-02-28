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
app.use(logger('dev'))
//app.use(bodyPrser.json());
//app.use(bodyPrser.urlencoded({extended:true}))
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

//for khola report
//whole route is localhost:3001/khola/report/vaccination/:id
//the id is khola id , you neeed to pass khola id 
const kholaReports=require("./src/routes/Reports");
app.use("/",kholaReports);

//USSD SESSIONS
const {Users,Khola}=require("./src/models");
app.get('/',(req,res)=>{

  res.send(dairy);
});


const   PORT=process.env.PORT||3001;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
  });
});