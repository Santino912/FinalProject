import { Request, Response } from "express"
import Posts from "../../models/Posts"


const getPosts = async (req: Request, res: Response) => {
    try {
        let allPosts = await Posts.aggregate([
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
        ])
        return res.send(allPosts)
    } catch (err) {
        return res.send(err)
    }
}

export default getPosts