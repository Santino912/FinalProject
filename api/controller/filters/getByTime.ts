import { Request, Response } from "express";
import Posts from "../../models/Posts";

const getByTime = async (req: Request, res: Response) => {
    let { order } = req.params;

    try {

        if (order === "asc") {
            const posts = await Posts.aggregate([{ $sort: { postDateNumber: 1 } }])
            const allPosts = posts

            return res.send({ posts, allPosts })

        } if (order === "desc") {
            const posts = await Posts.aggregate([{ $sort: { postDateNumber: -1 } }])
            const allPosts = posts

            return res.send({ posts, allPosts })
        }
    } catch (err) {
        return res.status(500).send(err)
    }
};

export default getByTime;