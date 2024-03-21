const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supportSchema = new mongoose.Schema({
    ticketId: {
        type: Schema.Types.ObjectId,
        ref: 'Ticket',
        required: true,
    },
    reply: {
        type: String,
        required: true,
    },
});

const Support = mongoose.model('Support', supportSchema);

module.exports = Support;
