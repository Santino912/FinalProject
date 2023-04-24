import { Request, Response } from "express";
import Posts from "../../models/Posts";

const getPostById = async (req: Request, res: Response) => {
    const { _id } = req.params;

    try {

        const postOne = await Posts.findOne({ _id })

        const post = await Posts.aggregate([{ $match: { _id: postOne?._id } },
        {
            $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "post",
                as: "likes",
                pipeline: [{ $match: { isActive: true } }]
            }
        },
        { $addFields: { countLikes: { $size: "$likes" } } }
        ])
        return res.send(post[0]);

    } catch (error) {

        return res.status(500).send(error);
    };
}
export default getPostById;