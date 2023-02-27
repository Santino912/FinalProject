import { Request, Response } from "express";

const setNotiDisabled = async (req: Request, res: Response) => {

    const { _id } = req.params;

    try {
        /*         const notification = await Notifications.findByPk(_id);
        
                notification.update({
                    disabled: true
                });
        
                await notification.save();
                return res.send(notification); */

    } catch (error) {
        res.status(400).send(error);
    }
};

export default setNotiDisabled