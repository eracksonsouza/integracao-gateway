# Frontend - Integração Stripe

Frontend em Next.js para demonstração da integração com Stripe Checkout.

## 🚀 Como Rodar

### 1. Instalar dependências

```bash
bun install
```

### 2. Iniciar o servidor de desenvolvimento

```bash
bun run dev
```

O frontend estará disponível em: **http://localhost:3000**

## 📁 Estrutura de Páginas

- **/** - Página inicial com card do produto e botão de pagamento
- **/sucesso** - Página exibida após pagamento bem-sucedido
- **/cancelado** - Página exibida quando o pagamento é cancelado

## 🔄 Fluxo de Pagamento

1. Usuário clica no botão "Pagar com Stripe"
2. Frontend faz POST para `http://localhost:3333/stripe/create-checkout-session`
3. Backend retorna `{ url: "https://checkout.stripe.com/..." }`
4. Frontend redireciona o usuário para o Checkout da Stripe
5. Após o pagamento:
   - **Sucesso**: Redireciona para `/sucesso?session_id={ID}`
   - **Cancelamento**: Redireciona para `/cancelado`

## ⚙️ Configuração

O frontend espera que o backend esteja rodando em:

```
http://localhost:3333
```

Certifique-se de que o backend está configurado com CORS permitindo `http://localhost:3000`.

## 🎨 Tecnologias

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- JavaScript (sem TypeScript)

## 📝 Observações

- Utiliza `'use client'` para componentes interativos
- Usa `fetch` nativo (sem axios)
- Layout responsivo e moderno
- Animações de loading durante processamento
