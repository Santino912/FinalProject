import { Request, Response } from "express";
import Posts from "../../models/Posts";


const getByGenreWithAll = async (req: Request, res: Response) => {
    let { genres } = req.query;

    try {

        let allGenres = `${genres}`.split(",")
        const posts = await Posts.aggregate([
            { $match: { $text: { $search: "Premium" } } },
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
            { $sort: { score: { $meta: "textScore" }, posts: 1 } }
        ])

        const allPostsOrder = await Posts.aggregate([{ $match: { genres: { $in: allGenres } } },
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
        return res.send({ posts, allPosts: allPostsOrder })
    } catch (error) {
        return res.send(error);
    };
};

export default getByGenreWithAll;