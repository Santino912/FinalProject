import { Request, Response } from "express"
import Users from "../../models/Users";

const updateBanUser = async (req: Request, res: Response) => {

    const { _id, isBanned, reasonBan } = req.body;

    try {

        let user = await Users.findOneAndUpdate({ _id }, {
            isBanned,
            reasonBan
        });
        return res.send(user)
    } catch (err) {
        return res.send(err)

    }

}
export default updateBanUser