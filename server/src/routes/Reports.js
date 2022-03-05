const express = require("express");
const reportsRoute = express.Router();
const reportController = require("../controllers/Reports/KholaReportController");

reportsRoute.get("/khola/report/vaccination/:id",reportController);
reportsRoute.post('/sms',reportController);




module.exports = reportsRoute;