import { model, Schema } from "mongoose";

const report = new Schema({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    }
});

export default model("Report", report);