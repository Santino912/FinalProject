import { model, Schema } from "mongoose";

const chat = new Schema({
    messages: [
        {
            ref: "Messages",
            type: Schema.Types.ObjectId,
        },
    ]
});
export default model("Chat", chat);