import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORTFOLIO_DIR = os.path.join(ROOT, 'assets', 'portfolio')
MAIN_JS = os.path.join(ROOT, 'js', 'main.js')

PREVIEW_GALLERY_CATEGORIES = {'avatari', 'branding', 'music', 'video'}


def natural_key(s):
    return [int(t) if t.isdigit() else t.lower() for t in re.split(r'(\d+)', s)]


def find_mobile_map(files):
    """Сопоставляем десктопные mp4 с мобильными версиями -mob.mp4."""
    mobile_map = {}
    for f in files:
        if f.lower().endswith('-mob.mp4'):
            desktop_candidate = f[:-8] + '.mp4'
            mobile_map[desktop_candidate.lower()] = f
    return mobile_map


def pack_file(filename, mobile_map):
    if filename.lower().endswith('-mob.mp4'):
        return None
    if filename.lower().endswith('.mp4') and filename.lower() in mobile_map:
        return {'desktop': filename, 'mobile': mobile_map[filename.lower()]}
    return filename


def scan_category(category_path):
    preview_dir = os.path.join(category_path, 'preview')
    gallery_dir = os.path.join(category_path, 'gallery')

    has_preview = os.path.isdir(preview_dir)
    has_gallery = os.path.isdir(gallery_dir)

    if has_preview and has_gallery:
        preview_files = sorted(os.listdir(preview_dir), key=natural_key)
        gallery_files = sorted(os.listdir(gallery_dir), key=natural_key)
        mobile_preview = find_mobile_map(preview_files)
        mobile_gallery = find_mobile_map(gallery_files)
        return {
            'preview': [pack_file(f, mobile_preview) for f in preview_files if pack_file(f, mobile_preview) is not None],
            'gallery': [pack_file(f, mobile_gallery) for f in gallery_files if pack_file(f, mobile_gallery) is not None]
        }
    else:
        files = sorted(os.listdir(category_path), key=natural_key)
        mobile_map = find_mobile_map(files)
        return [pack_file(f, mobile_map) for f in files if pack_file(f, mobile_map) is not None]


def js_value(value, indent=2):
    """Превращаем Python-структуру в JS-литерал с отступами."""
    prefix = ' ' * indent
    if isinstance(value, dict):
        if not value:
            return '{}'
        items = []
        for k, v in value.items():
            items.append(f"{prefix}  {k}: {js_value(v, indent + 2)}")
        return '{\n' + ',\n'.join(items) + '\n' + prefix + '}'
    if isinstance(value, list):
        if not value:
            return '[]'
        items = []
        for item in value:
            items.append(f"{prefix}  {js_value(item, indent + 2)}")
        return '[\n' + ',\n'.join(items) + '\n' + prefix + ']'
    if isinstance(value, str):
        return repr(value).replace("'", '"')
    return repr(value)


def build_portfolio_files():
    data = {}
    for category in sorted(os.listdir(PORTFOLIO_DIR)):
        category_path = os.path.join(PORTFOLIO_DIR, category)
        if not os.path.isdir(category_path):
            continue
        data[category] = scan_category(category_path)
    return data


def update_main_js():
    data = build_portfolio_files()
    js_object = js_value(data, indent=2)
    # Добавляем отступ для вставки после const portfolioFiles =
    js_block = f"const portfolioFiles = {js_object};"

    with open(MAIN_JS, 'r', encoding='utf-8') as f:
        content = f.read()

    pattern = r"const portfolioFiles = \{[\s\S]*?\};"
    if not re.search(pattern, content):
        raise RuntimeError('Не удалось найти блок portfolioFiles в js/main.js')

    new_content = re.sub(pattern, js_block, content, count=1)

    with open(MAIN_JS, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f'Обновлён {MAIN_JS}')
    print('Категории:')
    for cat, val in data.items():
        if isinstance(val, dict):
            print(f"  {cat}: preview={len(val.get('preview', []))}, gallery={len(val.get('gallery', []))}")
        else:
            print(f"  {cat}: {len(val)} файлов")


if __name__ == '__main__':
    update_main_js()
