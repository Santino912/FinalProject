
import { Request, Response } from "express";
import Follows from "../../models/Follows";
import Users from "../../models/Users";

const getFollowsByIdUser = async (req: Request, res: Response) => {
    const { idUser } = req.params
    try {

        const user = await Users.findOne({ _id: idUser })
        const follows = await Follows.find({ following: user })

        return res.send(follows)
    } catch (err) {
        return res.status(500).send(err)
    }
}
export default getFollowsByIdUser