import { Request, Response } from "express";
import Follows from "../../models/Follows";
import Users from "../../models/Users";
import axios from "axios";

const createFollower = async (req: Request, res: Response) => {
    const { idUser, followTo } = req.body
    try {
        const user = await Users.findOne({ _id: idUser })
        const userToFollow = await Users.findOne({ _id: followTo })

        const following = await Follows.exists({ user: user?._id, following: userToFollow?._id })

        if (following !== null) {
            await axios.put(`${process.env.HOST}/follow/change`, { idUser, followTo });
            return
        }
        const content = `${user?.name} has started following you`
        const title = `${user?.name}`

        await Follows.create({ user, following: userToFollow })
        await axios.post(`${process.env.HOST}/notifications/create`, { title, content, fromUserId: idUser, idToUser: followTo, idPost: user });
        return res.send("Follow created")
    } catch (err) {
        return console.log(err)
    }
}
export default createFollower