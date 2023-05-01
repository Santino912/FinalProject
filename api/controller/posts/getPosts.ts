import { Request, Response } from "express"
import Posts from "../../models/Posts"
import { setMatch, setMatchWithName } from "./utils"
import Users from "../../models/Users"

const getPosts = async (req: Request, res: Response) => {
    const { genres, order, type, name } = req.query
    try {
        const orderTime = order === "desc" ? -1 : 1
        if (typeof type !== "string" || typeof genres !== "string" && genres !== undefined || typeof name !== "string" && name !== undefined) return res.send("Type fail")
        if (name === undefined) {
            const match = setMatch(type, genres)

            const allPosts = await Posts.aggregate([
                { $match: match },
                {
                    $lookup: {
                        from: "likes",
                        localField: "_id",
                        foreignField: "post",
                        as: "likes",
                        pipeline: [{ $match: { isActive: true } }]
                    },
                },
                { $addFields: { countLikes: { $size: "$likes" } } },
                { $sort: { postDateNumber: orderTime } }
            ])
            return res.send(allPosts)
        }
        else {
            const match = setMatchWithName(type, genres, name)

            const allPosts = await Posts.aggregate([
                { $match: match },
                {
                    $lookup: {
                        from: "likes",
                        localField: "_id",
                        foreignField: "post",
                        as: "likes",
                        pipeline: [{ $match: { isActive: true } }]
                    },
                },
                { $addFields: { countLikes: { $size: "$likes" } } },
                { $sort: { postDateNumber: orderTime } }
            ])
            const allUsers = await Users.find({ name: { $regex: name, $options: "i" } })
            return res.send({ allPosts, allUsers })
        }


    } catch (err) {
        return res.send(err)
    }
}

export default getPosts