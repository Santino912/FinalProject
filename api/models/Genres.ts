import { model, Schema } from "mongoose";

const genre = new Schema({
    name: {
        type: String,
        require: true
    },
})
export default model("Genres", genre)

