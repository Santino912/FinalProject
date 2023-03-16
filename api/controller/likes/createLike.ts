import { Request, Response } from "express"
import Likes from "../../models/Likes";
import Posts from "../../models/Posts";
import Users from "../../models/Users";

const createLike = async (req: Request, res: Response) => {
    const { idPost, idUser } = req.body;

    try {

        const post = await Posts.findOne({ _id: idPost })
        const user = await Users.findOne({ _id: idUser })
        const newLike = await Likes.create({
            post,
            user,
            isActive: true
        });

        return res.json(newLike);

    } catch (error) {

        return res.json(error);
    }
}

export default createLike