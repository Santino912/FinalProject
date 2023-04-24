import { Request, Response } from "express";
import Users from "../../models/Users";
import Likes from "../../models/Likes";
import Posts from "../../models/Posts";

const getLikedUserPost = async (req: Request, res: Response) => {
    const { type, idUser } = req.params;

    try {
        if (!type || !idUser) return res.send([])
        const user = await Users.findOne({ _id: idUser })
        const likes = await Likes.find({ typePost: type, user: user?._id })
        const likesID = likes.map(like => like.post)
        const posts = await Posts.aggregate([{ $match: { _id: { $in: likesID } } },
        {
            $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "post",
                as: "likes",

            }
        }, { $addFields: { countLikes: { $size: "$likes" } } }])
        return res.send(posts)
    } catch (error) {

        return res.status(500).send(error);
    };
}

export default getLikedUserPost