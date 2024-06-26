const slotRoutes = require("express").Router();
const { jwtAdminVerify } = require("../../../../helper/authHandler");
const {
  addSlot,
  slotList,
  slotDetail,
  updateSlot,
  changeStatus,
  // deleteSlot,
} = require("../controller/slotHandler");
const {
  slotJoiMiddleware,
  changeStatusJoiMiddleware,
} = require("../service/slotService");

slotRoutes.post("/add", jwtAdminVerify, slotJoiMiddleware, addSlot);
slotRoutes.get("/list", jwtAdminVerify, slotList);
slotRoutes.get("/details/:_id", jwtAdminVerify, slotDetail);
slotRoutes.put("/update/:_id", jwtAdminVerify, slotJoiMiddleware, updateSlot);
slotRoutes.put(
  "/status",
  jwtAdminVerify,
  changeStatusJoiMiddleware,
  changeStatus
);
// slotRoutes.delete("/delete/:_id", jwtAdminVerify, deleteSlot);

module.exports = slotRoutes;
