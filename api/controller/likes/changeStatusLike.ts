import { Request, Response } from "express"

const changeStatusLike = async (req: Request, res: Response) => {

    /*     const { postId, _id, isActive } = req.body;
    
        try {
    
            let like = await Likes.findOne({
                where: {
                    [Op.and]: [
                        { postId },
                        { _id }
                    ]
                }
            });
    
            like.update({ isActive });
    
            await like.save();
            return res.send(like);
    
        } catch (err) {
    
            res.status(500).send(err);
        } */
}
export default changeStatusLike