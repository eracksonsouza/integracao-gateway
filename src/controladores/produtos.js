const pool = require("../conexao");

const listar = async (req, res) => {
  try {
    const produtos = await pool.query("SELECT * FROM produtos");
    return res.status(200).json(produtos.rows);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
};

const cadastrar = async (req, res) => {
    const { nome, descricao, valor } = req.body;

    try {
        const query = "INSERT INTO produtos (nome, descricao, valor) VALUES ($1, $2, $3) RETURNING *";
        const params = [nome, descricao, valor];
        const produto = await pool.query(query, params);

        return res.status(201).json(produto.rows[0]);
        
    } catch (error) {
        return res.status(500).json({ message: "Erro interno no servidor" });
    }
}

module.exports = { listar, cadastrar };