const mongoose = require("mongoose");

const buzzUser = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    email: String,
    password: String,
  },

  { strict: false } // this line make the schema flexible and allow adding new fields to the object without changing the schema
);

module.exports = mongoose.models.users || mongoose.model("users", buzzUser);

export {};
