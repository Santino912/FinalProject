import { Request, Response } from "express"
import Users from "../../models/Users"

const downToRegular = async (req: Request, res: Response) => {
    const { _id } = req.body
    try {
        const user = await Users.findOneAndDelete({ _id })

        return res.send(user)
    } catch (err) {
        return res.status(500).send(err)
    }
}
export default downToRegular