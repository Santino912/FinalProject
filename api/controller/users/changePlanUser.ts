import { Request, Response } from "express";
import Users from "../../models/Users";

const changePlanUser = async (req: Request, res: Response) => {

    const { _id, plan } = req.body;

    try {
        const user = await Users.findOneAndUpdate({ _id }, { plan });


        return res.send(user);

    } catch (err) {
        res.status(404).send(err);
    }
};
export default changePlanUser