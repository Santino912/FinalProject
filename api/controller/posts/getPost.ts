import { Request, Response } from "express"
import Posts from "../../models/Posts"


const getPosts = async (req: Request, res: Response) => {
    try {
        const allPosts = await Posts.find()
        res.send(allPosts)
    } catch (err) {
        res.send(err)
    }
}

export default getPosts