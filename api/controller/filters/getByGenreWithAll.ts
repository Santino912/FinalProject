import { Request, Response } from "express";
import Posts from "../../models/Posts";


const getByGenreWithAll = async (req: Request, res: Response) => {

    let { genres } = req.query;
    try {
        console.log(genres)
        const allJoined = await Posts.find({
            $push: {
                genres: {
                    $each: genres,
                    $sort: 1
                }
            }
        })
        const allPostsOrder = await Posts.find({ genres: { $in: genres } })
        return res.send({ posts: allJoined, allPosts: allPostsOrder })
    } catch (error) {

        return res.send(error);
    };
};
//si tubieras que hacer una peticion pasandole datos para filtrar cual usarias y como le pasarias los datos
export default getByGenreWithAll;