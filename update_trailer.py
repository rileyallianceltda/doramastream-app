import re

with open('src/app/browse/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add trailerUrl to the Agent Kim object in ROWS
content = content.replace(
    'title: "Agente Kim: Reativado", \n          image: "https://image.tmdb.org/t/p/w500/g1LJLlmWP74zv9yXKEXm7g9p10O.jpg",',
    'title: "Agente Kim: Reativado", \n          image: "https://image.tmdb.org/t/p/w500/g1LJLlmWP74zv9yXKEXm7g9p10O.jpg",\n          trailerUrl: "xSztRfnJZzE",'
)

with open('src/app/browse/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated trailer in ROWS")
