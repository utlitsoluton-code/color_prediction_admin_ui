const locationRoutes = require("express").Router();

const {
  addAllStates,
  stateList,
  stateDetail,
} = require("../controller/stateController");
const {
  addAllCities,
  cityList,
  cityDetail,
} = require("../controller/cityController");

// locationRoutes.post("/state", addAllStates);
locationRoutes.get("/state", stateList);
locationRoutes.get("/state/:stateId", stateDetail);

// locationRoutes.post("/city", addAllCities);
locationRoutes.get("/city", cityList);
locationRoutes.get("/city/:cityId", cityDetail);

module.exports = locationRoutes;
