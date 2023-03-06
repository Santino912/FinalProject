import { Request, Response } from "express"
import Users from "../../models/Users"

const getCountUserGraphs = async (req: Request, res: Response) => {
    try {
        const bannedCount = await Users.count({ isBanned: true })

        const premiumCount = await Users.count({ plan: "Premium" })

        const regularCount = await Users.count({ plan: "Regular" })

        return res.send({ bannedCount, premiumCount, regularCount })
    } catch (err) {
        console.log(err)
    }
}
export default getCountUserGraphs