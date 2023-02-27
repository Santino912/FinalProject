import { Request, Response } from "express";
import Reviews from "../../models/Reviews";

const createReview = async (req: Request, res: Response) => {

    const { userId, name, avatar, rating, description } = req.body;

    try {
        let review = await Reviews.create({
            userId,
            name,
            avatar,
            rating,
            description
        })
        return res.json(review);
    } catch (error) {
        return res.status(404).send(error);
    }
};

export default createReview