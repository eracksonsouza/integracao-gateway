"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function SucessoContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-emerald-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        {/* Ícone de Sucesso */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Mensagem de Sucesso */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Pagamento Concluído!
        </h1>

        <p className="text-gray-600 mb-6">
          Seu pagamento foi processado com sucesso pela Stripe.
        </p>

        {/* Informações da Sessão */}
        {sessionId && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-xs text-gray-500 mb-1">ID da Sessão:</p>
            <p className="text-sm font-mono text-gray-700 break-all">
              {sessionId}
            </p>
          </div>
        )}

        {/* Detalhes do Pedido */}
        <div className="border-t border-b py-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Produto:</span>
            <span className="font-semibold">Produto de Teste</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Valor:</span>
            <span className="font-semibold text-green-600">R$ 50,00</span>
          </div>
        </div>

        {/* Botão de Retorno */}
        <Link
          href="/"
          className="inline-block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
        >
          Voltar à Página Inicial
        </Link>

        {/* Mensagem Adicional */}
        <p className="text-xs text-gray-500 mt-6">
          Um recibo foi enviado para o seu email
        </p>
      </div>
    </main>
  );
}

export default function Sucesso() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-emerald-100 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
            <p>Carregando...</p>
          </div>
        </main>
      }
    >
      <SucessoContent />
    </Suspense>
  );
}
