import { Request, Response } from "express";
import Notifications from "../../models/Notifications";
import Users from "../../models/Users";

const setNotiDisabled = async (req: Request, res: Response) => {

    const { _id, idUser } = req.params;

    try {
        const notification = await Notifications.findOneAndDelete({ _id })

        const notifications = await Notifications.find({ to: idUser })
        return res.send(notifications)
    } catch (err) {
        return res.status(500).send(err);
    }
};

export default setNotiDisabled