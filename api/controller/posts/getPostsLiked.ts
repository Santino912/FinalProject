import { Request, Response } from "express";
import Users from "../../models/Users";
import Posts from "../../models/Posts";
import Likes from "../../models/Likes";

const getPostsLiked = async (req: Request, res: Response) => {
    const { idUser } = req.params;

    try {

        const user = await Users.findOne({ _id: idUser })

        const likes = await Likes.find({ user: user?._id })

        const arrLikes = likes.map(like => like.post)

        const posts = await Posts.find({ _id: { $in: arrLikes } })
        return res.send(posts);

    } catch (error) {

        return res.status(500).send(error);
    };
}
export default getPostsLiked;