const mongoose = require("mongoose");

const managerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  born: {
    type: Date,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  isAdmin: {
    type: Number,
    default: 0,
  },

  isDoctor: {
    type: Number,
    default: 0,
  },

  isPharmacy: {
    type: Number,
    default: 0,
  },

  isLab: {
    type: Number,
    default: 0,
  },

  isInfo: {
    type: Number,
    default: 0,
  },

  password: {
    type: String,
    required: true,
  },

  DoctorCategort: {
    type: String,
    default: "غير محدد"
  },

  Date: {
    type: Date,
    default: Date.now(),
  },
});

const manager = mongoose.model("Manager", managerSchema, "Manager");
module.exports = manager;
