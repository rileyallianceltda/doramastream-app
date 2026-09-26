"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email === "admin" && password === "admin") {
      localStorage.setItem("userRole", "admin");
      router.push("/browse");
    } else if (email === "lead" && password === "lead") {
      localStorage.setItem("userRole", "lead");
      router.push("/browse");
    } else {
      alert("Usuário ou senha incorretos! Tente admin/admin ou lead/lead.");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-black md:bg-transparent">
      {/* Background Image (Netflix Style) */}
      <div className="hidden md:block absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1574267432553-4b4628081c31?q=80&w=2070&auto=format&fit=crop"
          alt="Background"
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-black via-transparent to-black" />
      </div>

      {/* Header */}
      <header className="relative z-10 px-4 md:px-12 py-6 flex justify-between items-center">
        <div className="text-[#e50914] font-black text-3xl md:text-5xl tracking-tighter cursor-pointer">
          DORAMASTREAM
        </div>
      </header>

      {/* Login Box */}
      <main className="relative z-10 flex-1 flex flex-col items-center pt-4 md:pt-20 px-4">
        <div className="w-full max-w-[450px] bg-black/80 md:p-[68px] rounded-md md:min-h-[660px]">
          <h1 className="text-white text-3xl font-bold mb-7">Entrar</h1>
          
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="relative">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#333] rounded px-4 pt-5 pb-2 text-white focus:outline-none focus:bg-[#454545] peer"
                placeholder=" "
                required
              />
              <label className="absolute left-4 top-3.5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:text-sm peer-focus:top-1.5 pointer-events-none">
                Email ou número de celular
              </label>
            </div>

            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#333] rounded px-4 pt-5 pb-2 text-white focus:outline-none focus:bg-[#454545] peer"
                placeholder=" "
                required
              />
              <label className="absolute left-4 top-3.5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:text-sm peer-focus:top-1.5 pointer-events-none">
                Senha
              </label>
            </div>

            <button
              type="submit"
              className="bg-[#e50914] hover:bg-[#f40612] text-white font-bold py-3.5 rounded mt-4 transition-colors"
            >
              Entrar
            </button>
            
            <div className="flex justify-between items-center text-sm text-gray-400 mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-gray-500" defaultChecked />
                Lembre-se de mim
              </label>
              <a href="#" className="hover:underline">Precisa de ajuda?</a>
            </div>
          </form>

          <div className="mt-16 text-gray-400">
            <p className="mb-3">
              Novo por aqui? <Link href="/dramapvp" className="text-white hover:underline">Assine agora.</Link>
            </p>
            <p className="text-xs">
              Esta página é protegida pelo Google reCAPTCHA para garantir que você não é um robô. <a href="#" className="text-blue-500 hover:underline">Saiba mais.</a>
            </p>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 bg-black/75 mt-auto border-t border-gray-800 md:bg-black/50 text-gray-400 py-8 px-4 md:px-32 text-sm">
        <p className="mb-4">Dúvidas? Ligue 0800 000 0000</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <a href="#" className="hover:underline">Perguntas frequentes</a>
          <a href="#" className="hover:underline">Centro de Ajuda</a>
          <a href="#" className="hover:underline">Termos de Uso</a>
          <a href="#" className="hover:underline">Privacidade</a>
        </div>
      </footer>
    </div>
  );
}
