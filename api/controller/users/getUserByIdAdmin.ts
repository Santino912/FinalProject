import { Request, Response } from "express";
import { UserToFind } from "../../types";
import Users from "../../models/Users";

const getUserById = async (req: UserToFind, res: Response) => {
    const { _id } = req.params;
    try {
        const user = await Users.findOne({ _id })
        return res.send(user)
    } catch (error) {

        return res.status(500).send(error);

    }
}
export default getUserById