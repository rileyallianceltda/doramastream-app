import re
import codecs

with codecs.open('rows_raw.txt', 'r', 'utf-8') as f:
    text = f.read()

# Extract Agente Kim (id: "100")
agente_kim_match = re.search(r'{\s*id: "100".*?\]\s*}', text, re.DOTALL)
agente_kim_obj = agente_kim_match.group(0) if agente_kim_match else ""

# Extract Resident Playbook (id: "101")
resident_playbook_match = re.search(r'{\s*id: "101".*?\]\s*}', text, re.DOTALL)
resident_playbook_obj = resident_playbook_match.group(0) if resident_playbook_match else ""

new_rows = f"""const ROWS = [
  {{
    title: "Séries de Ação e Suspense",
    movies: [
      {agente_kim_obj}
    ]
  }},
  {{
    title: "Dramas Médicos e Romances",
    movies: [
      {resident_playbook_obj}
    ]
  }}
];"""

def update_file(filepath):
    with codecs.open(filepath, 'r', 'utf-8') as f:
        content = f.read()
    
    # Replace the ROWS block
    new_content = re.sub(r'const ROWS = \[.*?\];\n\s*// ===', new_rows + '\n// ===', content, flags=re.DOTALL)
    
    with codecs.open(filepath, 'w', 'utf-8') as f:
        f.write(new_content)

update_file('src/app/browse/page.tsx')
update_file('src/app/series/page.tsx')

print("Updated ROWS successfully")
