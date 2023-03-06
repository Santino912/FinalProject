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
    to: {
        ref: "User",
        type: Schema.Types.ObjectId
    },
    fromUser: {
        ref: "User",
        type: Schema.Types.ObjectId
    },
    disable: {
        type: Boolean,
        default: false
    }
});
export default model("Notifications", notification);
