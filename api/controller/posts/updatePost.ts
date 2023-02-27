import { Request, Response } from "express";


const updatePost = async (req: Request, res: Response) => {

    const { _id } = req.params;
    const { description, title, content } = req.body;

    try {
        /*         let post = await Posts.findOne({ where: { _id } });
                post.update({
                    description,
                    title,
                    content,
                });
                await post.save();
                res.send(post); */

    } catch (err) {
        res.status(500).send(err);
    }
};
export default updatePost