import { Request, Response } from "express"
import { Stripe } from "stripe";

const { PRICES_ID, KEY } = process.env

const stripe = new Stripe(`${KEY}`, {
    apiVersion: '2022-11-15',
});

const payment = async (req: Request, res: Response) => {
    const { userId } = req.body;


    const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: [{ price: PRICES_ID, quantity: 1 }],

        success_url: 'https://www.socialsound.art/home/success',
        cancel_url: 'https://www.socialsound.art/home'
    });


    res.json({ url: session.url });
}
export default payment 