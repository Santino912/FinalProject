import { Request, Response } from "express"
import Likes from "../../models/Likes"
import Users from "../../models/Users"

const getLikesByUserId = async (req: Request, res: Response) => {
    const { idUser } = req.params

    try {
        if (!idUser) return res.send([])

        const user = await Users.findOne({ _id: idUser })


        const likes = await Likes.aggregate([{ $match: { user: user?._id, isActive: true } },
        {
            $lookup: {
                from: "posts",
                localField: "post",
                foreignField: "_id",
                as: "post",
            },
        }, {
            $project: {
                post: { $first: "$post" },
                user: 1,
                isActive: 1
            }
        }
        ])
        return res.send(likes)
    } catch (err) {
        return res.status(500).send(err)
    }

}
export default getLikesByUserId