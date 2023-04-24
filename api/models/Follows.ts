import { model, Schema } from "mongoose";

const follow = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    following: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    isActive: {
        type: Boolean,
        default: true
    }
});
export default model("Follow", follow);