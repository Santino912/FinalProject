import { Request, Response } from "express"
import Users from "../../models/Users"

const setUserGenres = async (req: Request, res: Response) => {

    const { _id, genres } = req.body;

    try {

        const user = await Users.findOneAndUpdate({ _id }, { pleasures: genres });


        return res.json(user);

    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
}

export default setUserGenres