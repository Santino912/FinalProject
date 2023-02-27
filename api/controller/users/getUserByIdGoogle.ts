import { Request, Response } from "express"
import Users from "../../models/Users"

const getUserByidGoogle = async (req: Request, res: Response) => {
    const { idGoogle } = req.params
    try {

        const user = await Users.findOne({ idGoogle })

        return res.send(user)
    } catch (err) {
        return console.log(err)
    }
}
export default getUserByidGoogle