# Integração Gateway de Pagamento - Stripe

Projeto completo de integração com Stripe usando Node.js + Express no backend e Next.js no frontend.

## 📂 Estrutura do Projeto

```
integracao-gateway/
├── src/                          # Backend (Node.js + Express)
│   ├── controladores/
│   │   ├── clientes.js
│   │   ├── produtos.js
│   │   ├── vendas.js
│   │   └── stripeCheckout.js    # ✨ Controlador do Stripe Checkout
│   ├── api.js
│   ├── apiKey.js                 # ✨ Chave da API Stripe
│   ├── conexao.js
│   ├── index.js                  # ✨ Servidor na porta 3333 com CORS
│   ├── rotas.js                  # ✨ Inclui rota /stripe/create-checkout-session
│   └── stripe.js
├── web/                          # ✨ Frontend (Next.js)
│   ├── app/
│   │   ├── page.js              # Página inicial com card de produto
│   │   ├── sucesso/             # Página de pagamento concluído
│   │   └── cancelado/           # Página de pagamento cancelado
│   └── package.json
├── .env.example                  # ✨ Exemplo de configuração
└── package.json
```

## 🚀 Como Rodar o Projeto

### 1. Configurar Backend

#### Instalar dependências

```bash
bun install
```

#### Configurar variável de ambiente

1. Copie o arquivo `.env.example` para `.env`:

   ```bash
   cp .env.example .env
   ```

2. Edite `.env` e adicione sua chave secreta do Stripe:

   ```
   STRIPE_SECRET_KEY=sk_test_sua_chave_aqui
   ```

   > Obtenha sua chave em: https://dashboard.stripe.com/test/apikeys

#### Iniciar o servidor backend

```bash
bun run dev
```

O backend rodará em: **http://localhost:3333**

### 2. Configurar Frontend

#### Navegar para a pasta do frontend

```bash
cd web
```

#### Instalar dependências

```bash
bun install
```

#### Iniciar o servidor frontend

```bash
bun run dev
```

O frontend rodará em: **http://localhost:3000**

## 🎯 Fluxo de Integração

### Backend - Nova Rota Stripe

**Endpoint:** `POST /stripe/create-checkout-session`

**Função:** Cria uma sessão de checkout no Stripe

**Resposta:**

```json
{
  "url": "https://checkout.stripe.com/c/pay/cs_test_..."
}
```

### Frontend - Páginas

1. **Página Inicial (`/`)**

   - Card mostrando "Produto de Teste – R$ 50,00"
   - Botão "Pagar com Stripe"
   - Ao clicar: faz POST para backend e redireciona para Stripe

2. **Página de Sucesso (`/sucesso`)**

   - Exibida após pagamento aprovado
   - Mostra ID da sessão e detalhes do pedido
   - URL: `http://localhost:3000/sucesso?session_id={ID}`

3. **Página de Cancelamento (`/cancelado`)**
   - Exibida quando usuário cancela o pagamento
   - Opção de tentar novamente

## 🔐 Segurança e CORS

O backend está configurado para aceitar requisições apenas de:

```
http://localhost:3000
```

Isso está definido em `src/index.js`:

```javascript
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
```

## 🛠️ Tecnologias Utilizadas

### Backend

- Node.js
- Express
- Stripe SDK
- CORS
- PostgreSQL (para outras funcionalidades)

### Frontend

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- JavaScript (sem TypeScript)

## 📝 Rotas do Backend

### Rotas Existentes (preservadas)

- `GET /cliente` - Listar clientes
- `POST /cliente` - Cadastrar cliente
- `GET /produto` - Listar produtos
- `POST /produto` - Cadastrar produto
- `POST /venda` - Registrar venda

### Nova Rota (Stripe)

- `POST /stripe/create-checkout-session` - Criar sessão de checkout

## 🧪 Testando a Integração

1. Certifique-se de que o backend está rodando na porta **3333**
2. Certifique-se de que o frontend está rodando na porta **3000**
3. Acesse http://localhost:3000
4. Clique no botão "Pagar com Stripe"
5. Use um cartão de teste do Stripe:
   - Número: `4242 4242 4242 4242`
   - Data: Qualquer data futura
   - CVC: Qualquer 3 dígitos
   - CEP: Qualquer CEP válido

## 📌 Observações Importantes

- ✅ As rotas existentes do backend foram **preservadas**
- ✅ A lógica de negócios original **não foi alterada**
- ✅ O frontend se conecta via HTTP ao backend (arquitetura separada)
- ✅ CORS configurado corretamente para desenvolvimento
- ✅ Usa Stripe Checkout (hosted page) para máxima segurança
- ✅ Todas as chaves sensíveis devem ficar em variáveis de ambiente

## 🌐 Links Úteis

- [Documentação Stripe Checkout](https://stripe.com/docs/payments/checkout)
- [Dashboard Stripe](https://dashboard.stripe.com/)
- [Cartões de Teste Stripe](https://stripe.com/docs/testing)
- [Next.js Documentation](https://nextjs.org/docs)

## 👤 Branch

Este desenvolvimento foi feito na branch: **feat/frontend-stripe**

---

**Desenvolvido com ❤️ usando Bun, Node.js, Next.js e Stripe**
