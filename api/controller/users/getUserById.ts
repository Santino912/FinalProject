import { Request, Response } from "express";
import Users from "../../models/Users";

const getUserById = async (req: Request, res: Response) => {
    const { _id } = req.params;
    try {

        const userFinded = await Users.findOne({ _id })

        const user = await Users.aggregate([{ $match: { _id: userFinded?._id } },
        {
            $lookup: {
                from: "posts",
                localField: "_id",
                foreignField: "user._id",
                as: "posts",
                pipeline: [{
                    $lookup: {
                        from: "likes",
                        localField: "_id",
                        foreignField: "post",
                        as: "likes",
                        pipeline: [{ $match: { isActive: true } }]
                    },
                }, { $addFields: { countLikes: { $size: "$likes" } } }]
            },
        },
        {
            $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "user",
                as: "likedPosts",
                pipeline: [{ $match: { isActive: true } }]
            },
        },
        {
            $lookup: {
                from: "follows",
                localField: "_id",
                foreignField: "following",
                as: "followers",
                pipeline: [{ $match: { isActive: true } }]
            }
        },
        {
            $lookup: {
                from: "follows",
                localField: "_id",
                foreignField: "user",
                as: "following",
                pipeline: [{ $match: { isActive: true } }]

            },
        },
        { $addFields: { followingCount: { $size: "$following" }, followersCount: { $size: "$followers" } } }
        ])
        return res.send(user[0])
    } catch (error) {

        return res.status(500).send(error);

    }
}
export default getUserById