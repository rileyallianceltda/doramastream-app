"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Play, Info, Search, Bell, ChevronDown, Menu, X, Lock, Crown, Plus, Check, ThumbsUp } from "lucide-react";

// ============================================================================
// ÁREA DE EDIÇÃO MANUAL DE CONTEÚDO
// ============================================================================

const MAIN_BANNER = {
  id: "agente-kim",
  title: "Agente Kim: Reativado",
  description:
    "O gerente Kim é um trabalhador como qualquer outro, e sua maior preocupação é se conectar com a filha Kim Min-ji. Até que ela desaparece de repente.",
  image: "https://image.tmdb.org/t/p/original/g1LJLlmWP74zv9yXKEXm7g9p10O.jpg",
  year: 2024,
  match: "100% Relevante",
  age: "16",
  duration: "1 Temporada",
  trailerUrl: "xSztRfnJZzE", // ID do YouTube do Trailer (coloque o ID correto do YouTube aqui)
  videoUrl: "http://www-fontedecanais-sh.77zzhf54vdll71.com/series/agente%20kim%20reativado/384626.mp4?username=PlayTvOficial-vods&token=C1EQAgcOWlBaW0lDUFhYX0pYR04FAAEZBAoVD0lWUiMIChM%2FDiUNBRMaBQdHHRcOGE5cUQkKEjQbBQUCFRAQAgUFC0hRTkJDVElGSRoLBQgHGgAfAklCW1tCSEVISQkEFh4OAgQsDQ9IUUFYW1xEQRk%3D",
  episodes: [
    {
      "id": 1,
      "title": "Episódio 1",
      "duration": "45 min",
      "description": "O gerente Kim é um trabalhador como qualquer outro, e sua maior preocupação é se conectar com a filha Kim Min-ji. Até que ela desaparece de repente.",
      "image": "https://image.tmdb.org/t/p/w500/j1z8gs6jhJtRzS2Z3dSM5qKtvCM.jpg",
      "videoUrl": "http://www-fontedecanais-sh.77zzhf54vdll71.com/series/agente%20kim%20reativado/384626.mp4?username=PlayTvOficial-vods&token=C1EQAgcOWlBaW0lDUFhZWEtTR04FAAEZBAoVD0lWUiMIChM%2FDiUNBRMaBQdHHRcOGE5cUQkKEjQbBQUCFRAQAgUFC0hRTkJDVElGSRoLBQgHGgAfAklCW1pCQUtISQkEFh4OAgQsDQ9IUUFYW1xEQRk%3D"
    },
    {
      "id": 2,
      "title": "Episódio 2",
      "duration": "45 min",
      "description": "Desesperado para encontrar Min-ji, o gerente Kim coloca suas habilidades do passado para jogo. Ele era um agente secreto que nunca teve piedade dos inimigos.",
      "image": "https://image.tmdb.org/t/p/w500/75cFdAXUOmeVX2NhtdDthdJ9276.jpg",
      "videoUrl": "http://www-fontedecanais-sh.77zzhf54vdll71.com/series/agente%20kim%20reativado/384772.mp4?username=PlayTvOficial-vods&token=C1EQAgcOWlBaW0lDUFhZWE1cR04FAAEZBAoVD0lWUiMIChM%2FDiUNBRMaBQdHHRcOGE5cUQkKEjQbBQUCFRAQAgUFC0hRTkJDVElGSRoLBQgHGgAfAklCW1pCQUtISQkEFh4OAgQsDQ9IUUFYW1xEQBk%3D"
    },
    {
      "id": 3,
      "title": "Episódio 3",
      "duration": "45 min",
      "description": "Na procura por Min-ji, Kim reencontra Sung Han-soo e Park Jin-cheol, que são amigos do seu pai e ex-agentes secretos.",
      "image": "https://image.tmdb.org/t/p/w500/v8pPQuIbicSgqm2xWW20LZaTQk5.jpg",
      "videoUrl": "http://www-fontedecanais-sh.77zzhf54vdll71.com/series/agente%20kim%20reativado/386058.mp4?username=PlayTvOficial-vods&token=C1EQAgcOWlBaW0lDUFhZWE5dR04FAAEZBAoVD0lWUiMIChM%2FDiUNBRMaBQdHHRcOGE5cUQkKEjQbBQUCFRAQAgUFC0hRTkJDVElGSRoLBQgHGgAfAklCW1pCQUtISQkEFh4OAgQsDQ9IUUFYW1VHSxk%3D"
    },
    {
      "id": 4,
      "title": "Episódio 4",
      "duration": "45 min",
      "description": "As ações de Kim o deixam na mira de antigos e novos inimigos. Na hora do perigo, Han-soo e Jin-cheol aparecem para salvar o dia.",
      "image": "https://image.tmdb.org/t/p/w500/2yGGXfQmvcHlxktR17CowgcxVyp.jpg",
      "videoUrl": "http://www-fontedecanais-sh.77zzhf54vdll71.com/series/agente%20kim%20reativado/386087.mp4?username=PlayTvOficial-vods&token=C1EQAgcOWlBaW0lDUFhZWE9cR04FAAEZBAoVD0lWUiMIChM%2FDiUNBRMaBQdHHRcOGE5cUQkKEjQbBQUCFRAQAgUFC0hRTkJDVElGSRoLBQgHGgAfAklCW1pCQUtISQkEFh4OAgQsDQ9IUUFYW1VHShk%3D"
    },
    {
      "id": 5,
      "title": "Episódio 5",
      "duration": "45 min",
      "description": "Episódio 5",
      "image": "https://image.tmdb.org/t/p/w500/eMUfMt3PczKcEuHDczeC1RwXcZz.jpg",
      "videoUrl": "http://www-fontedecanais-sh.77zzhf54vdll71.com/series/agente%20kim%20reativado/386742.mp4?username=PlayTvOficial-vods&token=C1EQAgcOWlBaW0lDUFhZWEBfR04FAAEZBAoVD0lWUiMIChM%2FDiUNBRMaBQdHHRcOGE5cUQkKEjQbBQUCFRAQAgUFC0hRTkJDVElGSRoLBQgHGgAfAklCW1pCQUtISQkEFh4OAgQsDQ9IUUFYWlhJRBk%3D"
    },
    {
      "id": 6,
      "title": "Episódio 6",
      "duration": "45 min",
      "description": "Episódio 6",
      "image": "https://image.tmdb.org/t/p/w500/5nn1Dnb4udjJdnNcYNXM8CeFdsN.jpg",
      "videoUrl": "http://www-fontedecanais-sh.77zzhf54vdll71.com/series/agente%20kim%20reativado/386875.mp4?username=PlayTvOficial-vods&token=C1EQAgcOWlBaW0lDUFhZWEFfR04FAAEZBAoVD0lWUiMIChM%2FDiUNBRMaBQdHHRcOGE5cUQkKEjQbBQUCFRAQAgUFC0hRTkJDVElGSRoLBQgHGgAfAklCW1pCQUtISQkEFh4OAgQsDQ9IUUFYWlhJSxk%3D"
    },
    {
      "id": 7,
      "title": "Episódio 7",
      "duration": "45 min",
      "description": "Episódio 7",
      "image": "https://image.tmdb.org/t/p/w500/50iNTwCz358iEgJW7dZtugaQ8eA.jpg",
      "videoUrl": "http://www-fontedecanais-sh.77zzhf54vdll71.com/series/agente%20kim%20reativado/387506.mp4?username=PlayTvOficial-vods&token=C1EQAgcOWlBaW0lDUFhZX0hfR04FAAEZBAoVD0lWUiMIChM%2FDiUNBRMaBQdHHRcOGE5cUQkKEjQbBQUCFRAQAgUFC0hRTkJDVElGSRoLBQgHGgAfAklCW1pCQUtISQkEFh4OAgQsDQ9IUUFYWVxBQRk%3D"
    },
    {
      "id": 8,
      "title": "Episódio 8",
      "duration": "45 min",
      "description": "Episódio 8",
      "image": "https://image.tmdb.org/t/p/w500/s0NeAeh5x74Gzja767ksNbzh3sz.jpg",
      "videoUrl": "http://www-fontedecanais-sh.77zzhf54vdll71.com/series/agente%20kim%20reativado/387549.mp4?username=PlayTvOficial-vods&token=C1EQAgcOWlBaW0lDUFhZX0lfR04FAAEZBAoVD0lWUiMIChM%2FDiUNBRMaBQdHHRcOGE5cUQkKEjQbBQUCFRAQAgUFC0hRTkJDVElGSRoLBQgHGgAfAklCW1pCQUtISQkEFh4OAgQsDQ9IUUFYWV5DQhk%3D"
    },
    {
      "id": 9,
      "title": "Episódio 9",
      "duration": "45 min",
      "description": "Episódio 9",
      "image": "https://image.tmdb.org/t/p/w500/yr9ZDaEz7bNSCFycTZBWftCjL2h.jpg",
      "videoUrl": "http://www-fontedecanais-sh.77zzhf54vdll71.com/series/agente%20kim%20reativado/388481.mp4?username=PlayTvOficial-vods&token=C1EQAgcOWlBaW0lDUFhZX0ldR04FAAEZBAoVD0lWUiMIChM%2FDiUNBRMaBQdHHRcOGE5cUQkKEjQbBQUCFRAQAgUFC0hRTkJDVElGSRoLBQgHGgAfAklCW1pCQUtISQkEFh4OAgQsDQ9IUUFYWVtEQBk%3D"
    },
    {
      "id": 10,
      "title": "Episódio 10",
      "duration": "45 min",
      "description": "Episódio 10",
      "image": "https://image.tmdb.org/t/p/w500/ySFDgVK2lKXYkFi4TuORq45TmmF.jpg",
      "videoUrl": "http://www-fontedecanais-sh.77zzhf54vdll71.com/series/agente%20kim%20reativado/388547.mp4?username=PlayTvOficial-vods&token=C1EQAgcOWlBaW0lDUFhZX0lTR04FAAEZBAoVD0lWUiMIChM%2FDiUNBRMaBQdHHRcOGE5cUQkKEjQbBQUCFRAQAgUFC0hRTkJDVElGSRoLBQgHGgAfAklCW1pCQUtISQkEFh4OAgQsDQ9IUUFYWVVEQRk%3D"
    }
  ]
};

const ROWS = [
  {
    title: "Em Alta",
    movies: [
      { 
        id: "100", 
        title: "Agente Kim: Reativado", 
        image: "https://image.tmdb.org/t/p/w500/g1LJLlmWP74zv9yXKEXm7g9p10O.jpg", 
        description: "O gerente Kim é um trabalhador como qualquer outro, e sua maior preocupação é se conectar com a filha Kim Min-ji.", 
        videoUrl: "http://www-fontedecanais-sh.77zzhf54vdll71.com/series/agente%20kim%20reativado/384626.mp4?username=PlayTvOficial-vods&token=C1EQAgcOWlBaW0lDUFhYX0pYR04FAAEZBAoVD0lWUiMIChM%2FDiUNBRMaBQdHHRcOGE5cUQkKEjQbBQUCFRAQAgUFC0hRTkJDVElGSRoLBQgHGgAfAklCW1tCSEVISQkEFh4OAgQsDQ9IUUFYW1xEQRk%3D",
        episodes: [
          { "id": 1, "title": "Episódio 1", "duration": "45 min", "description": "O gerente Kim é um trabalhador como qualquer outro...", "image": "https://image.tmdb.org/t/p/w500/j1z8gs6jhJtRzS2Z3dSM5qKtvCM.jpg", "videoUrl": "http://www-fontedecanais-sh.77zzhf54vdll71.com/series/agente%20kim%20reativado/384626.mp4?username=PlayTvOficial-vods&token=C1EQAgcOWlBaW0lDUFhZWEtTR04FAAEZBAoVD0lWUiMIChM%2FDiUNBRMaBQdHHRcOGE5cUQkKEjQbBQUCFRAQAgUFC0hRTkJDVElGSRoLBQgHGgAfAklCW1pCQUtISQkEFh4OAgQsDQ9IUUFYW1xEQRk%3D" },
          { "id": 2, "title": "Episódio 2", "duration": "45 min", "description": "Desesperado para encontrar Min-ji...", "image": "https://image.tmdb.org/t/p/w500/75cFdAXUOmeVX2NhtdDthdJ9276.jpg", "videoUrl": "http://www-fontedecanais-sh.77zzhf54vdll71.com/series/agente%20kim%20reativado/384772.mp4?username=PlayTvOficial-vods&token=C1EQAgcOWlBaW0lDUFhZWE1cR04FAAEZBAoVD0lWUiMIChM%2FDiUNBRMaBQdHHRcOGE5cUQkKEjQbBQUCFRAQAgUFC0hRTkJDVElGSRoLBQgHGgAfAklCW1pCQUtISQkEFh4OAgQsDQ9IUUFYW1xEQBk%3D" },
          { "id": 3, "title": "Episódio 3", "duration": "45 min", "description": "Na procura por Min-ji...", "image": "https://image.tmdb.org/t/p/w500/v8pPQuIbicSgqm2xWW20LZaTQk5.jpg", "videoUrl": "http://www-fontedecanais-sh.77zzhf54vdll71.com/series/agente%20kim%20reativado/386058.mp4?username=PlayTvOficial-vods&token=C1EQAgcOWlBaW0lDUFhZWE5dR04FAAEZBAoVD0lWUiMIChM%2FDiUNBRMaBQdHHRcOGE5cUQkKEjQbBQUCFRAQAgUFC0hRTkJDVElGSRoLBQgHGgAfAklCW1pCQUtISQkEFh4OAgQsDQ9IUUFYW1VHSxk%3D" },
          { "id": 4, "title": "Episódio 4", "duration": "45 min", "description": "As ações de Kim o deixam na mira...", "image": "https://image.tmdb.org/t/p/w500/2yGGXfQmvcHlxktR17CowgcxVyp.jpg", "videoUrl": "http://www-fontedecanais-sh.77zzhf54vdll71.com/series/agente%20kim%20reativado/386087.mp4?username=PlayTvOficial-vods&token=C1EQAgcOWlBaW0lDUFhZWE9cR04FAAEZBAoVD0lWUiMIChM%2FDiUNBRMaBQdHHRcOGE5cUQkKEjQbBQUCFRAQAgUFC0hRTkJDVElGSRoLBQgHGgAfAklCW1pCQUtISQkEFh4OAgQsDQ9IUUFYW1VHShk%3D" },
          { "id": 5, "title": "Episódio 5", "duration": "45 min", "description": "Episódio 5", "image": "https://image.tmdb.org/t/p/w500/eMUfMt3PczKcEuHDczeC1RwXcZz.jpg", "videoUrl": "http://www-fontedecanais-sh.77zzhf54vdll71.com/series/agente%20kim%20reativado/386742.mp4?username=PlayTvOficial-vods&token=C1EQAgcOWlBaW0lDUFhZWEBfR04FAAEZBAoVD0lWUiMIChM%2FDiUNBRMaBQdHHRcOGE5cUQkKEjQbBQUCFRAQAgUFC0hRTkJDVElGSRoLBQgHGgAfAklCW1pCQUtISQkEFh4OAgQsDQ9IUUFYWlhJRBk%3D" },
          { "id": 6, "title": "Episódio 6", "duration": "45 min", "description": "Episódio 6", "image": "https://image.tmdb.org/t/p/w500/5nn1Dnb4udjJdnNcYNXM8CeFdsN.jpg", "videoUrl": "http://www-fontedecanais-sh.77zzhf54vdll71.com/series/agente%20kim%20reativado/386875.mp4?username=PlayTvOficial-vods&token=C1EQAgcOWlBaW0lDUFhZWEFfR04FAAEZBAoVD0lWUiMIChM%2FDiUNBRMaBQdHHRcOGE5cUQkKEjQbBQUCFRAQAgUFC0hRTkJDVElGSRoLBQgHGgAfAklCW1pCQUtISQkEFh4OAgQsDQ9IUUFYWlhJSxk%3D" },
          { "id": 7, "title": "Episódio 7", "duration": "45 min", "description": "Episódio 7", "image": "https://image.tmdb.org/t/p/w500/50iNTwCz358iEgJW7dZtugaQ8eA.jpg", "videoUrl": "http://www-fontedecanais-sh.77zzhf54vdll71.com/series/agente%20kim%20reativado/387506.mp4?username=PlayTvOficial-vods&token=C1EQAgcOWlBaW0lDUFhZX0hfR04FAAEZBAoVD0lWUiMIChM%2FDiUNBRMaBQdHHRcOGE5cUQkKEjQbBQUCFRAQAgUFC0hRTkJDVElGSRoLBQgHGgAfAklCW1pCQUtISQkEFh4OAgQsDQ9IUUFYWVxBQRk%3D" },
          { "id": 8, "title": "Episódio 8", "duration": "45 min", "description": "Episódio 8", "image": "https://image.tmdb.org/t/p/w500/s0NeAeh5x74Gzja767ksNbzh3sz.jpg", "videoUrl": "http://www-fontedecanais-sh.77zzhf54vdll71.com/series/agente%20kim%20reativado/387549.mp4?username=PlayTvOficial-vods&token=C1EQAgcOWlBaW0lDUFhZX0lfR04FAAEZBAoVD0lWUiMIChM%2FDiUNBRMaBQdHHRcOGE5cUQkKEjQbBQUCFRAQAgUFC0hRTkJDVElGSRoLBQgHGgAfAklCW1pCQUtISQkEFh4OAgQsDQ9IUUFYWV5DQhk%3D" },
          { "id": 9, "title": "Episódio 9", "duration": "45 min", "description": "Episódio 9", "image": "https://image.tmdb.org/t/p/w500/yr9ZDaEz7bNSCFycTZBWftCjL2h.jpg", "videoUrl": "http://www-fontedecanais-sh.77zzhf54vdll71.com/series/agente%20kim%20reativado/388481.mp4?username=PlayTvOficial-vods&token=C1EQAgcOWlBaW0lDUFhZX0ldR04FAAEZBAoVD0lWUiMIChM%2FDiUNBRMaBQdHHRcOGE5cUQkKEjQbBQUCFRAQAgUFC0hRTkJDVElGSRoLBQgHGgAfAklCW1pCQUtISQkEFh4OAgQsDQ9IUUFYWVtEQBk%3D" },
          { "id": 10, "title": "Episódio 10", "duration": "45 min", "description": "Episódio 10", "image": "https://image.tmdb.org/t/p/w500/ySFDgVK2lKXYkFi4TuORq45TmmF.jpg", "videoUrl": "http://www-fontedecanais-sh.77zzhf54vdll71.com/series/agente%20kim%20reativado/388547.mp4?username=PlayTvOficial-vods&token=C1EQAgcOWlBaW0lDUFhZX0lTR04FAAEZBAoVD0lWUiMIChM%2FDiUNBRMaBQdHHRcOGE5cUQkKEjQbBQUCFRAQAgUFC0hRTkJDVElGSRoLBQgHGgAfAklCW1pCQUtISQkEFh4OAgQsDQ9IUUFYWVVEQRk%3D" }
        ]
      },
      { id: "1", title: "Beleza Verdadeira", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop", description: "Uma garota do ensino médio sofre bullying por sua aparência e domina a arte da maquiagem.", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: "2", title: "Sorriso Real", image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=800&auto=format&fit=crop", description: "O herdeiro de um império de hotéis entra em conflito com uma funcionária conhecida por seu sorriso irresistível.", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: "3", title: "Vincenzo", image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=800&auto=format&fit=crop", description: "Durante uma visita ao seu país natal, um conselheiro da máfia coreano-italiano faz justiça com as próprias mãos.", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: "4", title: "Tudo Bem Não Ser Normal", image: "https://images.unsplash.com/photo-1533147670608-2a2f9776d3ac?q=80&w=800&auto=format&fit=crop", description: "O caminho para a cura emocional se abre para um cuidador de doentes mentais e uma escritora antissocial.", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
    ],
  },
  {
    title: "Lançamentos na DoramaStream",
    movies: [
      { 
        id: "101", 
        title: "Resident Playbook", 
        image: "https://image.tmdb.org/t/p/w500/oXaMHOQGx2V4HwoBa0IrouBe1yb.jpg", 
        description: "Residentes de ginecologia e obstetrícia do Centro Médico Yulje encaram o caos do trabalho.", 
        videoUrl: "http://www-fontedecanais-sh.77zzhf54vdll71.com/series/resident%20playbook/318152.mp4?username=PlayTvOficial-vods&token=C1EQAgcOWlBaW0lDUFhZWkxTR04FAAEZBAoVD0lWUiMIChM%2FDiUNBRMaBQdHHRcOGE5cUQkKEjQbBQUCFRAQAgUFC0hRTkJDVElGSRoLBQgHGgAfAklCW1pCQUtISQkEFh4OAgQsDQ9IUU9cU1VCQBk%3D",
        episodes: [
          {
            "id": 1,
            "title": "Episódio 1",
            "duration": "60 min",
            "description": "Com dificuldades financeiras, Oh Yi-young precisa voltar à vida de residente e acaba cometendo vários erros.",
            "image": "https://image.tmdb.org/t/p/w500/ozu4s6IQX1L7M4dzAjS45PCMsfY.jpg",
            "videoUrl": "http://www-fontedecanais-sh.77zzhf54vdll71.com/series/resident%20playbook/318152.mp4?username=PlayTvOficial-vods&token=C1EQAgcOWlBaW0lDUFhZXUteR04FAAEZBAoVD0lWUiMIChM%2FDiUNBRMaBQdHHRcOGE5cUQkKEjQbBQUCFRAQAgUFC0hRTkJDVElGSRoLBQgHGgAfAklCW1pCRUdISQkEFh4OAgQsDQ9IUU9cU1VCQBk%3D"
          },
          {
            "id": 2,
            "title": "Episódio 2",
            "duration": "60 min",
            "description": "Cansados da rotina difícil do hospital, os residentes do primeiro ano pensam em desistir.",
            "image": "https://image.tmdb.org/t/p/w500/8O8cKj9rHfB7Vt8cpEesvZngoct.jpg",
            "videoUrl": "http://www-fontedecanais-sh.77zzhf54vdll71.com/series/resident%20playbook/318153.mp4?username=PlayTvOficial-vods&token=C1EQAgcOWlBaW0lDUFhZXUtcR04FAAEZBAoVD0lWUiMIChM%2FDiUNBRMaBQdHHRcOGE5cUQkKEjQbBQUCFRAQAgUFC0hRTkJDVElGSRoLBQgHGgAfAklCW1pCRUdISQkEFh4OAgQsDQ9IUU9cU1VCRxk%3D"
          },
          {
            "id": 3,
            "title": "Episódio 3",
            "duration": "60 min",
            "description": "Episódio 3",
            "image": "https://image.tmdb.org/t/p/w500/qHU4gH5rlxDrRM8SffOxScW4igC.jpg",
            "videoUrl": "http://www-fontedecanais-sh.77zzhf54vdll71.com/series/resident%20playbook/318924.mp4?username=PlayTvOficial-vods&token=C1EQAgcOWlBaW0lDUFhZXUtSR04FAAEZBAoVD0lWUiMIChM%2FDiUNBRMaBQdHHRcOGE5cUQkKEjQbBQUCFRAQAgUFC0hRTkJDVElGSRoLBQgHGgAfAklCW1pCRUdISQkEFh4OAgQsDQ9IUU9dWVxISxk%3D"
          },
          {
            "id": 4,
            "title": "Episódio 4",
            "duration": "60 min",
            "description": "Episódio 4",
            "image": "https://image.tmdb.org/t/p/w500/wHnG00Zk5pM9qqGFsETrbNvvPiJ.jpg",
            "videoUrl": "http://www-fontedecanais-sh.77zzhf54vdll71.com/series/resident%20playbook/318925.mp4?username=PlayTvOficial-vods&token=C1EQAgcOWlBaW0lDUFhZXUxaR04FAAEZBAoVD0lWUiMIChM%2FDiUNBRMaBQdHHRcOGE5cUQkKEjQbBQUCFRAQAgUFC0hRTkJDVElGSRoLBQgHGgAfAklCW1pCRUdISQkEFh4OAgQsDQ9IUU9dWVxIShk%3D"
          },
          {
            "id": 5,
            "title": "Episódio 5",
            "duration": "60 min",
            "description": "Episódio 5",
            "image": "https://image.tmdb.org/t/p/w500/oEDZ5kPSVsIUBSmnsrDNsnI0RLw.jpg",
            "videoUrl": "http://www-fontedecanais-sh.77zzhf54vdll71.com/series/resident%20playbook/319890.mp4?username=PlayTvOficial-vods&token=C1EQAgcOWlBaW0lDUFhZXUxYR04FAAEZBAoVD0lWUiMIChM%2FDiUNBRMaBQdHHRcOGE5cUQkKEjQbBQUCFRAQAgUFC0hRTkJDVElGSRoLBQgHGgAfAklCW1pCRUdISQkEFh4OAgQsDQ9IUU9SX11HRxk%3D"
          },
          {
            "id": 6,
            "title": "Episódio 6",
            "duration": "60 min",
            "description": "Episódio 6",
            "image": "https://image.tmdb.org/t/p/w500/tNmbISQ6YtmxEVJ8c037XdOyq9x.jpg",
            "videoUrl": "http://www-fontedecanais-sh.77zzhf54vdll71.com/series/resident%20playbook/319891.mp4?username=PlayTvOficial-vods&token=C1EQAgcOWlBaW0lDUFhZXUxfR04FAAEZBAoVD0lWUiMIChM%2FDiUNBRMaBQdHHRcOGE5cUQkKEjQbBQUCFRAQAgUFC0hRTkJDVElGSRoLBQgHGgAfAklCW1pCRUdISQkEFh4OAgQsDQ9IUU9SX11HRhk%3D"
          },
          {
            "id": 7,
            "title": "Episódio 7",
            "duration": "60 min",
            "description": "Episódio 7",
            "image": "https://image.tmdb.org/t/p/w500/o2ZXngVZNmeJiP8n1Mbcvtm0yhZ.jpg",
            "videoUrl": "http://www-fontedecanais-sh.77zzhf54vdll71.com/series/resident%20playbook/320495.mp4?username=PlayTvOficial-vods&token=C1EQAgcOWlBaW0lDUFhZXUxdR04FAAEZBAoVD0lWUiMIChM%2FDiUNBRMaBQdHHRcOGE5cUQkKEjQbBQUCFRAQAgUFC0hRTkJDVElGSRoLBQgHGgAfAklCW1pCRUdISQkEFh4OAgQsDQ9IUU9TWF1FQhk%3D"
          },
          {
            "id": 8,
            "title": "Episódio 8",
            "duration": "60 min",
            "description": "Episódio 8",
            "image": "https://image.tmdb.org/t/p/w500/Ah7vCqGkSEDQbFk1VwCBFjPfcrY.jpg",
            "videoUrl": "http://www-fontedecanais-sh.77zzhf54vdll71.com/series/resident%20playbook/320496.mp4?username=PlayTvOficial-vods&token=C1EQAgcOWlBaW0lDUFhZXUxTR04FAAEZBAoVD0lWUiMIChM%2FDiUNBRMaBQdHHRcOGE5cUQkKEjQbBQUCFRAQAgUFC0hRTkJDVElGSRoLBQgHGgAfAklCW1pCRUdISQkEFh4OAgQsDQ9IUU9TWF1FQRk%3D"
          },
          {
            "id": 9,
            "title": "Episódio 9",
            "duration": "60 min",
            "description": "Episódio 9",
            "image": "https://image.tmdb.org/t/p/w500/1SVU1AZqzNOfCxgxzu0xiiJxCUZ.jpg",
            "videoUrl": "http://www-fontedecanais-sh.77zzhf54vdll71.com/series/resident%20playbook/320944.mp4?username=PlayTvOficial-vods&token=C1EQAgcOWlBaW0lDUFhZXU1bR04FAAEZBAoVD0lWUiMIChM%2FDiUNBRMaBQdHHRcOGE5cUQkKEjQbBQUCFRAQAgUFC0hRTkJDVElGSRoLBQgHGgAfAklCW1pCRUdISQkEFh4OAgQsDQ9IUU9TXFtHShk%3D"
          },
          {
            "id": 10,
            "title": "Episódio 10",
            "duration": "60 min",
            "description": "Episódio 10",
            "image": "https://image.tmdb.org/t/p/w500/Aa8I4YHXgibAjwA6nINbr0449wR.jpg",
            "videoUrl": "http://www-fontedecanais-sh.77zzhf54vdll71.com/series/resident%20playbook/320945.mp4?username=PlayTvOficial-vods&token=C1EQAgcOWlBaW0lDUFhZXU1eR04FAAEZBAoVD0lWUiMIChM%2FDiUNBRMaBQdHHRcOGE5cUQkKEjQbBQUCFRAQAgUFC0hRTkJDVElGSRoLBQgHGgAfAklCW1pCRUdISQkEFh4OAgQsDQ9IUU9TXFtIQxk%3D"
          },
          {
            "id": 11,
            "title": "Episódio 11",
            "duration": "60 min",
            "description": "Episódio 11",
            "image": "https://image.tmdb.org/t/p/w500/swJuUGBVJF1TYiYvN92jPyzKA3r.jpg",
            "videoUrl": "http://www-fontedecanais-sh.77zzhf54vdll71.com/series/resident%20playbook/322151.mp4?username=PlayTvOficial-vods&token=C1EQAgcOWlBaW0lDUFhZXU1cR04FAAEZBAoVD0lWUiMIChM%2FDiUNBRMaBQdHHRcOGE5cUQkKEjQbBQUCFRAQAgUFC0hRTkJDVElGSRoLBQgHGgAfAklCW1pCRUdISQkEFh4OAgQsDQ9IUUBaXl5DShk%3D"
          },
          {
            "id": 12,
            "title": "Episódio 12",
            "duration": "60 min",
            "description": "Episódio 12",
            "image": "https://image.tmdb.org/t/p/w500/zZkt3ZYC1oChhAYHdF3Zqa1eJ72.jpg",
            "videoUrl": "http://www-fontedecanais-sh.77zzhf54vdll71.com/series/resident%20playbook/322152.mp4?username=PlayTvOficial-vods&token=C1EQAgcOWlBaW0lDUFhZXU1SR04FAAEZBAoVD0lWUiMIChM%2FDiUNBRMaBQdHHRcOGE5cUQkKEjQbBQUCFRAQAgUFC0hRTkJDVElGSRoLBQgHGgAfAklCW1pCRUdISQkEFh4OAgQsDQ9IUUBaXl5EQxk%3D"
          }
        ]
      },
      { id: "8", title: "Pretendente Surpresa", image: "https://images.unsplash.com/photo-1518050947974-4be8c7469f0c?q=80&w=800&auto=format&fit=crop", description: "Ela vai a um encontro às cegas no lugar da amiga para assustar o pretendente, mas descobre que ele é seu chefe.", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: "9", title: "O Rei de Porcelana", image: "https://images.unsplash.com/photo-1528642474498-1af0c17fd8c3?q=80&w=800&auto=format&fit=crop", description: "Quando o príncipe herdeiro é morto, sua irmã gêmea assume o trono.", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: "10", title: "Meu Demônio Favorito", image: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?q=80&w=800&auto=format&fit=crop", description: "Um demônio perde seus poderes após se envolver com uma herdeira fria e arrogante.", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
    ],
  },
];

// ============================================================================
// FIM DA ÁREA DE EDIÇÃO
// ============================================================================

export default function BrowsePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  
  const [userRole, setUserRole] = useState("lead");
  const [showUpsell, setShowUpsell] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState("");

  const [myList, setMyList] = useState<any[]>([]);
  const [hoveredMovie, setHoveredMovie] = useState<string | null>(null);
    let hoverTimer: any = null;
  
  // Efeito para carregar "Minha Lista" do cache local
  useEffect(() => {
    const savedList = localStorage.getItem("doramastream_mylist");
    if (savedList) {
      try { setMyList(JSON.parse(savedList)); } catch (e) {}
    }
  }, []);

  const toggleMyList = (movie: any) => {
    setMyList(prev => {
      const isAlreadyInList = prev.some(item => item.id === movie.id);
      let newList;
      if (isAlreadyInList) {
        newList = prev.filter(item => item.id !== movie.id);
      } else {
        newList = [...prev, movie];
      }
      localStorage.setItem("doramastream_mylist", JSON.stringify(newList));
      return newList;
    });
  };

  const isInMyList = (movieId: string) => {
    return myList.some(item => item.id === movieId);
  };

  // Efeito para o delay do Trailer removido do banner principal a pedido do usuário

  
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("userRole") || "lead";
    setUserRole(role);

    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    router.push("/");
  };

  const playVideo = (id: string, url: string) => {
    router.push(`/watch/${id}?v=${encodeURIComponent(url)}`);
  };

  const handleNavClick = (section: string) => {
    if (section === "Filmes" && userRole !== "admin") {
      setShowUpsell(true);
    } else {
      setShowComingSoon(section);
    }
    setShowMobileMenu(false);
    setShowProfileMenu(false);
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white overflow-x-hidden">
      {/* Navbar */}
      <nav
        className={`fixed w-full z-40 transition-all duration-300 ${
          isScrolled ? "bg-[#141414]" : "bg-gradient-to-b from-black/80 to-transparent"
        } px-4 md:px-12 py-4 flex items-center justify-between`}
      >
        <div className="flex items-center gap-4 md:gap-8">
          <button className="md:hidden" onClick={() => setShowMobileMenu(!showMobileMenu)}>
            {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <Link href="/browse" className="text-[#e50914] font-black text-2xl tracking-tighter">
            DORAMASTREAM
          </Link>
          <div className="hidden md:flex gap-4 text-sm text-gray-300">
            <Link href="/browse" className="hover:text-gray-400 transition-colors">Início</Link>
            <Link href="/series" className="text-white font-medium hover:text-gray-400 transition-colors">Séries</Link>
            
            <span className="flex items-center gap-2 hover:text-gray-400 cursor-pointer" onClick={() => handleNavClick("Filmes")}>
              Filmes {userRole !== "admin" && <Lock className="w-4 h-4 text-[#e50914]" />}
            </span>
            
            <Link href="/minha-lista" className="hover:text-gray-400 transition-colors">Minha lista</Link>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6 text-white">
          <Search className="w-5 h-5 cursor-pointer hover:text-gray-300" onClick={() => handleNavClick("Pesquisa")} />
          <Bell className="w-5 h-5 cursor-pointer hover:text-gray-300" onClick={() => handleNavClick("Notificações")} />
          <div 
            className="relative flex items-center gap-2 cursor-pointer group"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className={`w-8 h-8 rounded flex items-center justify-center font-bold ${userRole === 'admin' ? 'bg-[#e50914]' : 'bg-blue-600'}`}>
              {userRole === 'admin' ? 'A' : 'U'}
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showProfileMenu ? 'rotate-180' : ''}`} />
            
            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute top-10 right-0 w-48 bg-black/95 border border-gray-800 rounded flex flex-col py-2 shadow-2xl z-50">
                <div className="px-4 py-2 border-b border-gray-700 mb-2">
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Logado como</p>
                  <p className="font-bold text-white capitalize">{userRole}</p>
                </div>
                <span className="px-4 py-2 hover:underline cursor-pointer text-sm" onClick={(e) => { e.stopPropagation(); handleNavClick("Gerenciar Perfis"); }}>Gerenciar Perfis</span>
                <span className="px-4 py-2 hover:underline cursor-pointer text-sm" onClick={(e) => { e.stopPropagation(); handleNavClick("Conta"); }}>Conta</span>
                <span className="px-4 py-2 hover:underline cursor-pointer text-sm" onClick={(e) => { e.stopPropagation(); handleNavClick("Ajuda"); }}>Ajuda</span>
                <div className="border-t border-gray-700 my-2"></div>
                <span className="px-4 py-2 hover:underline cursor-pointer text-sm text-center text-[#e50914] font-bold" onClick={(e) => { e.stopPropagation(); handleLogout(); }}>Sair da DoramaStream</span>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden fixed top-[60px] left-0 w-full h-screen bg-black/95 z-40 flex flex-col p-8 gap-6 text-lg font-medium">
          <Link href="/browse" className="hover:text-gray-400">Início</Link>
          <Link href="/series" className="hover:text-gray-400">Séries</Link>
          <span className="flex items-center gap-2 hover:text-gray-400 cursor-pointer" onClick={() => handleNavClick("Filmes")}>
            Filmes {userRole !== "admin" && <Lock className="w-4 h-4 text-[#e50914]" />}
          </span>
          <Link href="/minha-lista" className="hover:text-gray-400">Minha lista</Link>
        </div>
      )}

      {/* Hero Banner */}
      <div className="relative h-[85vh] w-full bg-black">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={MAIN_BANNER.image}
            alt={MAIN_BANNER.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
          


          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
        </div>

        <div className="absolute bottom-[20%] left-4 md:left-12 max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-2xl mb-4">
            {MAIN_BANNER.title}
          </h1>
          
          <div className="flex items-center gap-3 text-sm md:text-base font-semibold text-white mb-4 drop-shadow-md">
            <span className="text-green-500">{MAIN_BANNER.match}</span>
            <span>{MAIN_BANNER.year}</span>
            <span className="border border-gray-400 px-1">{MAIN_BANNER.age}</span>
            <span>{MAIN_BANNER.duration}</span>
            <span className="border border-gray-400 text-[10px] px-1 rounded-sm">HD</span>
          </div>

          <p className="text-white text-base md:text-lg drop-shadow-lg mb-6 line-clamp-3">
            {MAIN_BANNER.description}
          </p>

          <div className="flex gap-3">
            <button 
              onClick={() => playVideo(MAIN_BANNER.id, MAIN_BANNER.videoUrl)}
              className="flex items-center justify-center gap-2 bg-white text-black px-6 py-2 md:py-3 rounded md:text-lg font-bold hover:bg-white/80 transition-colors w-28 md:w-36"
            >
              <Play className="w-6 h-6 fill-black" /> Assistir
            </button>
            <button 
              onClick={() => setSelectedMovie(MAIN_BANNER)}
              className="flex items-center justify-center gap-2 bg-gray-500/70 text-white px-6 py-2 md:py-3 rounded md:text-lg font-bold hover:bg-gray-500/50 transition-colors w-40 md:w-48 backdrop-blur-sm"
            >
              <Info className="w-6 h-6" /> Mais info
            </button>
          </div>
        </div>
      </div>

      {/* Content Rows */}
      <div className="relative z-20 pb-20 -mt-20 md:-mt-32">
        {ROWS.map((row, index) => (
          <div key={index} id={`row-${index}`} className="mb-8 md:mb-12">
            <h2 className="text-white text-lg md:text-xl font-bold mb-2 md:mb-4 px-4 md:px-12">
              {row.title}
            </h2>
            <div className="flex gap-2 overflow-x-auto px-4 md:px-12 pb-4 hide-scroll">
              {row.movies.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => setSelectedMovie(movie)}
                  onMouseEnter={() => {
                    hoverTimer = setTimeout(() => setHoveredMovie(movie.id), 1500);
                  }}
                  onMouseLeave={() => {
                    clearTimeout(hoverTimer);
                    setHoveredMovie(null);
                  }}
                  className="relative shrink-0 w-36 h-20 md:w-72 md:h-40 rounded cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-30 group"
                >
                  {hoveredMovie === movie.id && movie.trailerUrl ? (
                    <div className="absolute inset-0 w-full h-full overflow-hidden rounded bg-black">
                      <iframe
                        className="absolute w-[150%] h-[150%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                        src={`https://www.youtube.com/embed/${movie.trailerUrl}?autoplay=1&mute=1&controls=0&loop=1&playlist=${movie.trailerUrl}&playsinline=1`}
                        title="Trailer"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      ></iframe>
                    </div>
                  ) : (
                    <Image
                      src={movie.image}
                      alt={movie.title}
                      fill
                      className="object-cover rounded"
                      unoptimized
                    />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 rounded" />
                  
                  <div className="absolute inset-0 flex flex-col justify-end p-2 md:p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/80 to-transparent rounded">
                    <p className="text-white text-sm md:text-base font-bold mb-1">{movie.title}</p>
                    <div className="flex items-center gap-2">
                       <button onClick={(e) => { e.stopPropagation(); playVideo(movie.id, movie.videoUrl); }} className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-300">
                          <Play className="w-3 h-3 md:w-4 md:h-4 fill-black text-black ml-0.5" />
                       </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal - Mais Info */}
      {selectedMovie && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-0 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedMovie(null)}>
          <div className="bg-[#181818] w-full max-w-3xl max-h-[90vh] rounded-lg overflow-y-auto overflow-x-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200 scrollbar-hide" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-4 right-4 z-10 w-8 h-8 bg-[#181818] rounded-full flex items-center justify-center hover:bg-gray-700 border border-gray-600" onClick={() => setSelectedMovie(null)}>
              <X className="w-5 h-5 text-white" />
            </button>
            <div className="relative h-[40vh] w-full">
               <Image src={selectedMovie.image} alt={selectedMovie.title} fill className="object-cover" unoptimized />
               <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />
               <div className="absolute bottom-4 left-8">
                 <h2 className="text-3xl md:text-4xl font-black text-white drop-shadow-md mb-4">{selectedMovie.title}</h2>
                 <button onClick={() => { setSelectedMovie(null); playVideo(selectedMovie.id, selectedMovie.videoUrl); }} className="flex items-center justify-center gap-2 bg-white text-black px-6 py-2 rounded font-bold hover:bg-white/80 transition-colors">
                    <Play className="w-5 h-5 fill-black" /> Assistir
                 </button>
               </div>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-3 text-sm font-semibold text-white mb-4">
                <span className="text-green-500">Novo</span>
                <span className="border border-gray-400 px-1">12</span>
                <span>HD</span>
              </div>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                {selectedMovie.description || "Sem descrição disponível para este conteúdo."}
              </p>
            </div>

            {/* Episodios List */}
            {selectedMovie.episodes && selectedMovie.episodes.length > 0 && (
              <div className="px-4 md:px-8 pb-8 mt-4">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-white text-xl md:text-2xl font-bold">Episódios</h3>
                  <span className="text-gray-400 text-sm md:text-base">{selectedMovie.title}</span>
                </div>
                
                <div className="flex flex-col gap-2">
                  {selectedMovie.episodes.map((ep: any, index: number) => (
                    <div 
                      key={ep.id} 
                      className="flex items-center gap-4 p-4 rounded hover:bg-white/10 transition-colors cursor-pointer group border-b border-[#333] last:border-0"
                      onClick={() => { setSelectedMovie(null); playVideo(selectedMovie.id, ep.videoUrl); }}
                    >
                      <h4 className="text-gray-400 text-xl md:text-2xl font-bold w-6 text-center">{index + 1}</h4>
                      
                      <div className="relative w-24 h-14 md:w-32 md:h-20 bg-gray-800 rounded overflow-hidden flex-shrink-0">
                        {/* Imagem do episodio (ou da serie) */}
                        <Image src={ep.image || selectedMovie.image} alt={ep.title} fill className="object-cover" unoptimized />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                           <Play className="w-6 h-6 md:w-8 md:h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h5 className="text-white font-bold truncate pr-4">{ep.title}</h5>
                          <span className="text-gray-400 text-xs md:text-sm whitespace-nowrap">{ep.duration}</span>
                        </div>
                        <p className="text-gray-400 text-xs md:text-sm line-clamp-2 leading-snug">{ep.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Upsell Modal */}
      {showUpsell && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" onClick={() => setShowUpsell(false)}>
          <div className="bg-gradient-to-b from-[#222] to-[#111] border border-[#e50914]/50 w-full max-w-lg rounded-xl p-8 text-center shadow-[0_0_50px_rgba(229,9,20,0.2)] relative" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-gray-400 hover:text-white" onClick={() => setShowUpsell(false)}>
              <X className="w-6 h-6" />
            </button>
            <div className="w-20 h-20 bg-[#e50914]/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#e50914]/30">
              <Crown className="w-10 h-10 text-[#e50914]" />
            </div>
            <h2 className="text-2xl font-black text-white mb-2">Desbloqueie Todos os Filmes</h2>
            <p className="text-gray-400 mb-8">
              Você está acessando como Lead. Os filmes exclusivos são liberados apenas no plano premium da DoramaStream! Assine agora para ter acesso ilimitado a filmes em 4K.
            </p>
            <Link href="/dramapvp" className="inline-flex w-full justify-center items-center gap-2 bg-[#e50914] text-white font-bold py-4 rounded hover:bg-red-700 transition-colors">
              Assinar Plano Premium
            </Link>
          </div>
        </div>
      )}

      {/* Coming Soon / Feature Modal */}
      {showComingSoon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setShowComingSoon("")}>
          <div className="bg-[#181818] border border-gray-700 w-full max-w-sm rounded-xl p-6 text-center" onClick={(e) => e.stopPropagation()}>
             <h2 className="text-xl font-bold text-white mb-2">{showComingSoon}</h2>
             <p className="text-gray-400 mb-6">
               Você clicou em "{showComingSoon}". No sistema real, isso redirecionará para a seção apropriada.
             </p>
             <button onClick={() => setShowComingSoon("")} className="bg-white text-black font-bold px-6 py-2 rounded hover:bg-gray-200">
               Fechar
             </button>
          </div>
        </div>
      )}

    </div>
  );
}
