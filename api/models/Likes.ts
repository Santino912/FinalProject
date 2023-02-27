import { model, Schema } from "mongoose";

const like = new Schema({
  post: {
    ref: "Post",
    type: Schema.Types.Mixed
  },
  idUser: {
    type: String,
    require: true
  },
  isActive: {
    type: Boolean,
    require: true
  },
})
export default model("Like", like)


