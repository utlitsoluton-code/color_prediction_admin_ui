const mongoose = require("mongoose");

const corporateModel = mongoose.model(
  "corporates",
  new mongoose.Schema(
    {
      name: { type: String, required: true, index: true },
      description: { type: String, index: true },
      imageUrl: { type: String },
      mobile: { type: String },
      email: { type: String },
      website: { type: String },
      stateId: { type: mongoose.Types.ObjectId },
      stateName: { type: String },
      cityId: { type: mongoose.Types.ObjectId },
      cityName: { type: String },
      address: { type: String },
      foundedDate: { type: Number },

      status: {
        type: String,
        enum: ["ACTIVE", "DEACTIVE"],
        default: "ACTIVE",
      },
      createdAt: Number,
      updatedAt: Number,
    },
    { timestamps: true }
  )
);

module.exports = { corporateModel };
