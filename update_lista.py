import re

with open('src/app/minha-lista/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the ROWS.map with nothing, and change Minha Lista to a grid
old_rows = """        {ROWS.map((row, index) => ("""
new_rows = """        {/* ROWS Removidos da página Minha Lista */}
        {/*
        {ROWS.map((row, index) => ("""

old_list = """        {/* Renderiza a Minha Lista se houver filmes salvos */}
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
        )}"""

new_list = """        {/* Renderiza a Minha Lista se houver filmes salvos */}
        <div id="minha-lista-row" className="mb-8 px-4 md:px-12 min-h-[50vh]">
          <h2 className="text-white text-xl md:text-2xl font-bold mb-8">Minha Lista</h2>
          
          {myList.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {myList.map((movie) => (
                <div
                  key={movie.id}
                  className="relative w-full aspect-video cursor-pointer transition-transform duration-300 hover:scale-105 group"
                  onClick={() => setSelectedMovie(movie)}
                >
                  <Image src={movie.image} alt={movie.title} fill className="object-cover rounded" unoptimized={true} />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 rounded flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Play className="w-8 h-8 text-white fill-white" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-lg">Você ainda não adicionou nenhum título à sua lista.</p>
          )}
        </div>"""

content = content.replace(old_list, new_list)
# Block out the entire ROWS.map
# We need to find where ROWS.map ends. It's too complex with regex, I'll just delete the ROWS variable and mapping via simple search.
# Actually it's easier to just leave ROWS mapped but empty!
content = content.replace('const ROWS = [', 'const ROWS: any[] = []; /*')
content = content.replace('// ============================================================================', '*/ // ============================================================================', 1)

with open('src/app/minha-lista/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated Minha Lista")
