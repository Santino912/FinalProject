import { Request, Response } from "express";
import Posts from "../../models/Posts";


const getByGenreWithAll = async (req: Request, res: Response) => {
    let { genres } = req.query;

    try {

        let allGenres = `${genres}`.split(",")
        const posts = await Posts.aggregate([
            { $match: { $text: { $search: "Premium" } } },
            { $sort: { score: { $meta: "textScore" }, posts: 1 } }
        ])

        const allPostsOrder = await Posts.find({ genres: { $in: allGenres } })

        return res.send({ posts, allPosts: allPostsOrder })
    } catch (error) {
        return res.send(error);
    };
};

export default getByGenreWithAll;