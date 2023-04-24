import { Request, Response } from "express";
import Notifications from "../../models/Notifications";
import Users from "../../models/Users";
import Posts from "../../models/Posts";

const createNoti = async (req: Request, res: Response) => {

    const { title, content, fromUserId, idToUser, idPost } = req.body;
    try {
        const post = await Posts.findOne({ _id: idPost })
        const fromUser = await Users.findOne({ _id: fromUserId })
        const to = await Users.findOne({ _id: idToUser })
        const notification = await Notifications.create({
            title,
            content,
            fromUser,
            to,
            post
        });
        return res.send(notification);
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

export default createNoti;