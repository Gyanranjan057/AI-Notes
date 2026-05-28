import Stripe from "stripe"
import usermodel from "../models/usermodel.js"
import dotenv from "dotenv"
dotenv.config()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const CREDIT_MAP = {
    50: 100,
    100: 220,
    200: 460,
};

export const createCreditsOrder = async ( req, res) => {
    try {
        const userId = req.userId
        const {amount} = req.body;
        if(!CREDIT_MAP[amount]){
            return res.status(400).json({
                message: "Invalid credit plan",
            });
        }
        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],
            success_url: `${process.env.CLIENT_URL}/payment-success`,
            cancel_url: `${process.env.CLIENT_URL}/payment-failed`,
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: `${CREDIT_MAP[amount]} Credits`,
                        },
                        unit_amount: amount*100,
                    },
                    quantity: 1,
                },
            ],
            metadata: { 
                userId,
                credits: CREDIT_MAP[amount],
            },
        })
        res.status(200).json({ url: session.url });
    } catch (error) {
        res.status(500).json({ message: "Stripe error" });
    }
}


export const stripeWebhook = async (req, res) => {
    console.log(" Webhook hit");

    const sig = req.headers["stripe-signature"];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        console.log("❌ Signature error:", error.message);
        return res.status(400).send("Webhook Error");
    }

    console.log("Event:", event.type);

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;

        console.log(" Payment session:", session);

        const userId = session.metadata.userId;
        const creditsToAdd = Number(session.metadata.credits);

        console.log(" User:", userId, "Credits:", creditsToAdd);

        if (!userId || !creditsToAdd) {
            return res.status(400).json({ message: "Invalid metadata" });
        }

        await usermodel.findByIdAndUpdate(
            userId,
            {
                $inc: { credits: creditsToAdd },
                $set: { isCreditAvailable: true },
            },
            { new: true } 
        );

        console.log("🎉 Credits updated!");
    }

    res.json({ received: true });
};