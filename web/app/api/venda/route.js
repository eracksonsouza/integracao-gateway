import { NextResponse } from "next/server";
import pool from "@/lib/conexao";
import { cobrar } from "@/lib/stripe";

export async function POST(request) {
  try {
    const { cliente_id, produto_id, quantidade, card } = await request.json();

    const cliente = await pool.query("SELECT * FROM clientes WHERE id = $1", [
      cliente_id,
    ]);

    if (cliente.rowCount < 1) {
      return NextResponse.json(
        { message: "Cliente não encontrado" },
        { status: 404 }
      );
    }

    const produto = await pool.query("SELECT * FROM produtos WHERE id = $1", [
      produto_id,
    ]);

    if (produto.rowCount < 1) {
      return NextResponse.json(
        { message: "Produto não encontrado" },
        { status: 404 }
      );
    }

    if (quantidade < 1) {
      return NextResponse.json(
        { message: "Quantidade é no minimo 1" },
        { status: 400 }
      );
    }

    const valorVenda = produto.rows[0].valor * quantidade;

    const cobranca = await cobrar(valorVenda, "tok_visa");

    const query = `
        INSERT INTO vendas (cliente_id, produto_id, quantidade, transacao_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;

    const vendaRealizada = await pool.query(query, [
      cliente_id,
      produto_id,
      quantidade,
      cobranca.id,
    ]);

    return NextResponse.json(cobranca, { status: 201 });
  } catch (error) {
    console.error("Erro ao processar venda:", error);

    if (error.response) {
      return NextResponse.json(error.response.data, { status: 400 });
    }

    return NextResponse.json(
      { message: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}
