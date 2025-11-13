// Importa a chave da API do Stripe
const apiKey = require("../apiKey");
const stripe = require("stripe")(apiKey);

const criarCheckoutSession = async (req, res) => {
  try {
    // Cria uma sessão de checkout no Stripe
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
            unit_amount: 5000, // R$ 50,00 (valor em centavos)
          },
          quantity: 1,
        },
      ],
      // URLs de redirecionamento após pagamento
      success_url:
        "http://localhost:3000/sucesso?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/cancelado",
    });

    // Retorna a URL da sessão para o frontend redirecionar
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
