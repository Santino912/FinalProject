import { Request, Response } from "express";
import Notifications from "../../models/Notifications";
import Users from "../../models/Users";

const createNoti = async (req: Request, res: Response) => {

    const { title, content, fromUser, userId } = req.body;

    try {
        const userTo = await Users.findOne({ _id: userId })
        const user = await Users.findOne({ _id: fromUser })
        const notification = await Notifications.create({
            title,
            content,
            fromUser: user?._id,
            to: userTo?._id
        });

        return res.json(notification);
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

export default createNoti;