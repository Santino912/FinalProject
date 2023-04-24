import { Request, Response } from "express";
import Posts from "../../models/Posts";

const getByTime = async (req: Request, res: Response) => {
    let { order } = req.params;

    try {

        const num = order === "asc" ? 1 : -1
        const posts = await Posts.aggregate([{ $sort: { postDateNumber: num } }, {
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


        const allPosts = posts


        return res.send({ posts, allPosts })
    } catch (err) {
        return res.status(500).send(err)
    }
};

export default getByTime;