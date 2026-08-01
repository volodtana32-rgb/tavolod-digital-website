const icons = {
  neurofoto: `<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="10"/><circle cx="24" cy="24" r="16" stroke-dasharray="4 4"/></svg>`,
  avatari: `<svg viewBox="0 0 48 48"><circle cx="24" cy="20" r="8"/><path d="M12 40c0-8 6-12 12-12s12 4 12 12"/><path d="M34 10l4-2M34 14l4 2" stroke-dasharray="2 2"/></svg>`,
  music: `<svg viewBox="0 0 48 48"><path d="M20 36V16l16-4v20"/><circle cx="16" cy="36" r="4"/><circle cx="36" cy="32" r="4"/></svg>`,
  video: `<svg viewBox="0 0 48 48"><rect x="8" y="12" width="32" height="24" rx="3"/><path d="M20 21l6 3-6 3z" fill="currentColor" stroke="none"/><line x1="36" y1="16" x2="36" y2="32"/></svg>`,
  branding: `<svg viewBox="0 0 48 48"><rect x="8" y="8" width="32" height="32" rx="4"/><circle cx="24" cy="24" r="6"/></svg>`,
  art: `<svg viewBox="0 0 48 48"><path d="M8 36l10-18 8 12 8-10 6 16z"/><circle cx="14" cy="14" r="3"/></svg>`,
  copywriting: `<svg viewBox="0 0 48 48"><rect x="10" y="8" width="28" height="32" rx="3"/><line x1="15" y1="16" x2="33" y2="16"/><line x1="15" y1="22" x2="33" y2="22"/><line x1="15" y1="28" x2="25" y2="28"/><path d="M36 38l-4-4 4-4"/></svg>`,
  marketplaces: `<svg viewBox="0 0 48 48"><rect x="6" y="10" width="14" height="14" rx="2"/><rect x="28" y="10" width="14" height="14" rx="2"/><rect x="6" y="28" width="14" height="14" rx="2"/><rect x="28" y="28" width="14" height="14" rx="2"/></svg>`,
  vibecoding: `<svg viewBox="0 0 48 48"><rect x="8" y="10" width="32" height="28" rx="3"/><path d="M14 18l6 6-6 6" fill="none"/><line x1="22" y1="30" x2="34" y2="30"/></svg>`
};

const portfolioBase = 'assets/portfolio';

// Услуги с разделением preview / gallery.
// Для видео-услуг храним также мобильную версию (-mob.mp4).
const portfolioFiles = {
  neurofoto: [
    '1.png','2.png','3.png','4.png','5.png','6.png','7.png','8.png','9.png','10.png',
    '11.png','12.png','13.jpg','14.png','15.png','16.png','17.jpg','18.png','19.png','20.png',
    '21.jpg','22.png','23.png','24.png','25.png','26.png','27.png','28.png','29.png','30.png',
    '31.png','32.png','33.png','34.png','35.png','36.png','37.png','38.png','39.png','40.png',
    '41.png','42.png','43.png','44.png','45.png','46.png','47.png','48.png','49.png','50.png',
    '51.png','52.png','53.png','54.png','55.png','56.png','57.png','58.png','59.png','60.png',
    '61.png','62.png','63.png','64.png','65.png','66.png','67.png','68.png','69.png','70.png',
    '71.png','72.png','73.png','74.png','75.png','76.png','77.png','78.png'
  ],
  avatari: {
    preview: ['preview-01-demo.mp4','preview-02-demo.mp4','preview-03-demo.mp4'],
    gallery: [
      'Аватар Таня Волод-demo.mp4','Аватар стихочтец-demo.mp4','Аватар-demo.mp4','Аватары из архива-demo.mp4',
      'Магия_Визуала_Бренда_with_captions-demo.mp4','Мини интервью с аватаром-demo.mp4',
      'Персональное поздравление от Деда Мороза-demo.mp4','Юмор по аватарски-demo.mp4'
    ]
  },
  music: {
    preview: [
      'preview-Дурман.MP3','preview-Жарю хряка.MP3','preview-Любовь.MP3','preview-Матвей.MP3',
      'preview-Супер-солдат.MP3','preview-Юбилей2.MP3'
    ],
    gallery: [
      'Алко.MP3','Выпускной кавер.MP3','Джунгли.MP3','Для НН.MP3','ДР2.MP3','ДР3.MP3','Инки.MP3','На ДР.MP3',
      'Огонь.MP3','Раджа.MP3','реклама2.MP3','реклама.MP3','речь от 1 аватара.MP3','Света.MP3','Слос.MP3',
      'Сур-ро-гат.MP3','Тебя обниму.MP3','Юбилей.MP3'
    ]
  },
  video: {
    preview: [
      { desktop: 'preview-01-demo.mp4', mobile: 'preview-01-demo-mob.mp4' },
      'preview-02-demo.mp4',
      { desktop: 'preview-03-demo.mp4', mobile: 'preview-03-demo-mob.mp4' },
      { desktop: 'preview-04-demo.mp4', mobile: 'preview-04-demo-mob.mp4' },
      { desktop: 'preview-05-demo.mp4', mobile: 'preview-05-demo-mob.mp4' },
      { desktop: 'preview-06-demo.mp4', mobile: 'preview-06-demo-mob.mp4' }
    ],
    gallery: [
      { desktop: 'AI Попаданка в фильмы-demo.mp4', mobile: 'Ai Попаданка в фильмы-demo-mob.mp4' },
      { desktop: 'Баг-demo.mp4', mobile: 'Баг-demo-mob.mp4' },
      { desktop: 'Завод-demo.mp4', mobile: 'Завод-demo-mob.mp4' },
      { desktop: 'Морфинг в супергероя-demo.mp4', mobile: 'Морфинг В Супергероя-demo-mob.mp4' },
      { desktop: 'Рекламный ролик Т-Rex Food-demo.mp4', mobile: 'Рекламный Ролик Т-Rex Food-demo-mob.mp4' },
      { desktop: 'Ролик киношный мини-demo.mp4', mobile: 'Ролик киношный мини-demo-mob.mp4' },
      { desktop: 'Смена причесок с помощью AI-demo.mp4', mobile: 'Смена причесок с помощью Ai-demo-mob.mp4' },
      { desktop: 'Тизер Баг и Кыш-demo.mp4', mobile: 'Тизер Баг и Кыш-demo-mob.mp4' }
    ]
  },
  branding: {
    preview: ['preview-01.png','preview-02.png','preview-03.png','preview-04.png'],
    gallery: ['1.png','2.png','3.png','4.png','5.png','6.png','7.png']
  },
  art: ['01.png','02.png','03.png','04.png','05.png','06.png'],
  marketplaces: ['preview-01-demo.mp4','preview-02.png','preview-03.png','preview-04.png','preview-05.png']
};

const items = [
  { key: 'neurofoto', title: 'Нейрофото и AI-образы', desc: 'Портреты, ретушь, оживление фото' },
  { key: 'avatari', title: 'Цифровые аватары', desc: 'AI-двойник, говорящий аватар' },
  { key: 'music', title: 'Авторская музыка', desc: 'Песни, каверы, клипы под трек' },
  { key: 'video', title: 'Видеопродакшн', desc: 'Реклама, истории «как в кино»' },
  { key: 'branding', title: 'Брендинг и дизайн', desc: 'Логотипы, айдентика, соцсети' },
  { key: 'art', title: 'Иллюстрации и арт', desc: 'Обложки, авторский арт' },
  { key: 'copywriting', title: 'Тексты и AI-копирайтинг', desc: 'Сценарии, статьи, презентации' },
  { key: 'marketplaces', title: 'Маркетплейсы', desc: 'Карточки товаров, инфографика' },
  { key: 'vibecoding', title: 'Вайбкодинг', desc: 'Сайты и веб-приложения на AI' }
];

function hasPreviewGallery(key) {
  return key === 'video' || key === 'avatari' || key === 'branding' || key === 'music';
}

const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

function resolveFile(file) {
  if (typeof file === 'string') return file;
  return (isMobile() && file.mobile) ? file.mobile : file.desktop;
}

function getPreviewFiles(key) {
  const entry = portfolioFiles[key];
  if (!entry) return [];
  if (hasPreviewGallery(key)) {
    return (entry.preview || []).map(resolveFile);
  }
  return Array.isArray(entry) ? entry.map(resolveFile) : [];
}

function getGalleryFiles(key) {
  const entry = portfolioFiles[key];
  if (!entry) return [];
  if (hasPreviewGallery(key)) {
    // В галерее показываем только полноразмерные работы (gallery),
    // чтобы не дублировать превью карточек.
    return (entry.gallery || []).map(resolveFile);
  }
  return Array.isArray(entry) ? entry.map(resolveFile) : [];
}

// ===== МОДАЛЬНАЯ ГАЛЕРЕЯ ПО УСЛУГЕ =====
const galleryModal = document.getElementById('galleryModal');
const galleryBackdrop = document.getElementById('galleryBackdrop');
const galleryClose = document.getElementById('galleryClose');
const galleryTitle = document.getElementById('galleryTitle');
const galleryGrid = document.getElementById('galleryGrid');

function openGallery(key) {
  const item = items.find(i => i.key === key);
  if (!item) return;
  const files = getGalleryFiles(key);

  if (galleryTitle) galleryTitle.innerHTML = `${item.title} · <em>примеры</em>`;
  if (galleryGrid) galleryGrid.innerHTML = '';

  if (key === 'copywriting' || !files.length) {
    if (galleryGrid) {
      galleryGrid.innerHTML = `<div class="gallery-empty"><p>Примеры для этой услуги появятся позже.</p></div>`;
    }
  } else {
    const previewSet = new Set((portfolioFiles[key]?.preview || []).map(f => resolveFile(f)));
    files.forEach((file) => {
      const isPreview = previewSet.has(file);
      const folder = hasPreviewGallery(key) ? (isPreview ? '/preview' : '/gallery') : '';
      const path = `${portfolioBase}/${key}${folder}/${file}`;
      const ext = file.split('.').pop().toLowerCase();
      const div = document.createElement('div');
      div.className = 'gallery-item';

      if (['mp4','webm','ogg'].includes(ext)) {
        div.classList.add('has-video');
        div.innerHTML = `
          <video muted loop playsinline controls preload="metadata"><source src="${path}" type="video/mp4"></video>
          <button class="video-play" aria-label="Воспроизвести видео">
            <svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="rgba(255,34,56,0.85)"/><path d="M20 16l14 8-14 8z" fill="#fff"/></svg>
          </button>
        `;
        const btn = div.querySelector('.video-play');
        const video = div.querySelector('video');
        btn.addEventListener('click', () => {
          if (video.paused) {
            video.play();
          } else {
            video.pause();
          }
        });
        video.addEventListener('play', () => div.classList.add('playing'));
        video.addEventListener('pause', () => div.classList.remove('playing'));
        video.addEventListener('ended', () => div.classList.remove('playing'));
      } else if (['mp3','wav','ogg'].includes(ext)) {
        div.classList.add('audio');
        div.innerHTML = `
          <div class="audio-name">${file.replace(/\.[^.]+$/, '')}</div>
          <audio controls preload="metadata"><source src="${path}" type="audio/mpeg"></audio>
        `;
      } else {
        div.classList.add('has-lightbox');
        div.innerHTML = `<img src="${path}" alt="${item.title} — ${file}" loading="lazy">`;
        div.addEventListener('click', () => openLightbox(path, item.title, file));
      }
      if (galleryGrid) galleryGrid.appendChild(div);
    });
  }

  if (galleryModal) galleryModal.classList.add('open');
  document.body.classList.add('modal-open');
}

function closeGallery() {
  if (galleryModal) galleryModal.classList.remove('open');
  document.body.classList.remove('modal-open');
  if (galleryGrid) {
    galleryGrid.querySelectorAll('video, audio').forEach(media => {
      media.pause();
      media.currentTime = 0;
    });
  }
}

if (galleryClose) galleryClose.addEventListener('click', closeGallery);
if (galleryBackdrop) galleryBackdrop.addEventListener('click', closeGallery);
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && galleryModal && galleryModal.classList.contains('open')) closeGallery();
});

// ===== LIGHTBOX ДЛЯ ФОТО =====
const lightbox = document.getElementById('lightbox');
const lightboxBackdrop = document.getElementById('lightboxBackdrop');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxImg = document.getElementById('lightboxImg');

function openLightbox(src, title, file) {
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = src;
  lightboxImg.alt = `${title} — ${file}`;
  lightbox.classList.add('open');
  document.body.classList.add('lightbox-open');
}

function closeLightbox() {
  if (lightbox) lightbox.classList.remove('open');
  document.body.classList.remove('lightbox-open');
  if (lightboxImg) lightboxImg.src = '';
}

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox && lightbox.classList.contains('open')) closeLightbox();
});

// ===== СПИРАЛЬ =====
const spiral = document.getElementById('spiral');
const stage = document.getElementById('stage');

if (spiral && stage) {
  const count = items.length;
  const mqMobile = window.matchMedia('(max-width: 768px)');
  const mqNarrow = window.matchMedia('(max-width: 480px)');
  const isMobile = mqMobile.matches;
  const isNarrow = mqNarrow.matches;
  const radius = isNarrow ? 180 : (isMobile ? 220 : 460);
  const verticalStep = isNarrow ? 24 : (isMobile ? 28 : 46);
  let rotationY = 0;
  let isDragging = false;
  let hasDragged = false;
  const dragThreshold = 6;
  let startX = 0;
  let startRotation = 0;
  let autoTimer = null;

  items.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.key = item.key;
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      if (!hasDragged) openGallery(item.key);
    });

    const previewFiles = getPreviewFiles(item.key);
    let mediaHTML = '';
    if (previewFiles.length) {
      card.classList.add('has-media');
      const first = previewFiles[0];
      const firstPath = `${portfolioBase}/${item.key}${hasPreviewGallery(item.key) ? '/preview' : ''}/${first}`;
      if (/\.(mp4|webm|ogg)$/i.test(first)) {
        card.classList.add('has-video');
        mediaHTML = `
          <video class="card-media" autoplay muted loop playsinline>
            <source src="${firstPath}" type="video/mp4">
          </video>
        `;
      } else if (/\.(mp3|wav|ogg)$/i.test(first)) {
        mediaHTML = `
          <div class="audio-waves">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
        `;
      } else {
        card.style.backgroundImage = `url('${firstPath}')`;
      }
    }

    const angle = (360 / count) * i;
    const y = (i - count / 2) * verticalStep * 0.4;
    card.style.transform = `rotateY(${angle}deg) translateZ(${radius}px) translateY(${y}px)`;
    card.dataset.angle = angle;
    card.innerHTML = `
      ${mediaHTML}
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
    `;
    card.setAttribute('aria-label', `${item.title}: ${item.desc}`);
    spiral.appendChild(card);
  });

  function applyRotation() {
    spiral.style.transform = `rotateY(${rotationY}deg)`;
    highlightActive();
  }

  function highlightActive() {
    const cards = spiral.querySelectorAll('.card');
    cards.forEach(card => {
      let angle = (parseFloat(card.dataset.angle) + rotationY) % 360;
      if (angle < 0) angle += 360;
      const diff = Math.min(angle, 360 - angle);
      card.classList.toggle('active', diff < (360 / count) / 2);
    });
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(() => {
      if (!isDragging) {
        rotationY += 0.08;
        applyRotation();
      }
    }, 16);
  }
  function stopAuto() {
    if (autoTimer) clearInterval(autoTimer);
  }

  let touchStartX = 0;
  stage.addEventListener('pointerdown', (e) => {
    isDragging = true;
    hasDragged = false;
    document.body.classList.add('dragging');
    startX = e.clientX;
    startRotation = rotationY;
  });
  window.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > dragThreshold) hasDragged = true;
    rotationY = startRotation + dx * 0.4;
    applyRotation();
  });
  window.addEventListener('pointerup', () => {
    isDragging = false;
    document.body.classList.remove('dragging');
  });

  stage.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  stage.addEventListener('touchmove', (e) => {
    const dx = e.touches[0].clientX - touchStartX;
    touchStartX = e.touches[0].clientX;
    rotationY += dx * 0.5;
    applyRotation();
  }, { passive: true });

  stage.addEventListener('wheel', (e) => {
    e.preventDefault();
    rotationY += e.deltaY * 0.15;
    applyRotation();
  }, { passive: false });

  applyRotation();
  startAuto();
}

// ===== ФОНОВОЕ ВИДЕО =====
const bgVideo = document.getElementById('bgVideo');
if (bgVideo) bgVideo.addEventListener('canplay', () => bgVideo.classList.add('loaded'));

// ===== ПОДСКАЗКА СПИРАЛИ =====
const stageHint = document.getElementById('stageHint');
if (stageHint && stage) {
  const hideHint = () => stageHint.classList.add('hidden');
  stage.addEventListener('pointerdown', hideHint, { once: true });
  stage.addEventListener('touchstart', hideHint, { once: true });
  stage.addEventListener('wheel', hideHint, { once: true, passive: true });
  setTimeout(() => stageHint.classList.add('hidden'), 6000);
}
