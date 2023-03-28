import { model, Schema } from "mongoose";

const user = new Schema({
  idGoogle: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  role: {
    type: String,
    enum: ["User", "Admin"],
    default: "User"
  },
  plan: {
    type: String,
    enum: ["Regular", "Premium"],
    default: "Regular"
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  username: {
    type: String,
    require: true
  },
  isBanned: {
    type: String,
    default: false
  },
  reasonBan: {
    type: String
  },
  avatar: {
    type: String,
    default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  },
  banner: {
    type: String,
    default: "https://cdn.pixabay.com/photo/2015/08/03/10/25/banner-873106_1280.jpg"
  },
  registerDate: {
    type: Date,
    default: Date.now()
  },
  paymentDate: {
    type: Date,
  },
  expirationDate: {
    type: Date,
  },

  pleasures: {
    type: Array,
  },
})
export default model("User", user)