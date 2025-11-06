const pool = require("../conexao");

const listar = async (req, res) => {
  try {
    const clientes = await pool.query("SELECT * FROM clientes");
    return res.status(200).json(clientes.rows);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
};

const cadastrar = async (req, res) => {
  const { nome, email, telefone } = req.body;

  try {
    const queryClienteEmail = "SELECT * FROM clientes WHERE email = $1";
    const emailExistente = await pool.query(queryClienteEmail, [email]);

    if (emailExistente.rows.length > 0) {
      return res.status(400).json({ message: "Email já cadastrado" });
    }

    const query =
      "INSERT INTO clientes (nome, email, telefone) VALUES ($1, $2, $3) RETURNING *";
    const params = [nome, email, telefone];

    const cliente = await pool.query(query, params);

    return res.status(201).json(cliente.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
};

module.exports = { listar, cadastrar };