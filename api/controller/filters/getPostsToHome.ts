import { Request, Response } from "express";
import Posts from "../../models/Posts";


const getPostsToHome = async (_req: Request, res: Response) => {
    try {
        const posts = await Posts.aggregate([
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
            {
                $sort: { "user.plan": 1 },
            }
        ])

        return res.send(posts)
    } catch (error) {
        return res.send(error);
    };
};

export default getPostsToHome;