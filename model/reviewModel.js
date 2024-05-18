const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    imageOrVideo: {
        type: String,
    },
    userName: {
        type: String,
        required: true,
    },
    review: {
        type: String,
    },
});

const BankStatement = mongoose.model("reviews", reviewSchema);

module.exports = BankStatement;