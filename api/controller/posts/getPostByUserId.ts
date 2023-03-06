import { Request, Response } from "express";
import Posts from "../../models/Posts";
import Users from "../../models/Users";

const getPostByUserId = async (req: Request, res: Response) => {
    const { idUser } = req.params;

    try {

        const user = await Users.findOne({ _id: idUser })
        const posts = await Posts.find({ user })

        return res.json(posts);

    } catch (error) {

        return res.status(500).send(error);
    };
}
export default getPostByUserId;