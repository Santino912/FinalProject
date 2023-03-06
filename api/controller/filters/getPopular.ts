import { Request, Response } from "express";
import Posts from "../../models/Posts";

const getPopular = async (req: Request, res: Response) => {

    try {
        const posts = await Posts.find()
        const allPosts = await Posts.find()
        res.send({ posts: posts, allPosts: allPosts })
    } catch (err) {
        res.status(500).send(err)
    }

};

export default getPopular;