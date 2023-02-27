import { Request, Response } from "express";
import Posts from "../../models/Posts";

const getPostById = async (req: Request, res: Response) => {
    const { _id } = req.params;

    try {

        const post = await Posts.find({ _id })

        return res.json(post);

    } catch (error) {

        return res.status(500).send(error);
    };
}
export default getPostById;