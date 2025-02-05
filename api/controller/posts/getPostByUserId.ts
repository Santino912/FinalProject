import { Request, Response } from "express";
import Users from "../../models/Users";
import Posts from "../../models/Posts";

const getPostByUserId = async (req: Request, res: Response) => {
    const { idUser } = req.params;

    try {

        const user = await Users.findOne({ _id: idUser })
        const posts = await Posts.find({ "user._id": user?._id })
        return res.send(posts);

    } catch (error) {

        return res.status(500).send(error);
    };
}
export default getPostByUserId;