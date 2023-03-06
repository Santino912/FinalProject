import { Request, Response } from "express";
import Posts from "../../models/Posts";


/* const sortResult = (sort ) => {

}
 */

const getByTime = async (req: Request, res: Response) => {
    let { order } = req.params;

    try {
        const posts = await Posts.find()

        if (order === "asc") {
            const allPosts = await Posts.find({ $query: {}, $orderby: { postDateNumber: 1 } })

            return res.send({ posts, allPosts })

        } if (order === "desc") {
            const allPosts = await Posts.find({ $query: {}, $orderby: { postDateNumber: - 1 } })

            return res.send({ posts, allPosts })
        }
    } catch (err) {
        return res.status(500).send(err)
    }
};

export default getByTime;