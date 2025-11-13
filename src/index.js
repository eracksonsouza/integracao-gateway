const express = require("express");
const cors = require("cors");

const rotas = require("./rotas");

const app = express();

// Libera CORS para o frontend em localhost:3000
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use(rotas);

app.listen(3333, () => {
  console.log("🚀 Servidor backend rodando na porta 3333");
});
