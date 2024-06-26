const mongoose = require("mongoose");

const stateModel = mongoose.model(
  "states",
  new mongoose.Schema(
    {
      id: { type: String },
      name: { type: String },
      isoCode: { type: String },
      countryCode: { type: String },
      latitude: { type: Number },
      longitude: { type: Number },
      status: { type: String, enum: ["ACTIVE", "DEACTIVE"], default: "ACTIVE" },

      createdAt: Number,
      updatedAt: Number,
    },
    { timestamps: true }
  )
);

module.exports = { stateModel };
