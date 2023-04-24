import { Request, Response } from "express";
import Posts from "../../models/Posts";

const getPopular = async (_req: Request, res: Response) => {
    try {
        const allPosts = await Posts.find()
        let posts = await Posts.aggregate([
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
        return res.send({ posts, allPosts })
    } catch (err) {
        res.status(500).send(err)
    }

};

export default getPopular;