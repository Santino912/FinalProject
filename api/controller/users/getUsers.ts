import { Request, Response } from "express"
import Users from "../../models/Users"

const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await Users.find()
        return res.send(users)
    } catch (err) {
        return console.log(err)
    }
}

export default getUsers