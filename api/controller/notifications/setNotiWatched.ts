import { Request, Response } from "express";
import Notifications from "../../models/Notifications";
import Users from "../../models/Users";

const setNotiWatched = async (req: Request, res: Response) => {

    const { idUser } = req.params;

    try {
        const user = await Users.find({ _id: idUser })
        const notification = await Notifications.findOneAndUpdate({ to: user }, { watched: true })
        return res.send(notification)
    } catch (err) {
        return res.status(500).send(err);
    }
};

export default setNotiWatched;