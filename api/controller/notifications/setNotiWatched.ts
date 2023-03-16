import { Request, Response } from "express";
import Notifications from "../../models/Notifications";
import Users from "../../models/Users";

const setNotiWatched = async (req: Request, res: Response) => {

    const { _id } = req.params;

    try {
        const notification = await Notifications.findOneAndUpdate({ _id }, { watched: true })
        return res.send(notification)
    } catch (err) {
        return res.status(500).send(err);
    }
};

export default setNotiWatched;