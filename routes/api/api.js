const express = require("express");
const route = express.Router();
const imageController = require("../../controller/imageController");

route.post("/api/upload/single", imageController.singleUpload);

module.exports = route;
