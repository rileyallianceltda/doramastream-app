"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CheckoutFallback() {
  return (
    <div className="w-full h-screen bg-[#141414] text-white flex flex-col items-center justify-center p-4">
      <div className="bg-black/80 border border-gray-800 p-8 rounded-xl max-w-md text-center shadow-2xl">
        <h1 className="text-3xl font-black text-[#e50914] mb-4">Área de Pagamento</h1>
        <p className="text-gray-400 mb-8 leading-relaxed">
          Os links de checkout da versão antiga em PHP apontavam para "/checkout/1".
          Para finalizar a configuração, edite o arquivo <code className="bg-gray-800 px-2 py-1 rounded text-white">public/dramapvp/index.html</code> 
          e coloque os seus links reais da Kiwify, Hotmart, Yampi, etc.
        </p>
        
        <Link href="/dramapvp" className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded hover:bg-gray-200 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Voltar para Vendas
        </Link>
      </div>
    </div>
  );
}
