/**
 * 站点运行入口
 * - 路由在这里维护
 * - 图片页 gradient slider / 惯性 / 动态渐变参数来自 src/config/siteConfig.js
 * - 卡片 3D magnetic hover 参数也来自 src/config/siteConfig.js
 */
import { renderLayout } from './components/layout.js';
import { renderHomePage } from './pages/home.js';
import { renderAboutPage } from './pages/about.js';
import { renderVideoPage, renderVideoDetailPage } from './pages/video.js';
import { renderImagePage } from './pages/image.js';
import { renderVrPage, renderVrDetailPage } from './pages/vr.js';
import { renderPostsPage } from './pages/posts.js';
import { videoProjects } from './data/videoProjects.js';
import { vrProjects } from './data/vrProjects.js';
import { updateSeo } from './utils/seo.js';
import { siteConfig } from './config/siteConfig.js';

const app = document.querySelector('#app');

const routes = [
  { match: /^\/$/, title: '首页', description: '张悦个人作品集首页。', render: renderHomePage },
  { match: /^\/about$/, title: '关于我', description: '张悦的个人介绍、方向与能力。', render: renderAboutPage },
  { match: /^\/video$/, title: '视频作品', description: '视频作品总览与详情入口。', render: renderVideoPage },
  { match: /^\/image$/, title: '图片作品', description: '图片作品与摄影系列浏览。', render: renderImagePage },
  { match: /^\/vr$/, title: 'VR 项目', description: 'VR 项目总览。', render: renderVrPage },
  { match: /^\/posts$/, title: '推文与内容策划', description: '推文、内容策划与平台实践。', render: renderPostsPage }
];

const getDynamicPage = (pathname) => {
  if (pathname.startsWith('/video/')) {
    const slug = pathname.replace('/video/', '');
    const project = videoProjects.find((item) => item.slug === slug);
    if (project) {
      return {
        title: project.subtitle,
        description: project.summary,
        render: () => renderVideoDetailPage(project)
      };
    }
  }

  if (pathname.startsWith('/vr/')) {
    const slug = pathname.replace('/vr/', '');
    const project = vrProjects.find((item) => item.slug === slug);
    if (project) {
      return {
        title: project.subtitle,
        description: project.overview,
        render: () => renderVrDetailPage(project)
      };
    }
  }

  return null;
};

const initNav = () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
};

const initRouter = () => {
  document.querySelectorAll('[data-link]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('http')) return;

      const url = new URL(href, window.location.origin);
      event.preventDefault();
      window.history.pushState({}, '', href);
      renderApp();
    });
  });
};

const initLightbox = () => {
  const dialog = document.querySelector('.lightbox');
  if (!dialog) return;

  const image = dialog.querySelector('img');
  const closeButton = dialog.querySelector('.lightbox-close');
  const closeDialog = () => {
    dialog.classList.remove('is-open');
    document.body.classList.remove('has-dialog');
  };

  document.querySelectorAll('[data-lightbox]').forEach((button) => {
    button.addEventListener('click', () => {
      image.src = button.dataset.lightbox;
      image.alt = button.dataset.alt || '大图预览';
      dialog.classList.add('is-open');
      document.body.classList.add('has-dialog');
    });
  });

  closeButton.addEventListener('click', closeDialog);

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
      closeDialog();
    }
  });

  if (!window.__portfolioLightboxBound) {
    window.addEventListener('keydown', (event) => {
      const activeDialog = document.querySelector('.lightbox.is-open');
      if (event.key === 'Escape' && activeDialog) {
        activeDialog.classList.remove('is-open');
        document.body.classList.remove('has-dialog');
      }
    });
    window.__portfolioLightboxBound = true;
  }
};

const initImageGalleryMotion = () => {
  window.__imageGalleryCleanup?.();

  const stage = document.querySelector('[data-image-slider-stage]');
  const cardsRoot = document.querySelector('[data-image-slider-cards]');
  const bgCanvas = document.querySelector('[data-image-slider-bg]');
  const bgCtx = bgCanvas?.getContext('2d', { alpha: false });
  const cardButtons = [...document.querySelectorAll('[data-image-slider-item]')];

  if (!stage || !cardsRoot || !bgCanvas || !bgCtx || !cardButtons.length) {
    window.__imageGalleryCleanup = null;
    return;
  }

  const reducedMotion = prefersReducedMotion();
  const {
    imageSliderFriction,
    imageSliderWheelSensitivity,
    imageSliderDragSensitivity,
    imageSliderMaxRotation,
    imageSliderMaxDepth,
    imageSliderMinScale,
    imageSliderScaleRange,
    imageSliderGap,
    imageSliderBlurStrength,
    imageSliderBgLightnessBias,
    imageSliderBgSaturationBias
  } = siteConfig.motion;

  const mod = (n, m) => ((n % m) + m) % m;
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  let items = cardButtons.map((el, index) => ({ el, x: index }));
  let positions = [];
  let activeIndex = -1;
  let cardW = 300;
  let cardH = 400;
  let step = 0;
  let track = 0;
  let scrollX = 0;
  let velocityX = 0;
  let rafId = null;
  let bgRAF = null;
  let lastTime = 0;
  let lastBgDraw = 0;
  let dragging = false;
  let lastPointerX = 0;
  let lastPointerT = 0;
  let lastDelta = 0;
  let gradPalette = [];
  let bgFastUntil = 0;
  let pointerInside = false;
  let gradCurrent = { r1: 208, g1: 186, b1: 146, r2: 164, g2: 129, b2: 103 };
  let visibleHoverCard = null;

  const rgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        default:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return [h * 360, s, l];
  };

  const hslToRgb = (h, s, l) => {
    h = ((h % 360) + 360) % 360;
    h /= 360;
    let r;
    let g;
    let b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  };

  const fallbackFromIndex = (idx) => {
    const h = (idx * 31) % 360;
    const c1 = hslToRgb(h, 0.3 * imageSliderBgSaturationBias, 0.46 * imageSliderBgLightnessBias);
    const c2 = hslToRgb(h + 20, 0.22 * imageSliderBgSaturationBias, 0.68 * imageSliderBgLightnessBias);
    return { c1, c2 };
  };

  const extractColors = (img, idx) => {
    try {
      const max = 48;
      const ratio = img.naturalWidth && img.naturalHeight ? img.naturalWidth / img.naturalHeight : 1;
      const tw = ratio >= 1 ? max : Math.max(16, Math.round(max * ratio));
      const th = ratio >= 1 ? Math.max(16, Math.round(max / ratio)) : max;
      const canvas = document.createElement('canvas');
      canvas.width = tw;
      canvas.height = th;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, tw, th);
      const data = ctx.getImageData(0, 0, tw, th).data;

      const H_BINS = 36;
      const S_BINS = 5;
      const size = H_BINS * S_BINS;
      const wSum = new Float32Array(size);
      const rSum = new Float32Array(size);
      const gSum = new Float32Array(size);
      const bSum = new Float32Array(size);

      for (let i = 0; i < data.length; i += 4) {
        const a = data[i + 3] / 255;
        if (a < 0.05) continue;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const [h, s, l] = rgbToHsl(r, g, b);
        if (l < 0.12 || l > 0.9 || s < 0.06) continue;
        const w = a * (s * s) * (1 - Math.abs(l - 0.5) * 0.6);
        const hi = Math.max(0, Math.min(H_BINS - 1, Math.floor((h / 360) * H_BINS)));
        const si = Math.max(0, Math.min(S_BINS - 1, Math.floor(s * S_BINS)));
        const bidx = hi * S_BINS + si;
        wSum[bidx] += w;
        rSum[bidx] += r * w;
        gSum[bidx] += g * w;
        bSum[bidx] += b * w;
      }

      let pIdx = -1;
      let pW = 0;
      for (let i = 0; i < size; i += 1) {
        if (wSum[i] > pW) {
          pW = wSum[i];
          pIdx = i;
        }
      }
      if (pIdx < 0 || pW <= 0) return fallbackFromIndex(idx);

      const pHue = Math.floor(pIdx / S_BINS) * (360 / H_BINS);
      let sIdx = -1;
      let sW = 0;
      for (let i = 0; i < size; i += 1) {
        const w = wSum[i];
        if (w <= 0) continue;
        const h = Math.floor(i / S_BINS) * (360 / H_BINS);
        let dh = Math.abs(h - pHue);
        dh = Math.min(dh, 360 - dh);
        if (dh >= 25 && w > sW) {
          sW = w;
          sIdx = i;
        }
      }

      const avgRGB = (bin) => {
        const w = wSum[bin] || 1e-6;
        return [
          Math.round(rSum[bin] / w),
          Math.round(gSum[bin] / w),
          Math.round(bSum[bin] / w)
        ];
      };

      const [pr, pg, pb] = avgRGB(pIdx);
      let [h1, s1] = rgbToHsl(pr, pg, pb);
      s1 = Math.max(0.18, Math.min(0.5, s1 * imageSliderBgSaturationBias));
      const c1 = hslToRgb(h1, s1, Math.min(0.62, 0.46 * imageSliderBgLightnessBias));

      let c2;
      if (sIdx >= 0 && sW >= pW * 0.6) {
        const [sr, sg, sb] = avgRGB(sIdx);
        let [h2, s2] = rgbToHsl(sr, sg, sb);
        s2 = Math.max(0.14, Math.min(0.42, s2 * imageSliderBgSaturationBias));
        c2 = hslToRgb(h2, s2, Math.min(0.76, 0.68 * imageSliderBgLightnessBias));
      } else {
        c2 = hslToRgb(h1, s1, Math.min(0.76, 0.68 * imageSliderBgLightnessBias));
      }

      return { c1, c2 };
    } catch {
      return fallbackFromIndex(idx);
    }
  };

  const waitForImages = () =>
    Promise.all(
      items.map(({ el }) => {
        const img = el.querySelector('img');
        if (!img || img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          const done = () => resolve();
          img.addEventListener('load', done, { once: true });
          img.addEventListener('error', done, { once: true });
        });
      })
    );

  const decodeAllImages = async () => {
    await Promise.allSettled(
      items.map(({ el }) => {
        const img = el.querySelector('img');
        if (!img || typeof img.decode !== 'function') return Promise.resolve();
        return img.decode().catch(() => {});
      })
    );
  };

  const measure = () => {
    const sample = items[0]?.el;
    if (!sample) return;
    const rect = sample.getBoundingClientRect();
    cardW = rect.width || cardW;
    cardH = rect.height || cardH;
    step = cardW + imageSliderGap;
    track = items.length * step;
    items.forEach((it, i) => {
      it.x = i * step;
    });
    positions = new Float32Array(items.length);
  };

  const computeTransformComponents = (screenX) => {
    const half = window.innerWidth * 0.5;
    const norm = Math.max(-1, Math.min(1, screenX / half));
    const absNorm = Math.abs(norm);
    const invNorm = 1 - absNorm;
    const ry = -norm * imageSliderMaxRotation;
    const tz = invNorm * imageSliderMaxDepth;
    const scale = imageSliderMinScale + invNorm * imageSliderScaleRange;
    return { norm, invNorm, ry, tz, scale };
  };

  const transformForScreenX = (screenX) => {
    const { ry, tz, scale } = computeTransformComponents(screenX);
    return {
      transform: `translate3d(calc(-50% + ${screenX}px), -50%, ${tz}px) rotateY(${ry}deg) scale(${scale})`,
      z: tz
    };
  };

  const setActiveGradient = (idx) => {
    if (idx < 0 || idx >= items.length || idx === activeIndex) return;
    activeIndex = idx;
    const pal = gradPalette[idx] || fallbackFromIndex(idx);
    const blendWarm = (channel, base) => Math.round(channel * 0.62 + base * 0.38);
    gradCurrent = {
      r1: blendWarm(pal.c1[0], 220),
      g1: blendWarm(pal.c1[1], 194),
      b1: blendWarm(pal.c1[2], 154),
      r2: blendWarm(pal.c2[0], 176),
      g2: blendWarm(pal.c2[1], 142),
      b2: blendWarm(pal.c2[2], 112)
    };
    bgFastUntil = performance.now() + 800;
  };

  const updateCarouselTransforms = () => {
    const half = track / 2;
    const viewportHalf = window.innerWidth * 0.5;
    let closestIdx = -1;
    let closestDist = Infinity;

    for (let i = 0; i < items.length; i += 1) {
      let pos = items[i].x - scrollX;
      if (pos < -half) pos += track;
      if (pos > half) pos -= track;
      positions[i] = pos;
      const dist = Math.abs(pos);
      if (dist < closestDist) {
        closestDist = dist;
        closestIdx = i;
      }
    }

    const prevIdx = (closestIdx - 1 + items.length) % items.length;
    const nextIdx = (closestIdx + 1) % items.length;

    for (let i = 0; i < items.length; i += 1) {
      const it = items[i];
      const pos = positions[i];
      const norm = Math.max(-1, Math.min(1, pos / viewportHalf));
      const { transform, z } = transformForScreenX(pos);
      it.el.style.transform = transform;
      it.el.style.zIndex = String(1000 + Math.round(z));
      const isCore = i === closestIdx || i === prevIdx || i === nextIdx;
      const blur = isCore ? 0 : imageSliderBlurStrength * Math.pow(Math.abs(norm), 1.1);
      const opacity = isCore ? 1 : Math.max(0.18, 1 - Math.abs(norm) * 0.78);
      it.el.style.filter = `blur(${blur.toFixed(2)}px)`;
      it.el.style.opacity = `${opacity}`;
      it.el.classList.toggle('is-current', i === closestIdx);
    }

    setActiveGradient(closestIdx);
  };

  const resizeBG = () => {
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const w = bgCanvas.clientWidth || stage.clientWidth;
    const h = bgCanvas.clientHeight || stage.clientHeight;
    const tw = Math.floor(w * dpr);
    const th = Math.floor(h * dpr);
    if (bgCanvas.width !== tw || bgCanvas.height !== th) {
      bgCanvas.width = tw;
      bgCanvas.height = th;
      bgCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  };

  const drawBackground = () => {
    const now = performance.now();
    const minInterval = now < bgFastUntil ? 16 : 33;
    if (now - lastBgDraw < minInterval) {
      bgRAF = requestAnimationFrame(drawBackground);
      return;
    }

    lastBgDraw = now;
    resizeBG();
    const w = bgCanvas.clientWidth || stage.clientWidth;
    const h = bgCanvas.clientHeight || stage.clientHeight;
    bgCtx.fillStyle = '#ddc9a3';
    bgCtx.fillRect(0, 0, w, h);

    const time = now * 0.0002;
    const cx = w * 0.5;
    const cy = h * 0.5;
    const a1 = Math.min(w, h) * 0.35;
    const a2 = Math.min(w, h) * 0.28;
    const x1 = cx + Math.cos(time) * a1;
    const y1 = cy + Math.sin(time * 0.8) * a1 * 0.4;
    const x2 = cx + Math.cos(-time * 0.9 + 1.2) * a2;
    const y2 = cy + Math.sin(-time * 0.7 + 0.7) * a2 * 0.5;
    const r1 = Math.max(w, h) * 0.82;
    const r2 = Math.max(w, h) * 0.68;

    const g1 = bgCtx.createRadialGradient(x1, y1, 0, x1, y1, r1);
    g1.addColorStop(0, `rgba(${gradCurrent.r1},${gradCurrent.g1},${gradCurrent.b1},0.58)`);
    g1.addColorStop(1, 'rgba(255,255,255,0)');
    bgCtx.fillStyle = g1;
    bgCtx.fillRect(0, 0, w, h);

    const g2 = bgCtx.createRadialGradient(x2, y2, 0, x2, y2, r2);
    g2.addColorStop(0, `rgba(${gradCurrent.r2},${gradCurrent.g2},${gradCurrent.b2},0.42)`);
    g2.addColorStop(1, 'rgba(255,255,255,0)');
    bgCtx.fillStyle = g2;
    bgCtx.fillRect(0, 0, w, h);

    bgRAF = requestAnimationFrame(drawBackground);
  };

  const buildPalette = () => {
    gradPalette = items.map(({ el }, i) => {
      const img = el.querySelector('img');
      return img ? extractColors(img, i) : fallbackFromIndex(i);
    });
  };

  const tick = (t) => {
    const dt = lastTime ? (t - lastTime) / 1000 : 0;
    lastTime = t;
    scrollX = mod(scrollX + velocityX * dt, track);
    const decay = Math.pow(imageSliderFriction, dt * 60);
    velocityX *= decay;
    if (Math.abs(velocityX) < 0.02) velocityX = 0;
    updateCarouselTransforms();
    rafId = requestAnimationFrame(tick);
  };

  const startCarousel = () => {
    if (rafId) cancelAnimationFrame(rafId);
    lastTime = 0;
    rafId = requestAnimationFrame((t) => {
      updateCarouselTransforms();
      tick(t);
    });
  };

  const cancelCarousel = () => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
  };

  const cancelBG = () => {
    if (bgRAF) cancelAnimationFrame(bgRAF);
    bgRAF = null;
  };

  const onResize = () => {
    const prevStep = step || 1;
    const ratio = scrollX / (items.length * prevStep);
    measure();
    scrollX = mod(ratio * track, track);
    updateCarouselTransforms();
    resizeBG();
  };

  const onWheel = (event) => {
    if (reducedMotion) return;
    event.preventDefault();
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    velocityX += delta * imageSliderWheelSensitivity * 20;
  };

  const onPointerDown = (event) => {
    if (reducedMotion) return;
    dragging = true;
    lastPointerX = event.clientX;
    lastPointerT = performance.now();
    lastDelta = 0;
    stage.setPointerCapture?.(event.pointerId);
    stage.classList.add('is-dragging');
  };

  const onPointerMove = (event) => {
    if (!dragging || reducedMotion) return;
    const now = performance.now();
    const dx = event.clientX - lastPointerX;
    const dt = Math.max(1, now - lastPointerT) / 1000;
    scrollX = mod(scrollX - dx * imageSliderDragSensitivity, track);
    lastDelta = dx / dt;
    lastPointerX = event.clientX;
    lastPointerT = now;
    updateCarouselTransforms();
  };

  const onPointerUp = (event) => {
    if (!dragging) return;
    dragging = false;
    stage.releasePointerCapture?.(event.pointerId);
    velocityX = -lastDelta * imageSliderDragSensitivity;
    stage.classList.remove('is-dragging');
  };

  const onVisibilityChange = () => {
    if (document.hidden) {
      cancelCarousel();
      cancelBG();
    } else {
      if (!reducedMotion) startCarousel();
      bgRAF = requestAnimationFrame(drawBackground);
    }
  };

  const bindHover = () => {
    items.forEach(({ el }) => {
      el.addEventListener('click', (event) => {
        if (Math.abs(lastDelta) > 12) {
          event.preventDefault();
          event.stopPropagation();
        }
      });
      el.addEventListener('mouseenter', () => {
        visibleHoverCard = el;
        el.classList.add('is-hovering');
      });
      el.addEventListener('mouseleave', () => {
        if (visibleHoverCard === el) visibleHoverCard = null;
        el.classList.remove('is-hovering');
      });
    });
  };

  const init = async () => {
    stage.classList.add('carousel-mode');
    measure();
    updateCarouselTransforms();
    await waitForImages();
    await decodeAllImages();
    buildPalette();
    setActiveGradient(0);
    resizeBG();
    bgRAF = requestAnimationFrame(drawBackground);
    if (!reducedMotion) {
      startCarousel();
    }
  };

  bindHover();
  stage.addEventListener('wheel', onWheel, { passive: false });
  stage.addEventListener('pointerdown', onPointerDown);
  stage.addEventListener('pointermove', onPointerMove);
  stage.addEventListener('pointerup', onPointerUp);
  stage.addEventListener('pointercancel', onPointerUp);
  window.addEventListener('resize', onResize);
  document.addEventListener('visibilitychange', onVisibilityChange);
  init();

  window.__imageGalleryCleanup = () => {
    cancelCarousel();
    cancelBG();
    stage.removeEventListener('wheel', onWheel);
    stage.removeEventListener('pointerdown', onPointerDown);
    stage.removeEventListener('pointermove', onPointerMove);
    stage.removeEventListener('pointerup', onPointerUp);
    stage.removeEventListener('pointercancel', onPointerUp);
    window.removeEventListener('resize', onResize);
    document.removeEventListener('visibilitychange', onVisibilityChange);
  };
};

const initMagneticCards = () => {
  document.querySelectorAll('[data-magnetic-card]').forEach((card) => {
    if (window.innerWidth < 901) {
      card.style.transform = '';
      return;
    }

    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(${siteConfig.motion.magneticPerspective}px) rotateY(${x * siteConfig.motion.magneticRotate}deg) rotateX(${y * -siteConfig.motion.magneticRotate}deg) translateY(-${siteConfig.motion.magneticLift}px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
};

const appendLightbox = () => `
  <div class="lightbox" aria-hidden="true">
    <button class="lightbox-close" type="button" aria-label="关闭大图预览">Close</button>
    <img src="" alt="" />
  </div>
`;

const renderApp = () => {
  const pathname = window.location.pathname;
  const staticPage = routes.find((route) => route.match.test(pathname));
  const page = staticPage || getDynamicPage(pathname) || {
    title: '页面未找到',
    description: '请求的页面不存在。',
    render: () => `
      <section class="page-hero">
        <p class="eyebrow">404</p>
        <h1>Page Not Found<span>页面不存在</span></h1>
        <p>这个页面还没有被建立，或者路径已经改变。</p>
        <a class="button" href="/" data-link>Back Home</a>
      </section>
    `
  };

  updateSeo({ title: page.title, description: page.description });

  app.innerHTML = renderLayout(
    pathname,
    `${page.render()}${appendLightbox()}`
  );

  initNav();
  initRouter();
  initLightbox();
  initImageGalleryMotion();
  initMagneticCards();

  if (window.location.hash === '#contact') {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
};

window.addEventListener('popstate', renderApp);
renderApp();
