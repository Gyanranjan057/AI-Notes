import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const CREDIT_MAP = {
    100: 50,
    200: 120,
    500: 300,
};

export const createCreditsOrder = async ( req, res) => {
    try {
        
    } catch (error) {
        
    }
}