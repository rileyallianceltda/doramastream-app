import re

with open('src/app/browse/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add hoveredMovie state
if 'const [hoveredMovie, setHoveredMovie] = useState<string | null>(null);' not in content:
    content = content.replace(
        'const [showTrailer, setShowTrailer] = useState(false);',
        'const [hoveredMovie, setHoveredMovie] = useState<string | null>(null);\n    let hoverTimer: any = null;'
    )

# 2. Fix Trailer ID in MAIN_BANNER
content = content.replace('trailerUrl: "Pj15bA-rCSI"', 'trailerUrl: "xSztRfnJZzE"')

# 3. Remove Trailer iframe from Hero Banner
hero_old = """          {showTrailer && MAIN_BANNER.trailerUrl && (
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
          )}"""
content = content.replace(hero_old, "")

# 4. Remove showTrailer opacity from Hero Image
content = content.replace(
    'className={`object-cover transition-opacity duration-1000 ${showTrailer && MAIN_BANNER.trailerUrl ? \'opacity-0\' : \'opacity-100\'}`}',
    'className="object-cover"'
)

# 5. Add ID to ROWS and Hover logic to cards
row_old = """      <div className="relative z-10 pb-20 -mt-32">"""
row_new = """      <div className="relative z-10 pb-20 -mt-32">"""
# Actually, let's find the row mapping
content = content.replace(
    '<div className="mb-8 px-4 md:px-12">',
    '<div className="mb-8 px-4 md:px-12" id={`row-${index}`}>'
)

# Replace the movie card to include hover logic
card_old = """                <div
                  key={movie.id}
                  className="relative min-w-[160px] md:min-w-[240px] h-[90px] md:h-[135px] cursor-pointer transition-transform duration-300 hover:scale-105 snap-start group"
                  onClick={() => setSelectedMovie(movie)}
                >
                  <Image
                    src={movie.image}
                    alt={movie.title}
                    fill
                    className="object-cover rounded"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 rounded flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Play className="w-8 h-8 text-white fill-white" />
                  </div>
                </div>"""
                
card_new = """                <div
                  key={movie.id}
                  className="relative min-w-[160px] md:min-w-[240px] h-[90px] md:h-[135px] cursor-pointer transition-transform duration-300 hover:scale-105 snap-start group"
                  onClick={() => setSelectedMovie(movie)}
                  onMouseEnter={() => {
                    hoverTimer = setTimeout(() => setHoveredMovie(movie.id), 2000);
                  }}
                  onMouseLeave={() => {
                    clearTimeout(hoverTimer);
                    setHoveredMovie(null);
                  }}
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
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 rounded flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Play className="w-8 h-8 text-white fill-white" />
                  </div>
                </div>"""
content = content.replace(card_old, card_new)

# Add trailerUrl to the first movie in ROWS so we can test the hover!
content = content.replace(
    'image: "https://image.tmdb.org/t/p/w500/vX5J414gG2K2gN2O7T4mF7H8p.jpg",',
    'image: "https://image.tmdb.org/t/p/w500/vX5J414gG2K2gN2O7T4mF7H8p.jpg",\n        trailerUrl: "xSztRfnJZzE",'
)

with open('src/app/browse/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated successfully")
