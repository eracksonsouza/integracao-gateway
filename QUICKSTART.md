# 🚀 Quick Start - Integração Stripe

## Passo 1: Configurar Chave do Stripe

1. Crie um arquivo `.env` na raiz do projeto:

```bash
STRIPE_SECRET_KEY=sk_test_sua_chave_aqui
```

2. Obtenha sua chave em: https://dashboard.stripe.com/test/apikeys

## Passo 2: Iniciar o Backend

```bash
# Na raiz do projeto
bun run dev
```

✅ Backend rodando em: **http://localhost:3333**

## Passo 3: Iniciar o Frontend

```bash
# Em outro terminal
cd web
bun run dev
```

✅ Frontend rodando em: **http://localhost:3000**

## Passo 4: Testar

1. Acesse: http://localhost:3000
2. Clique em "Pagar com Stripe"
3. Use cartão de teste: **4242 4242 4242 4242**
4. Preencha os outros dados (data futura, qualquer CVC)
5. Confirme o pagamento

## 🎯 URLs Importantes

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:3333
- **Rota Checkout:** http://localhost:3333/stripe/create-checkout-session

## 🧪 Cartões de Teste Stripe

| Cartão              | Resultado              |
| ------------------- | ---------------------- |
| 4242 4242 4242 4242 | ✅ Sucesso             |
| 4000 0000 0000 0002 | ❌ Recusado            |
| 4000 0025 0000 3155 | 🔐 Requer autenticação |

Mais em: https://stripe.com/docs/testing

## 📁 Arquivos Principais Criados/Modificados

### Backend

- ✨ `src/index.js` - Porta 3333 + CORS
- ✨ `src/apiKey.js` - Configuração da chave Stripe
- ✨ `src/controladores/stripeCheckout.js` - Controlador do checkout
- ✨ `src/rotas.js` - Nova rota `/stripe/create-checkout-session`

### Frontend

- ✨ `web/app/page.js` - Página inicial com card de produto
- ✨ `web/app/sucesso/page.js` - Página de sucesso
- ✨ `web/app/cancelado/page.js` - Página de cancelamento

## 💡 Dicas

- Sempre inicie o **backend primeiro**, depois o frontend
- Certifique-se de que as portas 3000 e 3333 estão livres
- Use o **modo de teste** do Stripe (chaves começam com `sk_test_`)
- Em produção, configure URLs de sucesso/cancelamento para seu domínio real

## 🐛 Problemas Comuns

**Erro de CORS?**

- Verifique se o backend está rodando na porta 3333
- Verifique se o frontend está em localhost:3000

**Erro "Invalid API Key"?**

- Configure sua STRIPE_SECRET_KEY no arquivo .env
- Use uma chave válida do modo de teste

**Frontend não conecta ao backend?**

- Confirme que ambos estão rodando
- Verifique o console do navegador para erros

---

**Pronto para começar! 🎉**
