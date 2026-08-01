const fs = require('fs');
const path = require('path');

function naturalCompare(a, b) {
  const re = /(\d+)|\D+/g;
  const ax = String(a).match(re);
  const bx = String(b).match(re);
  const len = Math.min(ax.length, bx.length);
  for (let i = 0; i < len; i++) {
    const an = ax[i], bn = bx[i];
    const aNum = /^\d+$/.test(an) ? parseInt(an, 10) : null;
    const bNum = /^\d+$/.test(bn) ? parseInt(bn, 10) : null;
    if (aNum !== null && bNum !== null) {
      if (aNum !== bNum) return aNum - bNum;
    } else {
      const cmp = an.localeCompare(bn, undefined, { sensitivity: 'base' });
      if (cmp !== 0) return cmp;
    }
  }
  return ax.length - bx.length;
}

const root = 'C:/Users/Admin/myai/tavolod-digital-website/assets/portfolio';

function listFiles(dir) {
  const full = path.join(root, dir);
  if (!fs.existsSync(full)) return [];
  return fs.readdirSync(full).filter(f => fs.statSync(path.join(full, f)).isFile());
}

function processMp4Folder(dir) {
  const files = listFiles(dir);
  const set = new Set(files.map(f => f.toLowerCase()));
  const result = [];
  files.filter(f => !f.toLowerCase().endsWith('-mob.mp4')).sort(naturalCompare).forEach(f => {
    const base = f.replace(/\.mp4$/i, '');
    const mobile = base + '-mob.mp4';
    if (set.has(mobile.toLowerCase())) {
      const actualMobile = files.find(x => x.toLowerCase() === mobile.toLowerCase());
      result.push({ desktop: f, mobile: actualMobile });
    } else {
      result.push(f);
    }
  });
  return result;
}

function processFlat(dir) {
  const files = listFiles(dir);
  const mp4s = files.filter(f => f.toLowerCase().endsWith('.mp4') && !f.toLowerCase().endsWith('-mob.mp4'));
  const others = files.filter(f => !f.toLowerCase().endsWith('.mp4'));
  const set = new Set(files.map(f => f.toLowerCase()));
  const result = [];
  mp4s.sort(naturalCompare).forEach(f => {
    const base = f.replace(/\.mp4$/i, '');
    const mobile = base + '-mob.mp4';
    if (set.has(mobile.toLowerCase())) {
      const actualMobile = files.find(x => x.toLowerCase() === mobile.toLowerCase());
      result.push({ desktop: f, mobile: actualMobile });
    } else {
      result.push(f);
    }
  });
  others.sort(naturalCompare).forEach(f => result.push(f));
  return result;
}

function processSimple(dir) {
  return listFiles(dir).sort(naturalCompare);
}

const obj = {
  neurofoto: processSimple('neurofoto'),
  avatari: {
    preview: processMp4Folder('avatari/preview'),
    gallery: processMp4Folder('avatari/gallery')
  },
  music: {
    preview: processSimple('music/preview'),
    gallery: processSimple('music/gallery')
  },
  video: {
    preview: processMp4Folder('video/preview'),
    gallery: processMp4Folder('video/gallery')
  },
  branding: {
    preview: processSimple('branding/preview'),
    gallery: processSimple('branding/gallery')
  },
  art: processSimple('art'),
  marketplaces: processFlat('marketplaces')
};

function quote(s) {
  return "'" + s.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
}

function formatValue(v, indent) {
  if (Array.isArray(v)) {
    if (v.length === 0) return '[]';
    const items = v.map(x => formatValue(x, indent + 2));
    const oneLine = items.every(x => !x.includes('\n'));
    if (oneLine && items.join(', ').length < 80) {
      return '[ ' + items.join(', ') + ' ]';
    }
    const inner = ' '.repeat(indent + 2);
    const close = ' '.repeat(indent);
    return '[\n' + items.map(x => inner + x).join(',\n') + '\n' + close + ']';
  } else if (typeof v === 'string') {
    return quote(v);
  } else if (typeof v === 'object' && v !== null) {
    const entries = Object.entries(v);
    if (entries.length === 0) return '{}';
    const inner = ' '.repeat(indent + 2);
    const close = ' '.repeat(indent);
    return '{\n' + entries.map(([k, val]) => inner + k + ': ' + formatValue(val, indent + 2)).join(',\n') + '\n' + close + '}';
  }
  return String(v);
}

console.log('const portfolioFiles = ' + formatValue(obj, 0) + ';');
