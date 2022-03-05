const express = require("express");
const KholaController = express.Router();
const {VaccinationData:Vaccination,Khola: Kholas } = require("../../models");
const { validateToken } = require("../../../middlewares/AuthMiddleware");
const vaccines=require("../../models/Vaccines.json")

KholaController.get("/khola/All", async (req, res,next) => {
try {
  
} catch (error) {
  const makola = await Kholas.findAll();
  res.status(200).json({makola});

}

});

 KholaController.get("/khola/ByUserId/:id", async (req, res,next) => {
try {
  const id = req.params.id;
  const makolaById = await Kholas.findAll({ where: {UserId: id}});
  res.status(200).json(makolaById);
} catch (error) {
  next(error);
}
 });


 
 KholaController.get("/khola/ById/:id", async (req, res,next) => {
   try {
    const id = req.params.id;
    const khola=await Kholas.findOne({where:{id:id}});
    if(khola){
     res.status(200).json(khola);
    }else{
      res.status(404).json("Not found");
    }
   } catch (error) {
     next(error);
   }
  
  });

 KholaController.get("/api/khola/livestock/Report/:id", async (req, res,next) => {
   try {
    const id = req.params.id;
    const vaccinated = await Kholas.findAll({ where: {KholaId: id,Vaccinated:true}});
   //const vaccinated = await UserLivestocks.findAll({ where: {Vaccinated:true}});
    const unVaccinated = await Kholas.findAll({ where: {KholaId: id,Vaccinated:false}});
   //const unVaccinated = await UserLivestocks.findAll({ where: {Vaccinated:false}});
    const totalVaccinated=vaccinated.length;
    const totalUnvaccinated=unVaccinated.length;
   // const allLivestock=totalUnvaccinated+totalVaccinated;
   const userlivestock=[{
     "Vaccinated":"vaccinated",
     "Total":totalVaccinated
   },{
     "Vaccinated":"unVaccinated",
     "Total":totalUnvaccinated
   }
 ];
    res.status(200).json({userlivestock});
   } catch (error) {
     next(error);
   }
  
  });


KholaController.post("/khola/create/:id",validateToken, async (req, res,next) => {

  try {
    // vaccines.map((element) => {

    //   const populated= Vaccination.findOne({where:{id:element.id}});
    
    // if(populated){
     
    // }else{
    //   Vaccination.create(element);
    // }
    // });
    
    
     const id=req.params.id;
      const {KholaName,Location,AnimalType,Breed,Number}=req.body;
        const khola = req.body;
        const duplicate=await Kholas.findOne({where:{KholaName:KholaName,Location:Location,AnimalType:AnimalType,Breed:Breed,Number:Number,UserId:id}})
      // UserLivestock.username = req.user.username;
      if(duplicate){
        return res.status(406).json("duplicates are not allowed")
      }
    
      try {
        khola.username=req.user.username;
        khola.UserId=id;
             await Kholas.create(khola);
      res.status(200).json(khola);
      } catch (error) {
        
      }
    
  } catch (error) {
    next(error);
  }
//populate  vaccine data

  
});


 KholaController.delete("/khola/delete/:id", async (req, res,next) => {
   try {
    const livestockID = req.params.id;
    await Kholas.destroy({
      where: {
        id:livestockID,
      },
    });
    res.status(200).json("DELETED SUCCESSFULLY");
   } catch (error) {
     next(error);
   }
 
});

KholaController.put("/khola/update/:id", async (req, res,next) => {
 
try {
  const id = req.params.id;
  
  await Kholas.update(req.body,{
    where: {
      id:id,
    },
  });
  res.status(200).json("updated succesfully");
} catch (error) {
next(error);
}

});

module.exports = KholaController;