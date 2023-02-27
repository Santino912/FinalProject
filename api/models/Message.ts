import { model, Schema } from "mongoose";

const message = new Schema({
    content: {
        type: String,
        require: true
    },
    dmDate: {
        type: Date,
        default: Date.now()
    },
    idSender: {
        ref: "User",
        type: Schema.Types.ObjectId,
        require: true
    },
    idReceiver: {
        ref: "User",
        type: Schema.Types.ObjectId,
        require: true
    }
})

export default model("Message", message)