const mongoose = require("mongoose")

const PropertySchema = new mongoose.Schema({
    currentOwner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true,
        min: 6,
    },
       type: {
        type: String,
        enum: ["Room", "Hostel", "Flat"],
        required: true
    },
    desc: {
        type: String,
        required: true,
        min: 50,
    },
    img: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    sqmeters: {
        type: Number,
        required: true,
        min: 1   //1 se 15 kerna h
    },
    continent: {
        type: String,
        required: true
    },
    beds: {
        type: Number,
        required: true,
        min: 1
    },
    bookmarkedUsers: {
        type: [String],
        default: []
    }
}, {timestamps: true})

module.exports = mongoose.model("Property", PropertySchema)