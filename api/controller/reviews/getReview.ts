import { Request, Response } from "express"
import Reviews from "../../models/Reviews"

const getReview = async (_req: Request, res: Response) => {
    try {
        const reviews = await Reviews.find()
        return res.send(reviews)
    } catch (err) {
        return res.send(err)
    }
}
export default getReview