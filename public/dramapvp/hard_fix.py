import sys

filepath = r"c:\Users\Lopes\Desktop\Streaming\SUBIR_PUBLIC_HTML_DORAMAS\dorama-stream\public\dramapvp\index.php"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

start_idx = content.find('async function loadTMDBDoramas() {')
if start_idx != -1:
    # Find the next function to know where to cut
    end_idx = content.find('// Timer', start_idx)
    if end_idx != -1:
        print('Found bounds. Replacing...')
        
        json_data = '''[{"title": "Advogadaextra", "cover_image": "imagens/carrossel_doramas/advogadaextra.webp"}, {"title": "Alição", "cover_image": "imagens/carrossel_doramas/alição.jpg"}, {"title": "Amor De Mentira", "cover_image": "imagens/carrossel_doramas/amor-de-mentira.jpg"}, {"title": "Amormoraleft", "cover_image": "imagens/carrossel_doramas/amormoraleft.webp"}, {"title": "Aprendendoalicao", "cover_image": "imagens/carrossel_doramas/aprendendoalicao.jpg"}, {"title": "Aveiaperfeita", "cover_image": "imagens/carrossel_doramas/aveiaperfeita.webp"}, {"title": "Beijotnt", "cover_image": "imagens/carrossel_doramas/beijotnt.jpg"}, {"title": "Belezafalsa", "cover_image": "imagens/carrossel_doramas/belezafalsa.jpg"}, {"title": "Boyondemand", "cover_image": "imagens/carrossel_doramas/boyondemand.jpg"}, {"title": "Climadeamor", "cover_image": "imagens/carrossel_doramas/climadeamor.jfif"}, {"title": "Desgracaaomeudispore", "cover_image": "imagens/carrossel_doramas/desgracaaomeudispore.jpg"}, {"title": "Globin", "cover_image": "imagens/carrossel_doramas/globin.webp"}, {"title": "Goodboy", "cover_image": "imagens/carrossel_doramas/goodboy.jpg"}, {"title": "Hapiness", "cover_image": "imagens/carrossel_doramas/hapiness.jpg"}, {"title": "Hidden Love", "cover_image": "imagens/carrossel_doramas/hidden-love.jpg"}, {"title": "Hieararchy", "cover_image": "imagens/carrossel_doramas/hieararchy.jpg"}, {"title": "Hospitalplaylist", "cover_image": "imagens/carrossel_doramas/Hospitalplaylist.jpg"}, {"title": "Moving", "cover_image": "imagens/carrossel_doramas/moving.jpg"}, {"title": "Mulherfortebongsoon", "cover_image": "imagens/carrossel_doramas/mulherfortebongsoon.jpg"}, {"title": "Myalchemysouls", "cover_image": "imagens/carrossel_doramas/myalchemysouls.jpg"}, {"title": "Mydearestnemesis", "cover_image": "imagens/carrossel_doramas/mydearestnemesis.webp"}, {"title": "Mydemon", "cover_image": "imagens/carrossel_doramas/mydemon.webp"}, {"title": "Myroyalnemesis", "cover_image": "imagens/carrossel_doramas/myroyalnemesis.webp"}, {"title": "Never Ending Summer", "cover_image": "imagens/carrossel_doramas/never-ending-summer.webp"}, {"title": "Oamortaesgotadop", "cover_image": "imagens/carrossel_doramas/oamortaesgotadop.webp"}, {"title": "Ostontos", "cover_image": "imagens/carrossel_doramas/ostontos.webp"}, {"title": "Otaxista", "cover_image": "imagens/carrossel_doramas/Otaxista.jpg"}, {"title": "Otempotemandaembora", "cover_image": "imagens/carrossel_doramas/otempotemandaembora.webp"}, {"title": "Pousandonolove", "cover_image": "imagens/carrossel_doramas/pousandonolove.jpg"}, {"title": "Pretendentesurpresa", "cover_image": "imagens/carrossel_doramas/pretendentesurpresa.jpg"}, {"title": "Pursuitofjader", "cover_image": "imagens/carrossel_doramas/pursuitofjader.webp"}, {"title": "Rainha Das Lagrimas", "cover_image": "imagens/carrossel_doramas/Rainha-das-lagrimas.webp"}, {"title": "Responde1988", "cover_image": "imagens/carrossel_doramas/responde1988.jpg"}, {"title": "Roadtosucess", "cover_image": "imagens/carrossel_doramas/roadtosucess.webp"}, {"title": "Round6", "cover_image": "imagens/carrossel_doramas/round6.webp"}, {"title": "Sedesejopsmatassem", "cover_image": "imagens/carrossel_doramas/sedesejopsmatassem.png"}, {"title": "Sorrifalso", "cover_image": "imagens/carrossel_doramas/sorrifalso.jpg"}, {"title": "Terradogold", "cover_image": "imagens/carrossel_doramas/terradogold.png"}, {"title": "Tudobvem", "cover_image": "imagens/carrossel_doramas/tudobvem.jpg"}, {"title": "Umamordefaixadinha", "cover_image": "imagens/carrossel_doramas/umamordefaixadinha.jpg"}, {"title": "Vincenzo", "cover_image": "imagens/carrossel_doramas/vincenzo.jpg"}, {"title": "Zombieschool", "cover_image": "imagens/carrossel_doramas/zombieschool.jpg"}]'''

        new_func = f'''async function loadTMDBDoramas() {{
            try {{
                const carousel = document.getElementById('doramaCarousel');
                let imagesHtml = '<div class="flex gap-4">';
                let doramas = {json_data};

                doramas.sort(() => Math.random() - 0.5);
                let allDoramas = [...doramas, ...doramas, ...doramas];

                allDoramas.forEach(dorama => {{
                    if(dorama.cover_image) {{
                        imagesHtml += `<div class="w-32 h-48 md:w-40 md:h-60 bg-[#141414] rounded-md overflow-hidden relative shadow-lg shrink-0 border border-[#2D2D2D]/50 hover:border-[#FF0A16] hover:scale-105 transition-all duration-300" title="${{dorama.title}}"><img src="${{dorama.cover_image}}" alt="${{dorama.title}}" class="w-full h-full object-cover"></div>`;
                    }}
                }});

                imagesHtml += '</div>';
                carousel.innerHTML = imagesHtml + imagesHtml;
                carousel.style.animationDuration = '120s';
                carousel.classList.remove('opacity-0');
            }} catch (error) {{
                console.error("Erro ao montar doramas", error);
            }}
        }}

        // Timer
'''

        content = content[:start_idx] + new_func + content[end_idx + 8:]
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print('Fixed successfully')
    else:
        print('End bound not found')
else:
    print('Start bound not found')
