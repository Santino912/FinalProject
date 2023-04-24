
import { Request, Response } from "express";
import Follows from "../../models/Follows";
import Users from "../../models/Users";

const updateFollow = async (req: Request, res: Response) => {
    const { idUser, followTo } = req.body
    try {
        const user = await Users.findOne({ _id: idUser })
        const following = await Users.findOne({ _id: followTo })


        const follow = await Follows.findOne({ user: idUser, following: followTo, })

        await Follows.findOneAndUpdate({ user, following }, { isActive: !follow?.isActive })

        return res.send(follow)
    } catch (err) {
        return res.status(500).send(err)
    }
}
export default updateFollow