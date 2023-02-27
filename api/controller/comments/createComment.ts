import { Request, Response } from "express";
import Comments from "../../models/Comments";

const createComment = async (req: Request, res: Response) => {

    const { content, idPost, idUser } = req.body;

    try {

        await Comments.create({
            content,
            idPost,
            idUser,
        });
        return res.send("Comment created")
    } catch (error) {

        return res.json(error);
    }
};
export default createComment