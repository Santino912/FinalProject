import { Request, Response } from "express"
import Report from "../../models/Report"
import Posts from "../../models/Posts"
import Users from "../../models/Users"

const createReport = async (req: Request, res: Response) => {
    const { content, title, idUser, idPost } = req.body
    try {

        const user = await Users.findOne({ _id: idUser })

        const post = await Posts.findOne({ _id: idPost })

        const report = await Report.create({ content, title, idUser: user, idPost: post })
        return res.send(report)
    } catch (err) {
        return res.send(err)

    }

}
export default createReport