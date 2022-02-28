const express = require("express");
const KholaReportController = express.Router();
const { Khola: Kholas,VaccinationData:VaccinationData } = require("../../models");
const { validateToken } = require("../../../middlewares/AuthMiddleware");

//generating report
KholaReportController.get("/khola/report/vaccination/:id",async (req, res) => {
    const kholaId=req.params.id;

    //derived variables
    const khola=await Kholas.findOne({where:{id:kholaId}});
    const vaccines=await VaccinationData.findAll();
    //variables
    const numberOfAnimals=khola.Number;
    const kholaName=khola.KholaName;
    const typeOfAnimal=khola.AnimalType;
    const location=khola.Location;
    const created=khola.createdAt;
    //testing
    console.log("khola created on :",created);
    console.log("khola name :",kholaName);
    console.log("khola for :",typeOfAnimal);
    console.log("Located at:",location);


  
    //three months later
    var threeMonthsLater = new Date(created);
            threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);
    //six months later
    var sixMonthsLater = new Date();
            sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 3);
    //console.log(new Date());

       //function to return number of months collapsed
 function getNumberOfMonths(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const monthDiff = endDate.getMonth() - startDate.getMonth() +
    (12 * (endDate.getFullYear() - startDate.getFullYear()));

    return monthDiff;
}
  

   let finalReport=[];
    //number of months
     const numberOfmonths=getNumberOfMonths(new Date("October 14,2021"), new Date());
     console.log(`number of months is ${numberOfmonths}`);

     vaccines.forEach(element => {
         if(numberOfmonths<3){
            const totalDosage=element.Dosage*numberOfAnimals;
            finalReport.push({
                "Type":element.TypeOfVaccine,
                "Age of vaccine(in months)":element.AgeOfVaccination,
                "Dosage (in ml)":element.Dosage,
                "Total Dosage(in ml)":totalDosage,
                "EffectiveAfter":element.EffectiveAfter,
                "Duration":element.Duration,
                "Revaccination":element.Revaccination,
                "Next Vaccination Day":sixMonthsLater,
                "status":"pending vaccination"
            });
         }else if(numberOfmonths>3 && numberOfmonths<6){
             if(element.AgeOfVaccination===">3 months"){
                 const totalDosage=element.Dosage*numberOfAnimals;
                finalReport.push({
                    "Type":element.TypeOfVaccine,
                    "Age of vaccine(in months)":element.AgeOfVaccination,
                    "Dosage (in ml)":element.Dosage,
                    "Total Dosage(in ml)":totalDosage,
                    "EffectiveAfter":element.EffectiveAfter,
                    "Duration":element.Duration,
                    "Revaccination":element.Revaccination,
                    "Next Vaccination Day":sixMonthsLater,
                    "status":"Missing vaccination"
                });
             }
             if(element.AgeOfVaccination===">6 months"){
                const totalDosage=element.Dosage*numberOfAnimals;
                finalReport.push({
                    "Type":element.TypeOfVaccine,
                    "Age of vaccine(in months)":element.AgeOfVaccination,
                    "Dosage (in ml)":element.Dosage,
                    "Total Dosage(in ml)":totalDosage,
                    "EffectiveAfter":element.EffectiveAfter,
                    "Duration":element.Duration,
                    "Revaccination":element.Revaccination,
                    "Next Vaccination Day":sixMonthsLater,
                    "status":"pending vaccination"
                });
             }

         }else{
            const totalDosage=element.Dosage*numberOfAnimals;
            finalReport.push({
                "Type":element.TypeOfVaccine,
                "Age of vaccine(in months)":element.AgeOfVaccination,
                "Dosage (in ml)":element.Dosage,
                "Total Dosage(in ml)":totalDosage,
                "EffectiveAfter":element.EffectiveAfter,
                "Duration":element.Duration,
                "Revaccination":element.Revaccination,
                "Next Vaccination Day":sixMonthsLater,
                "status":"Missing vaccination"
            });
           
         }
        
     });
 console.log(`length of report array ${finalReport.length}`);
 console.log("The entire report is",finalReport)
     res.status(200).json({list:finalReport});
  });
  
module.exports = KholaReportController;