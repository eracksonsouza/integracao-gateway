import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const criarToken = async (card) => {
  const token = await stripe.tokens.create({
    card: {
      number: card.number,
      exp_month: card.exp_month,
      exp_year: card.exp_year,
      cvc: card.cvc,
    },
  });

  return token;
};

export const cobrar = async (amount, token) => {
  const charge = await stripe.charges.create({
    amount,
    currency: "brl",
    source: token,
    description: "Cobrança de teste",
  });

  return charge;
};
