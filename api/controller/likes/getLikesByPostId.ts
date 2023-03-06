import { Request, Response } from "express"
import Likes from "../../models/Likes"
import Posts from "../../models/Posts"
const getLikesByPostId = async (req: Request, res: Response) => {
    const { idPost } = req.params

    try {
        const post = await Posts.findOne({ _id: idPost })

        const likes = await Likes.find({ post: post?._id })
        return res.send(likes)
    } catch (err) {
        return res.status(500).send(err)
    }
}
export default getLikesByPostId