import mongoose from "mongoose";
import { v4 } from "uuid";

const schema = new mongoose.Schema({
    _id: { type: String, required: true, default: v4() },
    channelUuid: { type: String, required: true, unique: true, ref: "Channel" },

    name: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },

    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 }
});

const VideoModel = mongoose.model("Video", schema);

export default VideoModel;
