import re, json

with open('src/app/browse/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# We just want to extract the block between `const ROWS = [` and `// ============================================================================`
match = re.search(r'const ROWS = (\[.*?\]);\n\s*// ============================================================================', content, re.DOTALL)
if match:
    rows_str = match.group(1)
    with open('rows_raw.txt', 'w', encoding='utf-8') as f:
        f.write(rows_str)
    print("Extracted")
else:
    print("Not found")
