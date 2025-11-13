const express = require("express");
const clientes = require("./controladores/clientes");
const produtos = require("./controladores/produtos");
const vendas = require("./controladores/vendas");
const stripeCheckout = require("./controladores/stripeCheckout");

const rotas = express();

rotas.get("/cliente", clientes.listar);
rotas.post("/cliente", clientes.cadastrar);

rotas.get("/produto", produtos.listar);
rotas.post("/produto", produtos.cadastrar);

rotas.post("/venda", vendas.venda);

rotas.post(
  "/stripe/create-checkout-session",
  stripeCheckout.criarCheckoutSession
);

module.exports = rotas;
