import { Request, Response } from "express"
import Likes from "../../models/Likes"

const getLikesWithPosts = async (req: Request, res: Response) => {
    const { idUser } = req.params
    try {
        const likeAndPost = await Likes.find({ idUser })

        res.status(500).send(likeAndPost)
    } catch (err) {

    }
}
export default getLikesWithPosts