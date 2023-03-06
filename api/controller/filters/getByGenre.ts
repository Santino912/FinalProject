import { Request, Response } from "express";
import Posts from "../../models/Posts";

const getByGenre = async (req: Request, res: Response) => {

    let { genres } = req.query;


    try {
        const posts = await Posts.find({ genres: { $in: genres } })

        return res.send(posts);

    } catch (error) {

        return res.send(error);
    };
};

export default getByGenre;