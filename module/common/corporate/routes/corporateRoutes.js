const corporateRoutes = require("express").Router();
const { jwtAdminVerify } = require("../../../../helper/authHandler");
const {
  addCorporate,
  corporateList,
  corporateDetail,
  updateCorporate,
  changeStatus,
  deleteCorporate,
} = require("../controller/corporateHandler");
const {
  corporateJoiMiddleware,
  changeStatusJoiMiddleware,
} = require("../service/corporateService");

corporateRoutes.post(
  "/add",
  jwtAdminVerify,
  corporateJoiMiddleware,
  addCorporate
);
corporateRoutes.get("/list", jwtAdminVerify, corporateList);
corporateRoutes.get("/details/:_id", jwtAdminVerify, corporateDetail);
corporateRoutes.put(
  "/update/:_id",
  jwtAdminVerify,
  corporateJoiMiddleware,
  updateCorporate
);
corporateRoutes.put(
  "/status",
  jwtAdminVerify,
  changeStatusJoiMiddleware,
  changeStatus
);
corporateRoutes.delete("/delete/:_id", jwtAdminVerify, deleteCorporate);

module.exports = corporateRoutes;
