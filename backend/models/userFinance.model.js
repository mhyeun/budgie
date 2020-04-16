const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userFinanceSchema = new Schema(
  {
    history: {
      type: Array,
    },
    goal: {
      type: Schema.Types.Mixed,
    },
    userId: {
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

const UserFinance = mongoose.model("UserFinance", userFinanceSchema);

module.exports = UserFinance;
