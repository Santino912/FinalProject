import { Request, Response } from "express"
import Likes from "../../models/Likes"
import Users from "../../models/Users"
const getLikesByUserId = async (req: Request, res: Response) => {
    const { idUser } = req.params

    try {
        const user = await Users.findOne({ _id: idUser })

        const like = await Likes.find({ user: user?._id })

        return res.send(like)
    } catch (err) {
        return res.status(500).send(err)
    }

}
export default getLikesByUserId