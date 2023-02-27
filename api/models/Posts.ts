import { model, Schema } from "mongoose";

const post = new Schema({
    title: {
        type: String,
        require: true
    },
    type: {
        type: String,
        enum: ["video", "audio"]
    },
    postDate: {
        type: Date,
        default: Date.now()
    },
    idShared: {
        ref: "User",
        type: Schema.Types.ObjectId
    },
    genres: {
        type: Array,
        require: true
    },
    duration: String,
    content: String,
    cover: String,
    description: String
});
export default model("Post", post);