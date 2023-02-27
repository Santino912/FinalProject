import { Request, Response } from "express";
import Comments from "../../models/Comments";

const getByPostId = async (req: Request, res: Response) => {

    const { idPost } = req.params;

    try {

        const comments = await Comments.find({ idPost });

        return res.json(comments);

    } catch (error) {

        return res.status(500).send(error);
    };
};

export default getByPostId