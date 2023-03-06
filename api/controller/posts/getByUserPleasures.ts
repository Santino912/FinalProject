import { Request, Response } from "express";
import Posts from "../../models/Posts";
import Users from "../../models/Users";

const getByUserPleasures = async (req: Request, res: Response) => {
    const { idGoogle } = req.params
    try {
        const user = await Users.findOne({ idGoogle })


        const allPostsFiltered = await Posts.find({ genres: { $in: user?.pleasures } })

        return res.send(allPostsFiltered)
    } catch (err) {
        return res.status(500).send(err)
    }
};

export default getByUserPleasures;