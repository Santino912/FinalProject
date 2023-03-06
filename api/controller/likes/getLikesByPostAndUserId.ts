import { Request, Response } from "express"
import Likes from "../../models/Likes"
import Posts from "../../models/Posts"
import Users from "../../models/Users"

const getLikesByPostAndUserId = async (req: Request, res: Response) => {
    const { idPost, idUser } = req.params
    try {
        const user = await Users.findOne({ _id: idUser })

        const post = await Posts.findOne({ _id: idPost })

        const like = await Likes.findOne({ user: user?._id, post: post?._id })

        const allData = { _id: like?._id, isActive: like?.isActive, post, user }

        res.send(allData)
    } catch (err) {
        res.status(500).send(err)
    }
}
export default getLikesByPostAndUserId