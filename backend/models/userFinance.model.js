const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userFinanceSchema = new Schema(
  {
    history: {
      type: Array,
    },
    goals: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const UserFinance = mongoose.model("UserFinance", userFinanceSchema);

module.exports = UserFinance;
