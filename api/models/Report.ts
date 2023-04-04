import { model, Schema } from "mongoose";

const report = new Schema({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    idPost: {
        ref: "Post",
        type: Schema.Types.Mixed
    },
    idUser: {
        ref: "User",
        type: Schema.Types.Mixed
    }
});

export default model("Report", report);