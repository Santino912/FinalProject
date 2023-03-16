import { Request, Response } from "express";
import Comments from "../../models/Comments";
import Users from "../../models/Users";

const createComment = async (req: Request, res: Response) => {

    const { content, idPost, idUser } = req.body;

    try {
        const user = await Users.findOne({ _id: idUser })
        const comment = await Comments.create({
            content,
            idPost,
            idUser,
            userId: idUser
        });

        return res.send("Comment created")
    } catch (error) {

        return res.json(error);
    }
};
export default createComment