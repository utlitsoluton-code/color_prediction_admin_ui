const mongoose = require("mongoose");

const slotModel = mongoose.model(
  "slots",
  new mongoose.Schema(
    {
      slotNumber: { type: String },
      slotName: { type: String },
      startDate: { type: Number, default: 0 },
      startTime: { type: Number, default: 0 },
      endTime: { type: Number, default: 0 },

      status: {
        type: String,
        enum: ["OPEN", "CLOSE"],
        default: "OPEN",
      },
      winningNumber: {
        type: Number,
        default: null,
      },
      bets: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Bets",
        },
      ],

      createdAt: Number,
      updatedAt: Number,
    },
    { timestamps: true }
  )
);

module.exports = { slotModel };
