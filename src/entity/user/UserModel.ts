import mongoose from "mongoose";
import { v4 } from "uuid";

const schema = new mongoose.Schema({
    _id: { type: String, required: true, default: v4() },

    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    rules: [{ type: String, required: true }],

    joinedAt: { type: Date, default: Date.now() }
});

const UserModel = mongoose.model("User", schema);

export default UserModel;
