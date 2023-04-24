import { Request, Response } from "express";
import Posts from "../../models/Posts";
import axios from "axios";

const getByGenre = async (req: Request, res: Response) => {
    const { genres } = req.params;

    try {
        const allPosts = await axios.get("/posts")
        if (genres === "with-all" || genres === undefined) {

            const posts = await Posts.aggregate([{ $sort: { plan: "Premium" ? 1 : -1 } },
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

        } else {
            let arrGenres = genres.toString().replace(/-/g, "/").replace(/_/g, " ").split(",")

            const posts = await Posts.aggregate([{ $match: { genres: { $in: arrGenres } } },
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
        }


    } catch (error) {
        return res.send(error);
    };
};

export default getByGenre;