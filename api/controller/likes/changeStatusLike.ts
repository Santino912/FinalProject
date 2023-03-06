import { Request, Response } from "express"
import Likes from "../../models/Likes"
import Posts from "../../models/Posts"
import Users from "../../models/Users"

const changeStatusLike = async (req: Request, res: Response) => {
    const { idPost, userId, isActive } = req.body
    try {
        const user = await Users.findOne({ _id: userId })
        const post = await Posts.findOne({ _id: idPost })
        const like = await Likes.findOneAndUpdate({ post: post?._id, user: user?._id }, { isActive })
        res.send(like)
    } catch (err) {

        res.status(500).send(err)
    }

}
export default changeStatusLike