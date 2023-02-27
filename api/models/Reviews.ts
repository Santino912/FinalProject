import { model, Schema } from "mongoose";

const review = new Schema({
    userId: {
        ref: "User",
        type: Schema.Types.ObjectId
    },
    name: {
        type: String,
        require: true
    },
    rating: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    avatar: String
});

export default model("Review", review);