import { Request, Response } from "express"
import axios from "axios"
import Likes from "../../models/Likes";
import Posts from "../../models/Posts";
import Users from "../../models/Users";

const createLike = async (req: Request, res: Response) => {
    const { idPost, fromUser, idUser } = req.body;

    try {
        const post = await Posts.findOne({ _id: idPost })
        const user = await Users.findOne({ _id: fromUser })
        const like = await Likes.exists({ user: user?._id, post: post?._id })

        if (like !== null) {
            await axios.put(`${process.env.HOST}/likes`, { post, user });
            return
        }
        const content = `${user?.name} has liked your post`
        const title = `${user?.name}`

        await axios.post(`${process.env.HOST}/notifications/create`, { title, content, fromUserId: fromUser, idToUser: idUser, idPost });

        const newLike = await Likes.create({
            post,
            user,
            isActive: true,
            typePost: post?.type
        });

        return res.send(newLike);

    } catch (error) {

        return res.send(error);
    }
}

export default createLike