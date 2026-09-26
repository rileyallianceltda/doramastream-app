import re

with open('src/app/minha-lista/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the block comment hacks
content = content.replace('const ROWS: any[] = []; /*', 'const ROWS: any[] = [];')
content = content.replace('*/\n// FIM DA ÁREA DE EDIÇÃO', '// FIM DA ÁREA DE EDIÇÃO')

# Now let's remove everything from `const ROWS: any[] = [];` to `// FIM DA ÁREA DE EDIÇÃO` 
# except keeping the `const ROWS: any[] = [];` and `// FIM DA ÁREA DE EDIÇÃO`
match = re.search(r'(const ROWS: any\[\] = \[\];).*?(// FIM DA ÁREA DE EDIÇÃO)', content, re.DOTALL)
if match:
    content = content.replace(match.group(0), 'const ROWS: any[] = [];\n// FIM DA ÁREA DE EDIÇÃO')

with open('src/app/minha-lista/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Cleaned Minha Lista")
