"use client";

import { useState } from "react";

export default function Home() {
  const [carregando, setCarregando] = useState(false);

  // Função para iniciar o pagamento com Stripe
  const handlePagar = async () => {
    try {
      setCarregando(true);

      // Faz requisição para o backend criar a sessão de checkout
      const response = await fetch(
        "http://localhost:3333/stripe/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      console.log("Resposta do backend:", data);

      if (data.url) {
        // Redireciona para a página de checkout do Stripe
        window.location.href = data.url;
      } else {
        // Mostra o erro retornado pelo backend
        const mensagemErro =
          data.mensagem || data.erro || "Erro ao criar sessão de pagamento";
        alert(`Erro: ${mensagemErro}`);
        console.error("Erro do backend:", data);
        setCarregando(false);
      }
    } catch (error) {
      console.error("Erro ao conectar:", error);
      alert(
        "Erro ao conectar com o servidor. Verifique se o backend está rodando na porta 3333."
      );
      setCarregando(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        {/* Cabeçalho */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Integração Stripe
          </h1>
          <p className="text-gray-600">
            Demonstração de pagamento com Stripe Checkout
          </p>
        </div>

        {/* Card do Produto */}
        <div className="border-2 border-gray-200 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Produto de Teste
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Produto de demonstração
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-indigo-600">R$ 50,00</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Pagamento seguro via Stripe
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Processamento instantâneo
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Checkout simplificado
              </li>
            </ul>
          </div>
        </div>

        {/* Botão de Pagamento */}
        <button
          onClick={handlePagar}
          disabled={carregando}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
        >
          {carregando ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processando...
            </>
          ) : (
            <>
              <span>💳</span>
              Pagar com Stripe
            </>
          )}
        </button>

        {/* Informações de Segurança */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            🔒 Pagamento processado de forma segura pela Stripe
          </p>
        </div>
      </div>
    </main>
  );
}
