#!/bin/bash

# Script para iniciar backend e frontend simultaneamente

echo "🚀 Iniciando projeto completo..."
echo ""

# Verifica se o .env existe
if [ ! -f .env ]; then
    echo "⚠️  Arquivo .env não encontrado!"
    echo "📝 Criando .env a partir do .env.example..."
    cp .env.example .env
    echo "✅ Arquivo .env criado. Configure sua STRIPE_SECRET_KEY antes de continuar."
    echo ""
fi

# Função para iniciar o backend
start_backend() {
    echo "🔧 Iniciando Backend (porta 3333)..."
    bun run dev
}

# Função para iniciar o frontend
start_frontend() {
    echo "🎨 Iniciando Frontend (porta 3000)..."
    cd web && bun run dev
}

# Pergunta ao usuário o que deseja iniciar
echo "Escolha uma opção:"
echo "1) Apenas Backend"
echo "2) Apenas Frontend"
echo "3) Backend e Frontend (em terminais separados)"
echo ""
read -p "Digite sua escolha (1-3): " choice

case $choice in
    1)
        start_backend
        ;;
    2)
        start_frontend
        ;;
    3)
        echo ""
        echo "⚠️  Abra dois terminais:"
        echo "   Terminal 1: Execute 'bun run dev' na raiz do projeto (backend)"
        echo "   Terminal 2: Execute 'cd web && bun run dev' (frontend)"
        echo ""
        echo "Ou use um gerenciador de processos como 'concurrently' ou 'pm2'"
        ;;
    *)
        echo "❌ Opção inválida!"
        exit 1
        ;;
esac
