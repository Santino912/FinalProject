import { Request, Response } from "express";
import Notifications from "../../models/Notifications";
import Users from "../../models/Users";

const getNotiByUser = async (req: Request, res: Response) => {
    const { _id } = req.params;

    try {
        const user = await Users.findOne({ _id })
        const notifications = await Notifications.find({ to: user?._id, disable: false })
        return res.send(notifications)
    } catch (error) {

        return res.status(500).send(error);
    };
};

export default getNotiByUser;