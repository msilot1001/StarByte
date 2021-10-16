const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    id: {
        type: Number,
    },
    username: {
        type: String,
    },
    bank: {
        type: Number,
        default: 0,
    },
    wallet: {
        type: Number,
        default: 0,
    },
    bitcoins: {
        type: Number,
        default: 0,
    },
    agreed: {
        type: Boolean,
        default: false,
    },
})

const User = mongoose.model("User", userSchema)

module.exports = {User}