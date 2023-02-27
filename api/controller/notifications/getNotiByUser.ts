import { Request, Response } from "express";
import Notifications from "../../models/Notifications";
import Users from "../../models/Users";

const getNotiByUser = async (req: Request, res: Response) => {
    const { idGoogle } = req.params;

    try {

        const user = await Users.find({ idGoogle })
        //const notification = await Notifications.findOne({ user });


        //return res.json(notification);

    } catch (error) {

        return res.status(500).send(error);
    };
};

export default getNotiByUser;