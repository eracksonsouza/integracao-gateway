const apiKey = require("../apiKey");
const stripe = require("stripe")(apiKey);

const criarCheckoutSession = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "brl",
            product_data: {
              name: "Produto de Teste",
              description: "Produto de demonstração para integração Stripe",
            },
            unit_amount: 5000,
          },
          quantity: 1,
        },
      ],
      success_url:
        "http://localhost:3000/sucesso?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/cancelado",
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Erro ao criar sessão de checkout:", error);
    return res.status(500).json({
      erro: "Erro ao criar sessão de pagamento",
      mensagem: error.message,
    });
  }
};

module.exports = { criarCheckoutSession };
