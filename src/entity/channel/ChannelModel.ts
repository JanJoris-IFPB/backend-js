import mongoose from "mongoose";

const schema = new mongoose.Schema({
    _id: { type: String, required: true },
    userUuid: { type: String, required: true, unique: true, ref: "User" },

    name: { type: String, required: true },
    about: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },

    subscribers: { type: Number, default: 0 },
});

const ChannelModel = mongoose.model("Channel", schema);

export default ChannelModel;
