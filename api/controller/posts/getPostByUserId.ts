import { Request, Response } from "express";
import Users from "../../models/Users";
import Posts from "../../models/Posts";

const getPostByUserId = async (req: Request, res: Response) => {
    const { idUser } = req.params;

    try {

        const user = await Users.findOne({ _id: idUser })
        const posts = await Posts.aggregate([{ $match: { _id: user?._id } },
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
        return res.send(posts);

    } catch (error) {

        return res.status(500).send(error);
    };
}
export default getPostByUserId;