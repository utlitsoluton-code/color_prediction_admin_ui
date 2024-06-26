const mongoose = require("mongoose");

const cityModel = mongoose.model(
  "cities",
  new mongoose.Schema(
    {
      stateId: { type: String },
      id: { type: String },
      name: { type: String },
      cityNameAlias: { type: String },
      isoCode: { type: String },
      countryCode: { type: String },
      stateCode: { type: String },
      latitude: { type: Number },
      longitude: { type: Number },
      status: { type: String, enum: ["ACTIVE", "DEACTIVE"], default: "ACTIVE" },

      createdAt: Number,
      updatedAt: Number,
    },
    { timestamps: true }
  )
);

module.exports = { cityModel };
