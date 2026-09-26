import sys
import re
filepath = r"c:\Users\Lopes\Desktop\Streaming\SUBIR_PUBLIC_HTML_DORAMAS\dorama-stream\public\dramapvp\index.php"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove all inserted rows first to clean up
content = re.sub(r'\s*<!-- Row: Atualizacao diaria -->.*?</div>\s*</div>', '', content, flags=re.DOTALL)
content = re.sub(r'\s*<!-- Row: Seguro e legal -->.*?</div>\s*</div>', '', content, flags=re.DOTALL)

# Now we insert them exactly once, in the correct places.
row_atualizacao = """

                <!-- Row: Atualizacao diaria -->
                <div class="grid grid-cols-4 border-b border-[#222] hover:bg-[#151515] transition-colors items-center relative">
                    <div class="absolute inset-y-0 left-[25%] right-[50%] bg-[#FFC107]/5 z-0 pointer-events-none border-x border-[#FFC107]/10"></div>
                    <div class="col-span-1 text-gray-300 font-medium text-xs md:text-base p-4 md:p-6 z-10">Atualização diária</div>
                    <div class="col-span-1 text-center text-[#FFC107] text-lg md:text-xl z-10"><i class="fa-solid fa-check"></i></div>
                    <div class="col-span-1 text-center text-red-600/70 text-lg md:text-xl z-10"><i class="fa-solid fa-xmark"></i></div>
                    <div class="col-span-1 text-center text-white font-bold text-xs md:text-base z-10">Lento</div>
                </div>"""

row_seguro = """

                <!-- Row: Seguro e legal -->
                <div class="grid grid-cols-4 border-b border-[#222] hover:bg-[#151515] transition-colors items-center relative">
                    <div class="absolute inset-y-0 left-[25%] right-[50%] bg-[#FFC107]/5 z-0 pointer-events-none border-x border-[#FFC107]/10"></div>
                    <div class="col-span-1 text-gray-300 font-medium text-xs md:text-base p-4 md:p-6 z-10">Seguro e legal</div>
                    <div class="col-span-1 text-center text-[#FFC107] text-lg md:text-xl z-10"><i class="fa-solid fa-check"></i></div>
                    <div class="col-span-1 text-center text-[#FFC107] text-lg md:text-xl z-10"><i class="fa-solid fa-check"></i></div>
                    <div class="col-span-1 text-center text-red-600/70 text-lg md:text-xl z-10"><i class="fa-solid fa-xmark"></i></div>
                </div>"""

# Insert Atualizacao after Sem travamentos
content = re.sub(
    r'(<div class="col-span-1 text-gray-300 font-medium text-xs md:text-base p-4 md:p-6 z-10">Sem travamentos</div>.*?</div>\s*</div>)',
    r'\1' + row_atualizacao,
    content,
    count=1,
    flags=re.DOTALL
)

# Insert Seguro e legal after Sem anuncios
content = re.sub(
    r'(<div class="col-span-1 text-gray-300 font-medium text-xs md:text-base p-4 md:p-6 z-10">Sem an.ncios</div>.*?</div>\s*</div>)',
    r'\1' + row_seguro,
    content,
    count=1,
    flags=re.DOTALL
)

# Ensure title is DRAMAS TV
content = re.sub(
    r'Por que <span class="text-\[#FFC107\]">.*?</span> ganha',
    r'Por que <span class="text-[#FFC107]">DRAMAS TV</span> ganha',
    content
)

content = re.sub(
    r'<div class="col-span-1 text-center font-black text-\[#FFC107\] text-xs md:text-xl uppercase drop-shadow-md">.*?</div>',
    r'<div class="col-span-1 text-center font-black text-[#FFC107] text-xs md:text-xl uppercase drop-shadow-md">DRAMAS TV</div>',
    content,
    count=1 # wait, there might be other places, but we only want the table header. The table header is unique.
)

# Replace 2,16 with 2,07
content = content.replace('R$ 2,16', 'R$ 2,07')
content = content.replace('R$2,16', 'R$ 2,07')
# also fix the text in the pricing block
content = content.replace('R$2,16/MÊS', 'R$2,07/MÊS')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print('Cleaned up and inserted successfully')
