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
                },

            },
            { $addFields: { countLikes: { $size: "$likes" } } },
            { $sort: { countLikes: -1 } }
        ],)
        return res.send({ posts, allPosts })
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }

};

export default getPopular;