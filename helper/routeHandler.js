const { Router } = require("express");
const baseRouter = Router();
const basePath = "/api/admin";

const adminRoutes = require("../module/admin/routes/adminRoutes");
const imageRoutes = require("../module/common/common-image/routes/imageRoutes");
const pageRoutes = require("../module/common/static-pages/routes/staticPageRoutes");
const locationRoutes = require("../module/common/location/routes/locationRoutes");
const corporateRoutes = require("../module/common/corporate/routes/corporateRoutes");
const slotRoutes = require("../module/modules/slot/routes/slotRoutes");

baseRouter.use("/", adminRoutes);
baseRouter.use("/upload", imageRoutes);
baseRouter.use("/page", pageRoutes);
baseRouter.use("/location", locationRoutes);
baseRouter.use("/slot", slotRoutes);

module.exports = { baseRouter, basePath };
