import { Request, Response } from "express";
import Users from "../../models/Users";

const deleteUser = async (req: Request, res: Response) => {
    const { _id } = req.params;

    try {
        await Users.findOneAndDelete({ _id })

        res.send("User deleted")
    } catch (err) {
        console.log(err)
    }
};
export default deleteUser