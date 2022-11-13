import mongoose from "mongoose";

const schema = new mongoose.Schema({
    _id: { type: String, required: true },
    channelUuid: { type: String, required: true, ref: "Channel" },

    name: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },

    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 }
});

const VideoModel = mongoose.model("Video", schema);

export default VideoModel;
