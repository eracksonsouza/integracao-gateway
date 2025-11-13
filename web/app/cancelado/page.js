"use client";

import Link from "next/link";

export default function Cancelado() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-50 to-orange-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        {/* Ícone de Cancelamento */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-10 h-10 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>

        {/* Mensagem de Cancelamento */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Pagamento Cancelado
        </h1>

        <p className="text-gray-600 mb-6">
          Você cancelou o processo de pagamento. Nenhuma cobrança foi realizada.
        </p>

        {/* Informações Adicionais */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-700">
            Se você teve algum problema durante o checkout, tente novamente ou
            entre em contato com o suporte.
          </p>
        </div>

        {/* Botões de Ação */}
        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
          >
            Tentar Novamente
          </Link>

          <button
            onClick={() => window.history.back()}
            className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
          >
            Voltar
          </button>
        </div>

        {/* Mensagem de Ajuda */}
        <p className="text-xs text-gray-500 mt-6">
          💡 Seu carrinho foi preservado e nenhuma cobrança foi efetuada
        </p>
      </div>
    </main>
  );
}
