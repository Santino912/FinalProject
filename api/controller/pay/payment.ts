import { Request, Response } from "express"
import { Stripe } from "stripe";
import dotenv from "dotenv"
dotenv.config()

const { PRICES_ID, KEY } = process.env

const stripe = new Stripe(`${KEY}`, {
    apiVersion: '2022-11-15',
});

const payment = async (req: Request, res: Response) => {
    const { userId } = req.body;

    const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: [{ price: PRICES_ID, quantity: 1 }],

        success_url: 'https://socialsound-pi.vercel.app/home/success',
        cancel_url: 'https://socialsound-pi.vercel.app/home'
    });

    return res.json({ url: session.url });
};
export default payment 