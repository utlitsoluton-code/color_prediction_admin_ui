"use strict";
const { Types } = require("mongoose");
const { slotModel } = require("../model/slotModel");

const addSlot = async function (req, res) {
  try {
    const { slotNumber, slotName, startDate, startTime, endTime } = req.body;
    const findSlot = await slotModel.findOne({ slotNumber, status: "OPEN" });
    if (findSlot) {
      return res.json({
        meta: { msg: "Open slot already with this number.", status: false },
      });
    }
    const addSlot = { slotNumber, slotName, startDate, startTime, endTime };
    const addSlotData = await slotModel.create(addSlot);
    if (addSlotData) {
      return res.json({
        meta: { msg: "Slot added Successfully.", status: true },
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

const slotList = async function (req, res) {
  try {
    const { status, searchKey } = req.query;
    let contentPerPage = Number(req.query.contentPerPage || 0);
    let page = Number(req.query.page || 0);
    const findQuery = {
      ...(status && { status: status.toUpperCase() }),
      ...(searchKey && {
        $or: [
          { slotName: { $regex: `${searchKey}.*`, $options: "i" } },
          { slotNumber: { $regex: `${searchKey}.*`, $options: "i" } },
        ],
      }),
    };
    const listData = await slotModel
      .find(findQuery)
      .sort({ createdAt: -1 })
      .skip(contentPerPage * page - contentPerPage)
      .limit(contentPerPage)
      .select();
    if (listData.length) {
      const total = await slotModel.countDocuments(findQuery);
      return res.json({
        meta: { msg: "Slot list found successfully", status: true },
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

const slotDetail = async (req, res) => {
  try {
    const { _id } = req.params;
    const detailData = await slotModel.findOne({
      _id: new Types.ObjectId(_id),
    });
    if (detailData) {
      return res.json({
        meta: { msg: "Slot details found.", status: true },
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

const updateSlot = async (req, res) => {
  try {
    const { _id } = req.params;
    const { slotNumber, slotName, startDate, startTime, endTime } = req.body;
    const findSlot = await slotModel.findOne({
      slotNumber,
      status: "OPEN",
      _id: new Types.ObjectId(_id),
    });
    if (!findSlot) {
      const findSlotAgain = await slotModel.findOne({
        slotNumber,
        status: "OPEN",
      });
      if (findSlotAgain) {
        return res.json({
          meta: { msg: "Slot already exist with this number.", status: false },
        });
      }
    }
    const findQuery = { _id: new Types.ObjectId(_id), status: "OPEN" };
    const updateQuery = {
      slotNumber,
      slotName,
      startDate,
      startTime,
      endTime,
    };
    const updateData = await slotModel.findOneAndUpdate(findQuery, {
      $set: updateQuery,
    });
    if (updateData) {
      return res.json({
        meta: { msg: "Slot updated Successfully.", status: true },
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
      // ...(status.toLowerCase() === "delete" && { status: "DELETE" }),
    };
    if (!tempStatus.status) {
      return res.json({
        meta: {
          msg: "Invalid status, Please send a valid status.",
          status: false,
        },
      });
    }
    const updateSlot = await slotModel.findOneAndUpdate(
      { _id: new Types.ObjectId(_id) },
      { $set: tempStatus }
    );
    if (updateSlot) {
      return res.json({
        meta: { msg: "Slot status changed Successfully.", status: true },
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

const deleteSlot = async (req, res) => {
  try {
    const { _id } = req.params;
    const deleteSlot = await slotModel.deleteOne({
      _id: new Types.ObjectId(_id),
    });
    if (deleteSlot.deletedCount > 0) {
      return res.json({
        meta: { msg: `Slot deleted Successfully.`, status: true },
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
  addSlot,
  slotList,
  slotDetail,
  updateSlot,
  changeStatus,
  // deleteSlot,
};
