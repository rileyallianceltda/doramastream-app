import re

with open('src/app/browse/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add Plus and Check icons to lucide-react import
content = content.replace(
    'import { Play, Info, Search, Bell, ChevronDown, Menu, X, Lock, Crown } from "lucide-react";',
    'import { Play, Info, Search, Bell, ChevronDown, Menu, X, Lock, Crown, Plus, Check, ThumbsUp } from "lucide-react";'
)

# 2. Add state for My List and Trailer
states_to_add = """
  const [myList, setMyList] = useState<any[]>([]);
  const [showTrailer, setShowTrailer] = useState(false);
  
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

  // Efeito para o delay do Trailer no banner principal
  useEffect(() => {
    if (!selectedMovie) {
      const timer = setTimeout(() => {
        setShowTrailer(true);
      }, 3000); // 3 segundos para começar o trailer
      return () => clearTimeout(timer);
    } else {
      setShowTrailer(false);
    }
  }, [selectedMovie]);
"""

content = content.replace('  const [showComingSoon, setShowComingSoon] = useState("");', '  const [showComingSoon, setShowComingSoon] = useState("");\n' + states_to_add)

# 3. Add Minha Lista to Navigation
nav_replacement = """
          <span className="flex items-center gap-2 hover:text-gray-400 cursor-pointer" onClick={() => handleNavClick("Filmes")}>
            Filmes {userRole !== "admin" && <Lock className="w-4 h-4 text-[#e50914]" />}
          </span>
          <span className="hover:text-gray-400 cursor-pointer" onClick={() => handleNavClick("Séries")}>
            Séries
          </span>
          <span className="hover:text-gray-400 cursor-pointer transition-colors" onClick={() => {
            const listRow = document.getElementById("minha-lista-row");
            if (listRow) listRow.scrollIntoView({ behavior: 'smooth' });
          }}>
            Minha lista
          </span>
"""
# Replace the existing nav links correctly. I'll just use regex for the whole nav segment.
import re
content = re.sub(r'<span[^>]*onClick=\{\(\) => handleNavClick\("Filmes"\)\}[^>]*>[\s\S]*?</span>', nav_replacement, content, count=1)


# 4. Modify Main Banner to support the Trailer iframe
banner_visual_old = """
      <div className="absolute inset-0 z-0">
        <Image
          src={MAIN_BANNER.image}
          alt={MAIN_BANNER.title}
          fill
          className="object-cover"
          priority
          unoptimized={true}
        />
        <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>
"""
banner_visual_new = """
      <div className="absolute inset-0 z-0 bg-black">
        {/* Imagem de Fundo (fade out quando o trailer inicia) */}
        <Image
          src={MAIN_BANNER.image}
          alt={MAIN_BANNER.title}
          fill
          className={`object-cover transition-opacity duration-1000 ${showTrailer && MAIN_BANNER.trailerUrl ? 'opacity-0' : 'opacity-100'}`}
          priority
          unoptimized={true}
        />
        
        {/* Trailer do YouTube (aparece quando showTrailer é true) */}
        {showTrailer && MAIN_BANNER.trailerUrl && (
          <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            <iframe
              className="absolute w-[150%] h-[150%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              src={`https://www.youtube.com/embed/${MAIN_BANNER.trailerUrl}?autoplay=1&mute=1&controls=0&loop=1&playlist=${MAIN_BANNER.trailerUrl}&playsinline=1`}
              title="Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        <div className="absolute inset-0 bg-black/20 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>
"""
content = content.replace(banner_visual_old, banner_visual_new)

# 5. Add "Minha Lista" dynamically to ROWS rendering
rows_render_old = """
      <div className="relative z-10 pb-20 -mt-32">
        {ROWS.map((row, index) => (
"""
rows_render_new = """
      <div className="relative z-10 pb-20 -mt-32">
        {/* Renderiza a Minha Lista se houver filmes salvos */}
        {myList.length > 0 && (
          <div id="minha-lista-row" className="mb-8 px-4 md:px-12">
            <h2 className="text-white text-xl md:text-2xl font-bold mb-4">Minha Lista</h2>
            <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide snap-x">
              {myList.map((movie) => (
                <div
                  key={movie.id}
                  className="relative min-w-[160px] md:min-w-[240px] h-[90px] md:h-[135px] cursor-pointer transition-transform duration-300 hover:scale-105 snap-start group"
                  onClick={() => setSelectedMovie(movie)}
                >
                  <Image src={movie.image} alt={movie.title} fill className="object-cover rounded" unoptimized={true} />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 rounded flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Play className="w-8 h-8 text-white fill-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {ROWS.map((row, index) => (
"""
content = content.replace(rows_render_old, rows_render_new)


# 6. Update Modal (Mais Info) to have Trailer + Add to List button
modal_header_old = """
          {/* Imagem de Capa do Modal */}
          <div className="relative h-[300px] md:h-[400px] w-full">
            <Image
              src={selectedMovie.image}
              alt={selectedMovie.title}
              fill
              className="object-cover rounded-t-lg"
              unoptimized={true}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#181818] to-transparent" />
            
            <div className="absolute bottom-6 left-6 md:left-12 flex gap-3">
              <button 
                onClick={() => playVideo(selectedMovie.videoUrl)}
                className="bg-white text-black px-6 py-2 rounded flex items-center gap-2 font-bold hover:bg-white/80 transition-colors"
              >
                <Play className="w-5 h-5 fill-black" /> Assistir
              </button>
            </div>
          </div>
"""
modal_header_new = """
          {/* Cabeçalho do Modal (Trailer com Autoplay) */}
          <div className="relative h-[300px] md:h-[450px] w-full bg-black">
            {selectedMovie.trailerUrl ? (
              <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none rounded-t-lg">
                <iframe
                  className="absolute w-[150%] h-[150%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  src={`https://www.youtube.com/embed/${selectedMovie.trailerUrl}?autoplay=1&mute=0&controls=0&loop=1&playlist=${selectedMovie.trailerUrl}&playsinline=1`}
                  title="Trailer"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <Image
                src={selectedMovie.image}
                alt={selectedMovie.title}
                fill
                className="object-cover rounded-t-lg"
                unoptimized={true}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />
            
            <div className="absolute bottom-6 left-6 md:left-12 flex items-center gap-3">
              <button 
                onClick={() => playVideo(selectedMovie.videoUrl)}
                className="bg-white text-black px-6 py-2 rounded flex items-center gap-2 font-bold hover:bg-white/80 transition-colors"
              >
                <Play className="w-5 h-5 fill-black" /> Assistir
              </button>
              
              <button
                onClick={() => toggleMyList(selectedMovie)}
                className="w-10 h-10 border-2 border-gray-400 rounded-full flex items-center justify-center bg-black/50 hover:border-white hover:bg-white/10 transition-colors group"
                title="Minha Lista"
              >
                {isInMyList(selectedMovie.id) ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <Plus className="w-5 h-5 text-white" />
                )}
              </button>
              
              <button
                className="w-10 h-10 border-2 border-gray-400 rounded-full flex items-center justify-center bg-black/50 hover:border-white hover:bg-white/10 transition-colors"
                title="Classificar"
              >
                <ThumbsUp className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
"""
content = content.replace(modal_header_old, modal_header_new)

with open('src/app/browse/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated successfully")
