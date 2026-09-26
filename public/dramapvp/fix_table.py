import sys
filepath = r"c:\Users\Lopes\Desktop\Streaming\SUBIR_PUBLIC_HTML_DORAMAS\dorama-stream\public\dramapvp\index.php"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Row to insert after Sem travamentos
row_atualizacao = """

                <!-- Row: Atualizacao diaria -->
                <div class="grid grid-cols-4 border-b border-[#222] hover:bg-[#151515] transition-colors items-center relative">
                    <div class="absolute inset-y-0 left-[25%] right-[50%] bg-[#FFC107]/5 z-0 pointer-events-none border-x border-[#FFC107]/10"></div>
                    <div class="col-span-1 text-gray-300 font-medium text-xs md:text-base p-4 md:p-6 z-10">Atualização diária</div>
                    <div class="col-span-1 text-center text-[#FFC107] text-lg md:text-xl z-10"><i class="fa-solid fa-check"></i></div>
                    <div class="col-span-1 text-center text-red-600/70 text-lg md:text-xl z-10"><i class="fa-solid fa-xmark"></i></div>
                    <div class="col-span-1 text-center text-white font-bold text-xs md:text-base z-10">Lento</div>
                </div>"""

# Insert after Row 3's ending </div>
search_travamentos = """<div class="col-span-1 text-center text-red-600/70 text-lg md:text-xl z-10"><i class="fa-solid fa-xmark"></i></div>
                </div>"""

if search_travamentos in content:
    content = content.replace(search_travamentos, search_travamentos + row_atualizacao, 1)
else:
    print("Could not find Travamentos anchor")


# Row to insert after Sem anuncios
row_seguro = """

                <!-- Row: Seguro e legal -->
                <div class="grid grid-cols-4 border-b border-[#222] hover:bg-[#151515] transition-colors items-center relative">
                    <div class="absolute inset-y-0 left-[25%] right-[50%] bg-[#FFC107]/5 z-0 pointer-events-none border-x border-[#FFC107]/10"></div>
                    <div class="col-span-1 text-gray-300 font-medium text-xs md:text-base p-4 md:p-6 z-10">Seguro e legal</div>
                    <div class="col-span-1 text-center text-[#FFC107] text-lg md:text-xl z-10"><i class="fa-solid fa-check"></i></div>
                    <div class="col-span-1 text-center text-[#FFC107] text-lg md:text-xl z-10"><i class="fa-solid fa-check"></i></div>
                    <div class="col-span-1 text-center text-red-600/70 text-lg md:text-xl z-10"><i class="fa-solid fa-xmark"></i></div>
                </div>"""

search_anuncios = """<div class="col-span-1 text-center text-red-600/70 text-lg md:text-xl z-10"><i class="fa-solid fa-xmark"></i></div>
                </div>"""

# Wait, search_anuncios is the EXACT same string as search_travamentos because both rows end the same way.
# I need a larger anchor.
search_travamentos_full = """                    <div class="col-span-1 text-gray-300 font-medium text-xs md:text-base p-4 md:p-6 z-10">Sem travamentos</div>
                    <div class="col-span-1 text-center text-[#FFC107] text-lg md:text-xl z-10"><i class="fa-solid fa-check"></i></div>
                    <div class="col-span-1 text-center text-[#FFC107] text-lg md:text-xl z-10"><i class="fa-solid fa-check"></i></div>
                    <div class="col-span-1 text-center text-red-600/70 text-lg md:text-xl z-10"><i class="fa-solid fa-xmark"></i></div>
                </div>"""

if search_travamentos_full in content:
    # it might have failed because the anchor had different whitespace or encoding issues (e.g. anncios)
    pass

# A better way is using regular expressions
import re

# Insert Atualizacao
content = re.sub(
    r'(<div class="col-span-1 text-gray-300 font-medium text-xs md:text-base p-4 md:p-6 z-10">Sem travamentos</div>.*?</div>\s*</div>)',
    r'\1' + row_atualizacao,
    content,
    flags=re.DOTALL
)

# Insert Seguro e legal
# use Sem an.ncios because of encoding
content = re.sub(
    r'(<div class="col-span-1 text-gray-300 font-medium text-xs md:text-base p-4 md:p-6 z-10">Sem an.ncios</div>.*?</div>\s*</div>)',
    r'\1' + row_seguro,
    content,
    flags=re.DOTALL
)

# Replace "DoramaStream" with "DRAMAS TV" in that specific section title and table header
content = re.sub(
    r'Por que <span class="text-\[#FFC107\]">DoramaStream</span> ganha',
    r'Por que <span class="text-[#FFC107]">DRAMAS TV</span> ganha',
    content
)

content = re.sub(
    r'<div class="col-span-1 text-center font-black text-\[#FFC107\] text-xs md:text-xl uppercase drop-shadow-md">DoramaStream</div>',
    r'<div class="col-span-1 text-center font-black text-[#FFC107] text-xs md:text-xl uppercase drop-shadow-md">DRAMAS TV</div>',
    content
)

# Replace R$ 2,16 with R$ 2,07 in the comparison table
# Anchor it slightly
content = re.sub(
    r'<div class="col-span-1 text-center text-white font-black text-sm md:text-2xl z-10">R\$ 2,16</div>',
    r'<div class="col-span-1 text-center text-white font-black text-sm md:text-2xl z-10">R$ 2,07</div>',
    content
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print('File updated successfully')
