import { NextResponse } from "next/server";
import pool from "@/lib/conexao";

export async function GET() {
  try {
    const clientes = await pool.query("SELECT * FROM clientes");
    return NextResponse.json(clientes.rows, { status: 200 });
  } catch (error) {
    console.error("Erro ao listar clientes:", error);
    return NextResponse.json(
      { message: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { nome, email, telefone } = await request.json();

    const queryClienteEmail = "SELECT * FROM clientes WHERE email = $1";
    const emailExistente = await pool.query(queryClienteEmail, [email]);

    if (emailExistente.rows.length > 0) {
      return NextResponse.json(
        { message: "Email já cadastrado" },
        { status: 400 }
      );
    }

    const query =
      "INSERT INTO clientes (nome, email, telefone) VALUES ($1, $2, $3) RETURNING *";
    const params = [nome, email, telefone];

    const cliente = await pool.query(query, params);

    return NextResponse.json(cliente.rows[0], { status: 201 });
  } catch (error) {
    console.error("Erro ao cadastrar cliente:", error);
    return NextResponse.json(
      { message: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}
