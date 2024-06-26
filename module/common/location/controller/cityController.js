const { Types } = require("mongoose");
const { City } = require("country-state-city");
const { cityModel } = require("../model/cityModel");

const addAllCities = async function (req, res) {
  try {
    let cityList = City.getCitiesOfCountry("IN");
    // let cityCount = 0
    if (cityList.length) {
      // for (const city of cityList) {
      //     cityCount++;
      //     const findCity = await cityModel.findOne({ name: city.name });
      //     if (findCity) {
      //         await findCity.updateOne({ $set: city })
      //     } else {
      //         await cityModel.create(city);
      //     }
      //     if (cityList.length === cityCount) {
      //         return res.json({
      //             meta: { msg: "Countries added Successfully.", status: true }
      //         });
      //     }
      // }
      const aad = await cityModel.insertMany(cityList);
      if (aad) {
        console.log(aad);
      }
    }
  } catch (error) {
    return res.json({
      meta: { msg: error.message, status: false },
    });
  }
};

const cityList = async function (req, res) {
  try {
    const { status, searchKey, countryCode, stateCode } = req.query;
    // if(!stateCode){
    //     return res.json({
    //         meta: { msg: "State code is required.", status: false },
    //       });
    // }
    let contentPerPage = Number(req.query.contentPerPage || 0);
    let page = Number(req.query.page || 0);
    const findQuery = {
      ...(countryCode && { countryCode: countryCode.toUpperCase() }),
      ...(stateCode && { stateCode: stateCode.toUpperCase() }),
      ...(status && { status: status.toUpperCase() }),
      ...(searchKey && {
        $or: [
          { name: { $regex: `${searchKey}.*`, $options: "i" } },
          { isoCode: { $regex: `${searchKey}.*`, $options: "i" } },
          { phonecode: { $regex: `${searchKey}.*`, $options: "i" } },
        ],
      }),
    };
    const listData = await cityModel
      .find(findQuery)
      .sort({ name: 1 })
      .skip(contentPerPage * page - contentPerPage)
      .limit(contentPerPage)
      .select();
    if (listData.length) {
      const total = await cityModel.countDocuments(findQuery);
      return res.json({
        meta: { msg: "City list found successfully", status: true },
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

const cityDetail = async (req, res) => {
  try {
    const { cityId } = req.params;
    if (!cityId) {
      return res.json({
        meta: { msg: "Parameter missing.", status: false },
      });
    }
    const detailData = await cityModel.findOne({
      _id: new Types.ObjectId(cityId),
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
  addAllCities,
  cityList,
  cityDetail,
};
