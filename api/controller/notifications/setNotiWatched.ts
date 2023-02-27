import { Request, Response } from "express";
import Notifications from "../../models/Notifications";

const setNotiWatched = async (req: Request, res: Response) => {

    const { _id } = req.params;

    try {
        /*         const notification = await Notifications.findOne(_id);
        
                notification.update({
                    watched: true
                });
        
                await notification.save(); 
        return res.send(notification);*/

    } catch (err) {
        res.status(500).send(err);
    }
};

export default setNotiWatched;