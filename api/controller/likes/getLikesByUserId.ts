import { Request, Response } from "express"
import Likes from "../../models/Likes"
const getLikesByUserId = async (req: Request, res: Response) => {
    const { idUser } = req.params

    try {
        const like = await Likes.find({ idUser })

        res.send(like)
    } catch (err) {
        res.status(500).send(err)
    }

}
export default getLikesByUserId