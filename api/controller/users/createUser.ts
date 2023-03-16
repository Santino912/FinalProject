import { Request, Response } from "express";
import { Mail } from "../../utils/Mailer";
import Users from "../../models/Users";
import { bcryptFunction } from "../../utils/userCreate";

const createUser = async (req: Request, res: Response) => {
    const { name, role, plan, email, password, username, avatar, banner, idGoogle } =
        req.body;
    try {
        if (!name || !email || !password || !username || !idGoogle) return res.send("Empty Body");
        const userWitEmail = await Users.exists({ email });

        if (userWitEmail !== null) return res.send("User already saved");
        const pass = bcryptFunction(password)
        const user = await Users.create({
            name,
            role,
            plan,
            email,
            password: pass,
            username,
            avatar,
            banner,
            idGoogle
        });



        //Mail(email).catch(console.error);

        return res.send(user);

    } catch (error) {
        console.log(error)
        return res.status(404).send(error);
    }
}

export default createUser