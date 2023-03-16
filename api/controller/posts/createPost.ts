import { Request, Response } from "express";
import Posts from "../../models/Posts";
import Users from "../../models/Users";


const createPost = async (req: Request, res: Response) => {
    const { description, title, content, idUser, genres, type, cover } =
        req.body;
    if (!description || !title || !content || !idUser || !genres || !type || !cover) return res.send("Empty body")
    try {
        const user = await Users.findOne({ _id: idUser })
        const post = await Posts.create({
            description,
            title,
            content,
            type,
            cover,
            user,
            genres
        });

        return res.json(post);
    } catch (err) {
        return res.status(500).send(err);
    }
}

export default createPost;