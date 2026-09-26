"use client";

import { Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

function VideoPlayer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const videoUrl = searchParams.get("v") || "https://www.w3schools.com/html/mov_bbb.mp4";

  return (
    <div className="w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center relative group">
      <div className="absolute top-0 left-0 w-full p-6 z-50 flex items-center gap-4 bg-gradient-to-b from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button 
          onClick={() => router.back()} 
          className="text-white hover:text-gray-300 flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-8 h-8" />
        </button>
        <h1 className="text-white text-xl font-bold">Assistindo agora</h1>
      </div>

      <video
        autoPlay
        controls
        className="w-full h-full object-contain"
        src={videoUrl}
      >
        O seu navegador não suporta a tag de vídeo.
      </video>
    </div>
  );
}

export default function WatchPage() {
  return (
    <Suspense fallback={<div className="w-full h-screen bg-black text-white flex items-center justify-center">Carregando...</div>}>
      <VideoPlayer />
    </Suspense>
  );
}
