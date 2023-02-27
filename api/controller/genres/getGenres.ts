import { Request, Response } from "express";
import Genres from "../../models/Genres";


const getGenres = async (_req: Request, res: Response) => {

    try {

        const genres = await Genres.find()

        return res.send(genres)
    } catch (error) {

        return res.status(500).send(error);
    }
};

export default getGenres