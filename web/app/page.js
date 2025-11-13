"use client";

import { useState } from "react";

export default function Home() {
  const [carregando, setCarregando] = useState(false);
  const [mostrarTutorial, setMostrarTutorial] = useState(false);

  const handlePagar = async () => {
    try {
      setCarregando(true);

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
        window.location.href = data.url;
      } else {
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
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Integração Stripe
          </h1>
          <p className="text-gray-600">
            Demonstração de pagamento com Stripe Checkout
          </p>
        </div>

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

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            🔒 Pagamento processado de forma segura pela Stripe
          </p>
        </div>

        <button
          onClick={() => setMostrarTutorial(!mostrarTutorial)}
          className="mt-4 w-full text-sm text-indigo-600 hover:text-indigo-800 font-medium py-2 transition-colors"
        >
          {mostrarTutorial
            ? "▲ Ocultar Tutorial"
            : "▼ Como Testar com Cartões de Teste"}
        </button>

        {mostrarTutorial && (
          <div className="mt-4 bg-linear-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>🎓</span>
              Tutorial: Como Testar o Pagamento
            </h3>

            <div className="space-y-4 mb-6">
              <div className="flex gap-3">
                <span className="shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  1
                </span>
                <p className="text-sm text-gray-700">
                  Clique no botão "Pagar com Stripe" acima
                </p>
              </div>
              <div className="flex gap-3">
                <span className="shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  2
                </span>
                <p className="text-sm text-gray-700">
                  Você será redirecionado para a página segura do Stripe
                </p>
              </div>
              <div className="flex gap-3">
                <span className="shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  3
                </span>
                <p className="text-sm text-gray-700">
                  Use um dos cartões de teste abaixo
                </p>
              </div>
              <div className="flex gap-3">
                <span className="shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  4
                </span>
                <p className="text-sm text-gray-700">
                  Complete o pagamento e veja a tela de sucesso!
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-800 mb-3">
                💳 Cartões de Teste:
              </h4>

              <div className="bg-white rounded-lg p-4 border-2 border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded">
                    ✅ SUCESSO
                  </span>
                </div>
                <p className="font-mono text-base font-bold text-gray-800 mb-1">
                  4242 4242 4242 4242
                </p>
                <p className="text-xs text-gray-600">
                  Use este para pagamento aprovado
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 border-2 border-red-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-red-700 bg-red-100 px-2 py-1 rounded">
                    ❌ RECUSADO
                  </span>
                </div>
                <p className="font-mono text-base font-bold text-gray-800 mb-1">
                  4000 0000 0000 0002
                </p>
                <p className="text-xs text-gray-600">
                  Use este para testar pagamento recusado
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 border-2 border-yellow-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-yellow-700 bg-yellow-100 px-2 py-1 rounded">
                    🔐 AUTENTICAÇÃO
                  </span>
                </div>
                <p className="font-mono text-base font-bold text-gray-800 mb-1">
                  4000 0025 0000 3155
                </p>
                <p className="text-xs text-gray-600">
                  Requer autenticação 3D Secure
                </p>
              </div>
            </div>

            <div className="mt-4 bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-xs font-semibold text-blue-900 mb-2">
                📝 Informações para preencher:
              </p>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>
                  • <strong>Data de validade:</strong> Qualquer data futura (ex:
                  12/25)
                </li>
                <li>
                  • <strong>CVC:</strong> Qualquer 3 dígitos (ex: 123)
                </li>
                <li>
                  • <strong>CEP:</strong> Qualquer CEP válido (ex: 12345-678)
                </li>
                <li>
                  • <strong>Nome:</strong> Qualquer nome
                </li>
              </ul>
            </div>

            <div className="mt-4 text-center">
              <a
                href="https://stripe.com/docs/testing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-indigo-600 hover:text-indigo-800 underline"
              >
                📚 Ver mais cartões de teste na documentação oficial
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
