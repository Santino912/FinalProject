import { Request, Response } from "express";
import Posts from "../../models/Posts";

const getByGenre = async (req: Request, res: Response) => {
    const { genres } = req.params;

    try {
        const allPosts = await Posts.find()
        if (genres === "with-all" || genres === undefined) {

            const posts = allPosts.sort((act, sig) => act.user.plan === "Premium" ? -1 : 1)
            return res.send({ posts, allPosts })

        } else {
            let arrGenres = genres.toString().replace(/-/g, "/").replace(/_/g, " ").split(",")

            const posts = await Posts.find({ genres: { $in: arrGenres } })
            return res.send(posts);
        }


    } catch (error) {
        return res.send(error);
    };
};

export default getByGenre;