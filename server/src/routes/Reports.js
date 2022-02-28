const express = require("express");
const reportsRoute = express.Router();
const reportController = require("../controllers/Reports/KholaReportController");

reportsRoute.get("/khola/report/vaccination/:id",reportController);




module.exports = reportsRoute;