"use strict";
const { Types } = require("mongoose");
const { corporateModel } = require("../model/corporateModel");
const { stateModel } = require("../../location/model/stateModel");
const { cityModel } = require("../../location/model/cityModel");

const addCorporate = async function (req, res) {
  try {
    const {
      name,
      description,
      imageUrl,
      mobile,
      email,
      website,
      stateId,
      cityId,
      address,
      foundedDate,
    } = req.body;
    const findCorporate = await corporateModel.findOne({ name });
    if (findCorporate) {
      return res.json({
        meta: { msg: "Corporate already added with this name", status: false },
      });
    }
    const findState = await stateModel.findOne({
      _id: new Types.ObjectId(stateId),
    });
    if (!findState) {
      return res.json({
        meta: { msg: `State not found`, status: false },
      });
    }
    const findCity = await cityModel.findOne({
      _id: new Types.ObjectId(cityId),
    });
    if (!findCity) {
      return res.json({
        meta: { msg: `City not found`, status: false },
      });
    }
    const corporateData = await corporateModel.create({
      name,
      description,
      imageUrl,
      mobile,
      email,
      website,
      stateId,
      stateName: findState.name,
      cityId,
      cityName: findCity.name,
      address,
      foundedDate,
    });
    if (corporateData) {
      return res.json({
        meta: {
          msg: "Corporate added Successfully.",
          status: true,
        },
      });
    } else {
      return res.json({
        meta: { msg: "Something went wrong.", status: false },
      });
    }
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

const corporateList = async function (req, res) {
  try {
    const { status, searchKey, type } = req.query;
    let contentPerPage = Number(req.query.contentPerPage || 0);
    let page = Number(req.query.page || 0);
    const findQuery = {
      ...(type && { type: type.toUpperCase() }),
      ...(status && { status: status.toUpperCase() }),
      ...(searchKey && {
        $or: [
          { type: { $regex: `${searchKey}.*`, $options: "i" } },
          { name: { $regex: `${searchKey}.*`, $options: "i" } },
          { description: { $regex: `${searchKey}.*`, $options: "i" } },
          { mobile: { $regex: `${searchKey}.*`, $options: "i" } },
          { email: { $regex: `${searchKey}.*`, $options: "i" } },
          { website: { $regex: `${searchKey}.*`, $options: "i" } },
          { stateName: { $regex: `${searchKey}.*`, $options: "i" } },
          { cityName: { $regex: `${searchKey}.*`, $options: "i" } },
          { address: { $regex: `${searchKey}.*`, $options: "i" } },
        ],
      }),
    };
    const listData = await corporateModel
      .find(findQuery)
      .sort({ createdAt: -1 })
      .skip(contentPerPage * page - contentPerPage)
      .limit(contentPerPage)
      .select();
    if (listData.length) {
      const total = await corporateModel.countDocuments(findQuery);
      return res.json({
        meta: { msg: "Corporate found successfully", status: true },
        data: listData,
        ...(contentPerPage && {
          pages: Math.ceil(total / contentPerPage || 1),
          total,
        }),
      });
    } else {
      return res.json({
        meta: { msg: "List not found", status: false },
      });
    }
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

const corporateDetail = async (req, res) => {
  try {
    const { _id } = req.params;
    const detailData = await corporateModel.findOne({
      _id: new Types.ObjectId(_id),
    });
    if (detailData) {
      return res.json({
        meta: { msg: "Corporate details found.", status: true },
        data: detailData,
      });
    } else {
      return res.json({
        meta: { msg: "Something went wrong.", status: false },
      });
    }
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

const updateCorporate = async (req, res) => {
  try {
    const { _id } = req.params;
    const {
      name,
      description,
      imageUrl,
      mobile,
      email,
      website,
      stateId,
      cityId,
      address,
      foundedDate,
    } = req.body;
    const findState = await stateModel.findOne({
      _id: new Types.ObjectId(stateId),
    });
    if (!findState) {
      return res.json({
        meta: { msg: `State not found`, status: false },
      });
    }
    const findCity = await cityModel.findOne({
      _id: new Types.ObjectId(cityId),
    });
    if (!findCity) {
      return res.json({
        meta: { msg: `City not found`, status: false },
      });
    }
    const findCorporate = await corporateModel.findOne({
      name,
      _id: new Types.ObjectId(_id),
    });
    if (!findCorporate) {
      const findCorporateAgain = await corporateModel.findOne({
        name,
      });
      if (findCorporateAgain) {
        return res.json({
          meta: {
            msg: "Corporate already exist with this name.",
            status: false,
          },
        });
      }
    }
    const findQuery = { _id: new Types.ObjectId(_id) };
    const updateQuery = {
      name,
      description,
      imageUrl,
      mobile,
      email,
      website,
      stateId,
      stateName: findState.name,
      cityId,
      cityName: findCity.name,
      address,
      foundedDate,
    };
    const updateData = await corporateModel.findOneAndUpdate(findQuery, {
      $set: updateQuery,
    });
    if (updateData) {
      return res.json({
        meta: {
          msg: "Corporate updated Successfully.",
          status: true,
        },
      });
    } else {
      return res.json({
        meta: { msg: "Something went wrong.", status: false },
      });
    }
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

const changeStatus = async (req, res) => {
  try {
    const { _id, status } = req.body;
    const tempStatus = {
      ...(status.toLowerCase() === "active" && { status: "ACTIVE" }),
      ...(status.toLowerCase() === "deactive" && { status: "DEACTIVE" }),
    };
    if (!tempStatus.status) {
      return res.json({
        meta: {
          msg: "Invalid status, Please send a valid status.",
          status: false,
        },
      });
    }
    const updateCorporate = await corporateModel.findOneAndUpdate(
      { _id: new Types.ObjectId(_id) },
      { $set: tempStatus }
    );
    if (updateCorporate) {
      return res.json({
        meta: {
          msg: "Corporate status changed Successfully.",
          status: true,
        },
      });
    } else {
      return res.json({
        meta: { msg: "Something went wrong", status: false },
      });
    }
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

const deleteCorporate = async (req, res) => {
  try {
    const { _id } = req.params;
    // check for the donations for deleting
    const deleteCorporate = await corporateModel.deleteOne({
      _id: new Types.ObjectId(_id),
    });
    if (deleteCorporate.deletedCount > 0) {
      return res.json({
        meta: {
          msg: `Corporate deleted Successfully.`,
          status: true,
        },
      });
    } else {
      return res.json({
        meta: { msg: "Something went wrong", status: false },
      });
    }
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

module.exports = {
  addCorporate,
  corporateList,
  corporateDetail,
  updateCorporate,
  changeStatus,
  deleteCorporate,
};
