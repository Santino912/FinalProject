import { model, Schema } from "mongoose";

const follow = new Schema({
    following: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
});
export default model("Follow", follow);