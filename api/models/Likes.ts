import { model, Schema } from "mongoose";

const like = new Schema({
  isActive: {
    type: Boolean,
    default: true
  },
  typePost: {
    type: String,
    require: true
  },
  post: {
    ref: "Post",
    type: Schema.Types.Mixed,
    require: true
  },
  user: {
    ref: "User",
    type: Schema.Types.Mixed,
    required: true
  },
})
export default model("Like", like)


