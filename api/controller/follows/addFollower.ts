import { Request, Response } from "express";
import Follows from "../../models/Follows";
import Users from "../../models/Users";

const addFollower = async (req: Request, res: Response) => {
    const { idUser, followTo } = req.body
    try {
        const user = await Users.findOne({ _id: idUser })
        const following = await Users.findOne({ _id: followTo })

        const followCreated = await Follows.create({ user, following })

        const follows = await Follows.find({ following })
        return res.send(follows)
    } catch (err) {
        return console.log(err)
    }
}
export default addFollower