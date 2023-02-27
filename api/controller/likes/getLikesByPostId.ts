import { Request, Response } from "express"
import Likes from "../../models/Likes"
const getLikesByPostId = async (req: Request, res: Response) => {
    const { idPost } = req.params

    try {
        const like = await Likes.find({ post: { _id: idPost } })

        res.send(like)
    } catch (err) {
        res.status(500).send(err)
    }
}
export default getLikesByPostId