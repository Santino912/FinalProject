import { Request, Response } from "express";
import Notifications from "../../models/Notifications";
import Users from "../../models/Users";

const getNotiByUser = async (req: Request, res: Response) => {
    const { idGoogle } = req.params;

    try {

        const user = await Users.findOne({ idGoogle })
        const notifications = await Notifications.find({ to: user?._id, watched: false, disable: false })

        return res.send(notifications)
    } catch (error) {

        return res.status(500).send(error);
    };
};

export default getNotiByUser;