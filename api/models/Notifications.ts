import { model, Schema } from "mongoose";

const notification = new Schema({
    title: {
        type: Object,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    watched: {
        type: Boolean,
        default: false
    },
    disable: {
        type: Boolean,
        default: false
    },
    to: {
        ref: "User",
        type: Schema.Types.ObjectId,
        require: true
    },
    fromUser: {
        ref: "User",
        type: Schema.Types.ObjectId,
        require: true
    },
    post: {
        ref: "Post",
        type: Schema.Types.Mixed
    }
});
export default model("Notifications", notification);
