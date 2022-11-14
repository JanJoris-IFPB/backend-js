import mongoose from "mongoose";

const schema = new mongoose.Schema({
    _id: { type: String, required: true },

    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rules: [{ type: String, required: true }],

    joinedAt: { type: Date, default: Date.now() }
});

const UserModel = mongoose.model("User", schema);

export default UserModel;
