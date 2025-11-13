import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

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
      success_url: `${baseUrl}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancelado`,
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error) {
    console.error("Erro ao criar sessão de checkout:", error);
    return NextResponse.json(
      {
        erro: "Erro ao criar sessão de pagamento",
        mensagem: error.message,
      },
      { status: 500 }
    );
  }
}
