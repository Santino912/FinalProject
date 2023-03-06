import { Request, Response } from "express";
import Posts from "../../models/Posts";


const getByGenreWithAll = async (req: Request, res: Response) => {
    let { genres } = req.query;
    try {

        if (genres === undefined) {
            const posts = await Posts.find()

            return res.send(posts)
        }
        //let allGenres = genres?.split(",")
        let allGenres = `${genres}`.split(",")

        const allJoined = await Posts.find({
            $push: {
                genres: {
                    $each: allGenres,
                    $sort: 1
                }
            }
        })

        const allPostsOrder = await Posts.find({ genres: { $in: allGenres } })

        return res.send({ posts: allJoined, allPosts: allPostsOrder })
    } catch (error) {

        return res.send(error);
    };
};
//si tubieras que hacer una peticion pasandole datos para filtrar cual usarias y como le pasarias los datos
export default getByGenreWithAll;