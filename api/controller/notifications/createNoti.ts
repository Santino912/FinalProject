import { Request, Response } from "express";
import Notifications from "../../models/Notifications";

const createNoti = async (req: Request, res: Response) => {

    const { title, content, fromUser } = req.body;

    try {
        const notification = await Notifications.create({
            title,
            content,
            fromUser
        });

        return res.json(notification);
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

export default createNoti;