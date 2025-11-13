import { NextResponse } from "next/server";
import pool from "@/lib/conexao";

export async function GET() {
  try {
    const produtos = await pool.query("SELECT * FROM produtos");
    return NextResponse.json(produtos.rows, { status: 200 });
  } catch (error) {
    console.error("Erro ao listar produtos:", error);
    return NextResponse.json(
      { message: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { nome, descricao, valor } = await request.json();

    const query =
      "INSERT INTO produtos (nome, descricao, valor) VALUES ($1, $2, $3) RETURNING *";
    const params = [nome, descricao, valor];
    const produto = await pool.query(query, params);

    return NextResponse.json(produto.rows[0], { status: 201 });
  } catch (error) {
    console.error("Erro ao cadastrar produto:", error);
    return NextResponse.json(
      { message: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}
