//model created to interact with the manager collection in mongodb

const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },

  //back end for managers country
  country: {
    type: String,
  },

});

const Manager = mongoose.model('Manager', managerSchema);

module.exports = Manager;
