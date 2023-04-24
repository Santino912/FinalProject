import { Request, Response } from "express"
import Likes from "../../models/Likes"

const changeStatusLike = async (req: Request, res: Response) => {
    const { post, user } = req.body
    try {

        const likeExist = await Likes.findOne({ post, user })
        const like = await Likes.findOneAndUpdate({ post, user }, { isActive: !likeExist?.isActive })
        return res.send(like)
    } catch (err) {

        return res.status(500).send(err)
    }

}
export default changeStatusLike