import { Request, Response } from "express";
import Comments from "../../models/Comments";


const deleteComment = async (req: Request, res: Response) => {

    const { _id } = req.params;

    try {
        await Comments.findByIdAndDelete({ _id });
        return res.send('Comment was successfully deleted');
    } catch (error) {
        return res.status(500).send(error);
    }
};

export default deleteComment;