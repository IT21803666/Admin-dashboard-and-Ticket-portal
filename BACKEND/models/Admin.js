//model created to interact with the admin collection in mongodb

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
});

const Admin = mongoose.model('admin', AdminSchema);
module.exports = Admin;
