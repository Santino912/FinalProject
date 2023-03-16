import { model, Schema } from "mongoose";

const comment = new Schema({
    idUser: {
        type: String,
        require: true
    },
    idPost: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },

    commentDate: {
        type: Date,
        default: Date.now()
    },
    userId: {
        type: Schema.Types.Mixed,
        ref: "User"
    }

})
export default model("Comment", comment)