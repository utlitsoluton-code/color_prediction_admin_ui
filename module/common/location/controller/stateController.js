const { Types } = require("mongoose");
const { State } = require("country-state-city");
const { stateModel } = require("../model/stateModel");

const addAllStates = async function (req, res) {
  try {
    let stateList = State.getStatesOfCountry("IN");
    // let stateCount = 0
    if (stateList.length) {
      // for (const state of stateList) {
      //     stateCount++;
      //     const findState = await stateModel.findOne({ name: state.name });
      //     if (findState) {
      //         await findState.updateOne({ $set: state })
      //     } else {
      //         await stateModel.create(state);
      //     }
      //     if (stateList.length === stateCount) {
      //         return res.json({
      //             meta: { msg: "Countries added Successfully.", status: true }
      //         });
      //     }
      // }
      await stateModel.insertMany(stateList);
    }
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

const stateList = async function (req, res) {
  try {
    const { status, searchKey, countryCode } = req.query;
    let contentPerPage = Number(req.query.contentPerPage || 0);
    let page = Number(req.query.page || 0);
    const findQuery = {
      ...(status && { status: status.toUpperCase() }),
      ...(countryCode && { countryCode: countryCode.toUpperCase() }),
      ...(searchKey && {
        $or: [
          { name: { $regex: `${searchKey}.*`, $options: "i" } },
          { isoCode: { $regex: `${searchKey}.*`, $options: "i" } },
          { phonecode: { $regex: `${searchKey}.*`, $options: "i" } },
        ],
      }),
    };
    const listData = await stateModel
      .find(findQuery)
      .sort({ name: 1 })
      .skip(contentPerPage * page - contentPerPage)
      .limit(contentPerPage)
      .select();
    if (listData.length) {
      const total = await stateModel.countDocuments(findQuery);
      return res.json({
        meta: { msg: "State list found successfully", status: true },
        data: listData,
        ...(contentPerPage && {
          pages: Math.ceil(total / contentPerPage || 1),
          total,
        }),
      });
    } else {
      return res.json({
        meta: { msg: "Data not found.", status: false },
      });
    }
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

const stateDetail = async (req, res) => {
  try {
    const { stateId } = req.params;
    if (!stateId) {
      return res.json({
        meta: { msg: "Parameter missing.", status: false },
      });
    }
    const detailData = await stateModel.findOne({
      _id: new Types.ObjectId(stateId),
    });
    if (detailData) {
      return res.json({
        meta: { msg: "Country details found.", status: true },
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

module.exports = {
  addAllStates,
  stateList,
  stateDetail,
};
