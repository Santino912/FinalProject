import { Request, Response } from "express"
import Report from "../../models/Report"

const getReports = async (req: Request, res: Response) => {
    try {
        const reports = await Report.aggregate([{
            $lookup: {
                from: "posts",
                localField: "idPost",
                foreignField: "_id",
                as: "post",

            },
        },
        {
            $set: {
                post: { $arrayElemAt: ["$post", 0] }
            }
        }
        ])



        return res.send(reports)
    } catch (err) {
        return res.status(500).send(err)

    }
}
export default getReports