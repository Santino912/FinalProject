import { Request, Response } from "express";
import Posts from "../../models/Posts";


const deletePost = async (req: Request, res: Response) => {

    const { _id } = req.params;

    try {
        await Posts.findByIdAndDelete({ _id })
        return res.send('Post was successfully deleted');

    } catch (err) {
        return res.status(500).send(err);
    };
};

export default deletePost;