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
    postDateNumber: {
        type: Number,
        default: Date.now()
    },
    user: {
        ref: "Users",
        type: Schema.Types.Mixed
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