import { Request, Response } from "express"
import Follows from "../../models/Follows"
import Users from "../../models/Users"


const removeFollower = async (req: Request, res: Response) => {
    const { idUser, followTo } = req.body
    try {
        const user = await Users.findOne({ _id: idUser })
        const following = await Users.findOne({ _id: followTo })

        const followDeleted = await Follows.findOneAndDelete({ user, following })

        const follows = await Follows.find({ following })

        return res.send(follows)
    } catch (err) {
        return console.log(err)
    }
}
export default removeFollower