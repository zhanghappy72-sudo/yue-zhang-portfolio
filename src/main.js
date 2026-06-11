/**
 * 站点运行入口
 * - 路由在这里维护
 * - 图片页横向惯性 / 无限滚动参数来自 src/config/siteConfig.js
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

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const initHeroStickyNarrative = () => {
  window.__heroStickyCleanup?.();

  const shell = document.querySelector('[data-hero-sticky-shell]');
  const stage = document.querySelector('[data-hero-sticky-stage]');
  const title = document.querySelector('[data-hero-title]');
  const titleEnglish = title?.querySelector('span');
  const english = document.querySelector('[data-hero-english]');
  const intro = document.querySelector('[data-hero-intro]');
  const actions = document.querySelector('[data-hero-actions]');
  const copy = document.querySelector('[data-hero-copy]');
  const about = document.querySelector('[data-home-about]');
  const cards = [...document.querySelectorAll('[data-hero-card]')];
  const bgLayers = [...document.querySelectorAll('[data-hero-bg-layer]')];

  if (!shell || !stage || !cards.length) {
    window.__heroStickyCleanup = null;
    return;
  }

  const reducedMotion = prefersReducedMotion();
  const {
    sectionMinHeight,
    backgroundScaleStart,
    backgroundScaleEnd,
    titleShiftY,
    englishFadeStart,
    englishFadeEnd,
    copyShiftY
  } = siteConfig.heroSticky;

  shell.style.setProperty('--hero-sticky-height', sectionMinHeight);

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const lerp = (start, end, amount) => start + (end - start) * amount;
  const fadeByProgress = (progress, start, end) => {
    if (progress <= start) return 1;
    if (progress >= end) return 0;
    return 1 - (progress - start) / (end - start);
  };

  let rafId = 0;
  let ticking = false;
  let shellStart = 0;
  let shellRange = 1;

  const measure = () => {
    const rect = shell.getBoundingClientRect();
    shellStart = window.scrollY + rect.top;
    shellRange = Math.max(shell.offsetHeight - window.innerHeight, 1);
  };

  const paint = () => {
    ticking = false;
    const progress = clamp((window.scrollY - shellStart) / shellRange, 0, 1);

    if (reducedMotion) {
      stage.style.setProperty('--hero-scroll-progress', progress.toFixed(4));
      if (about) about.style.opacity = '1';
      return;
    }

    const bgScale = lerp(backgroundScaleStart, backgroundScaleEnd, progress);
    const englishOpacity = fadeByProgress(progress, englishFadeStart, englishFadeEnd);
    const introOpacity = lerp(1, 0.52, progress);
    const aboutOpacity = clamp((progress - 0.56) / 0.34, 0, 1);

    bgLayers.forEach((layer, index) => {
      const multiplier = 1 + index * 0.08;
      const scale = 1 + (bgScale - 1) * multiplier;
      const shiftY = progress * (16 + index * 12);
      const shiftX = (index % 2 === 0 ? -1 : 1) * progress * (8 + index * 6);
      const opacity =
        index === bgLayers.length - 1
          ? lerp(0.16, 0.26, progress)
          : lerp(1, 0.86 + index * 0.02, progress);

      layer.style.transform = `translate3d(${shiftX}px, ${shiftY}px, 0) scale(${scale})`;
      layer.style.opacity = `${opacity}`;
    });

    title.style.transform = `translate3d(0, ${lerp(0, titleShiftY, progress)}px, 0)`;
    if (titleEnglish) {
      titleEnglish.style.opacity = `${lerp(1, 0.22, progress)}`;
    }
    if (copy) {
      copy.style.transform = `translate3d(0, ${lerp(0, copyShiftY, progress)}px, 0)`;
    }
    if (english) {
      english.style.opacity = `${englishOpacity}`;
    }
    if (intro) {
      intro.style.opacity = `${introOpacity}`;
    }
    if (actions) {
      actions.style.opacity = `${lerp(1, 0.76, progress)}`;
    }
    cards.forEach((card) => {
      const depth = Number(card.style.getPropertyValue('--orbit-depth').replace('px', '')) || 1;
      const parallaxX = parseFloat(card.style.getPropertyValue('--orbit-parallax-x')) || 0;
      const parallaxY = parseFloat(card.style.getPropertyValue('--orbit-parallax-y')) || 0;
      const translateX = parallaxX * progress * depth;
      const translateY = parallaxY * progress * depth;
      const scale = lerp(1, 1 + (depth - 1) * 0.08, progress);
      card.style.setProperty('--orbit-scroll-transform', `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`);
    });

    if (about) {
      about.style.opacity = `${lerp(0.66, 1, aboutOpacity)}`;
      about.style.transform = `translate3d(0, ${lerp(32, 0, aboutOpacity)}px, 0)`;
    }
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    rafId = window.requestAnimationFrame(paint);
  };

  const onResize = () => {
    measure();
    onScroll();
  };

  measure();
  paint();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);

  window.__heroStickyCleanup = () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
    window.cancelAnimationFrame(rafId);
  };
};

const initVideoHoverPreviews = () => {
  window.__videoPreviewCleanup?.();

  const cards = [...document.querySelectorAll('[data-video-preview-card]')];
  if (!cards.length) {
    window.__videoPreviewCleanup = null;
    return;
  }

  const reducedMotion = prefersReducedMotion();
  const previewDuration = Math.max(2, siteConfig.motion.videoPreviewDuration || 3);
  const cleanupFns = [];

  cards.forEach((card) => {
    const type = card.dataset.videoPreviewType;
    const preview = card.querySelector('.video-cover-preview');
    const shell = card.querySelector('.video-cover-shell');
    const src = card.dataset.videoPreviewSrc;
    const poster = card.dataset.videoPreviewPoster;
    let timeoutId = 0;

    if (!preview || !src || reducedMotion || type !== 'local-file') {
      return;
    }

    preview.muted = true;
    preview.playsInline = true;
    preview.preload = 'metadata';
    preview.poster = poster || '';
    preview.src = src;

    const stopPreview = () => {
      window.clearTimeout(timeoutId);
      preview.pause();
      preview.currentTime = 0;
      shell?.classList.remove('is-previewing');
    };

    const startPreview = async () => {
      try {
        shell?.classList.add('is-previewing');
        preview.currentTime = 0;
        await preview.play();
        timeoutId = window.setTimeout(() => {
          stopPreview();
        }, previewDuration * 1000);
      } catch {
        shell?.classList.remove('is-previewing');
      }
    };

    const onEnter = () => {
      document.querySelector('[data-video-cloud]')?.classList.add('is-focusing');
      startPreview();
    };
    const onLeave = () => {
      document.querySelector('[data-video-cloud]')?.classList.remove('is-focusing');
      stopPreview();
    };

    card.addEventListener('mouseenter', onEnter);
    card.addEventListener('mouseleave', onLeave);
    cleanupFns.push(() => {
      card.removeEventListener('mouseenter', onEnter);
      card.removeEventListener('mouseleave', onLeave);
      stopPreview();
    });
  });

  window.__videoPreviewCleanup = () => {
    cleanupFns.forEach((cleanup) => cleanup());
  };
};

const initImageGalleryMotion = () => {
  window.__imageGalleryCleanup?.();

  const stage = document.querySelector('[data-image-stage]');
  const sphere = document.querySelector('[data-image-sphere]');
  const items = [...document.querySelectorAll('[data-sphere-item]')];

  if (!stage || !sphere || !items.length) {
    window.__imageGalleryCleanup = null;
    return;
  }

  const isMobile = window.innerWidth < 901;
  const {
    imageSphereRadiusDesktop,
    imageSphereRadiusMobile,
    imageSphereDragSensitivity,
    imageSphereInertiaFriction,
    imageSphereMaxTiltX,
    imageSphereDepthScaleNear,
    imageSphereDepthScaleFar,
    imageSphereOpacityNear,
    imageSphereOpacityFar,
    imageSphereBrightnessNear,
    imageSphereBrightnessFar,
    imageSphereBlurNear,
    imageSphereBlurFar,
    imageSphereBaseWidthDesktop,
    imageSphereBaseWidthMobile
  } = siteConfig.motion;

  let rotationY = isMobile ? -8 : -10;
  let rotationX = isMobile ? 8 : 10;
  let velocityY = 0;
  let velocityX = 0;
  let rafId = 0;
  let isPointerDown = false;
  let lastPointerX = 0;
  let lastPointerY = 0;
  let movedSincePointerDown = false;
  let radius = isMobile ? imageSphereRadiusMobile : imageSphereRadiusDesktop;
  let hoveringItem = null;
  let pointerId = null;

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const lerp = (start, end, amount) => start + (end - start) * amount;
  const spherePoints = [];

  const measure = () => {
    radius = window.innerWidth < 901 ? imageSphereRadiusMobile : imageSphereRadiusDesktop;
  };

  const buildPoints = () => {
    const count = items.length;
    const layerConfig = isMobile
      ? [
          { y: -0.42, scale: 0.8, count: Math.max(3, Math.round(count * 0.2)) },
          { y: -0.14, scale: 0.94, count: Math.max(4, Math.round(count * 0.28)) },
          { y: 0.16, scale: 1, count: Math.max(5, Math.round(count * 0.28)) },
          { y: 0.46, scale: 0.82, count: count }
        ]
      : [
          { y: -0.58, scale: 0.78, count: Math.max(4, Math.round(count * 0.14)) },
          { y: -0.28, scale: 0.86, count: Math.max(5, Math.round(count * 0.2)) },
          { y: 0.02, scale: 0.98, count: Math.max(6, Math.round(count * 0.24)) },
          { y: 0.32, scale: 0.9, count: Math.max(6, Math.round(count * 0.2)) },
          { y: 0.62, scale: 0.8, count: count }
        ];

    let remaining = count;
    const layers = layerConfig
      .map((layer, index) => {
        const isLast = index === layerConfig.length - 1;
        const layerCount = isLast ? remaining : Math.min(remaining, layer.count);
        remaining -= layerCount;
        return { ...layer, count: Math.max(0, layerCount) };
      })
      .filter((layer) => layer.count > 0);

    let cursor = 0;
    layers.forEach((layer, layerIndex) => {
      const offset = layerIndex % 2 === 0 ? 0 : Math.PI / Math.max(layer.count, 1);
      for (let itemIndex = 0; itemIndex < layer.count && cursor < count; itemIndex += 1) {
        const theta = (itemIndex / layer.count) * Math.PI * 2 + offset;
        spherePoints[cursor] = {
          theta,
          layerY: layer.y,
          layerScale: layer.scale
        };
        cursor += 1;
      }
    });
  };

  const paint = () => {
    if (!isPointerDown) {
      rotationY += velocityY;
      rotationX = clamp(rotationX + velocityX, -imageSphereMaxTiltX, imageSphereMaxTiltX);
      velocityY *= imageSphereInertiaFriction;
      velocityX *= imageSphereInertiaFriction;
      if (Math.abs(velocityY) < 0.001) velocityY = 0;
      if (Math.abs(velocityX) < 0.001) velocityX = 0;
    }

    items.forEach((item, index) => {
      const point = spherePoints[index];
      const theta = point.theta + (rotationY * Math.PI) / 180;
      const normalizedZ = Math.cos(theta) * point.layerScale;
      const normalizedX = Math.sin(theta) * point.layerScale;
      const depthNormalized = (normalizedZ + 1) / 2;
      const spreadX = (window.innerWidth < 901 ? 0.98 : 1.04) * radius;
      const spreadY = (window.innerWidth < 901 ? 0.72 : 0.9) * radius;
      const x = normalizedX * spreadX;
      const y = point.layerY * spreadY - (rotationX / imageSphereMaxTiltX) * (spreadY * 0.18) + normalizedZ * 10;
      const z = normalizedZ * radius;
      const scale = lerp(imageSphereDepthScaleFar, imageSphereDepthScaleNear, depthNormalized);
      const opacity = lerp(imageSphereOpacityFar, imageSphereOpacityNear, depthNormalized);
      const brightness = lerp(imageSphereBrightnessFar, imageSphereBrightnessNear, depthNormalized);
      const blur = lerp(imageSphereBlurFar, imageSphereBlurNear, depthNormalized);
      const hoverScale = item === hoveringItem ? siteConfig.motion.imageSphereHoverScale : 1;
      const itemWidth = (window.innerWidth < 901 ? imageSphereBaseWidthMobile : imageSphereBaseWidthDesktop) * (0.92 + depthNormalized * 0.42);

      item.style.width = `${itemWidth}px`;
      item.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px) rotateY(${normalizedX * -16}deg) scale(${scale * hoverScale})`;
      item.style.opacity = `${opacity}`;
      item.style.filter = `brightness(${brightness}) blur(${blur}px)`;
      item.style.zIndex = `${Math.round(depthNormalized * 1000)}`;
    });

    rafId = window.requestAnimationFrame(paint);
  };

  const onPointerDown = (event) => {
    event.preventDefault();
    isPointerDown = true;
    pointerId = event.pointerId;
    lastPointerX = event.clientX;
    lastPointerY = event.clientY;
    movedSincePointerDown = false;
    velocityX = 0;
    velocityY = 0;
    stage.classList.add('is-dragging');
    stage.setPointerCapture?.(event.pointerId);
  };

  const onPointerMove = (event) => {
    if (!isPointerDown || (pointerId !== null && event.pointerId !== pointerId)) return;
    const deltaX = event.clientX - lastPointerX;
    const deltaY = event.clientY - lastPointerY;
    lastPointerX = event.clientX;
    lastPointerY = event.clientY;
    if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) movedSincePointerDown = true;
    const nextVelocityY = deltaX * imageSphereDragSensitivity;
    const nextVelocityX = deltaY * imageSphereDragSensitivity * 0.16;
    rotationY += nextVelocityY;
    rotationX = clamp(rotationX - nextVelocityX, -imageSphereMaxTiltX, imageSphereMaxTiltX);
    velocityY = nextVelocityY;
    velocityX = -nextVelocityX;
  };

  const endPointer = (event) => {
    if (event && pointerId !== null && event.pointerId !== pointerId) return;
    isPointerDown = false;
    pointerId = null;
    stage.classList.remove('is-dragging');
  };

  const onResize = () => measure();

  const bindHover = () => {
    items.forEach((item) => {
      item.addEventListener('click', (event) => {
        if (movedSincePointerDown) {
          event.preventDefault();
          event.stopPropagation();
        }
      });
      item.addEventListener('mouseenter', () => {
        hoveringItem = item;
      });
      item.addEventListener('mouseleave', () => {
        if (hoveringItem === item) hoveringItem = null;
      });
    });
  };

  measure();
  buildPoints();
  bindHover();
  paint();
  stage.addEventListener('pointerdown', onPointerDown);
  stage.addEventListener('pointermove', onPointerMove);
  stage.addEventListener('pointerup', endPointer);
  stage.addEventListener('pointercancel', endPointer);
  window.addEventListener('resize', onResize);

  window.__imageGalleryCleanup = () => {
    window.cancelAnimationFrame(rafId);
    stage.removeEventListener('pointerdown', onPointerDown);
    stage.removeEventListener('pointermove', onPointerMove);
    stage.removeEventListener('pointerup', endPointer);
    stage.removeEventListener('pointercancel', endPointer);
    window.removeEventListener('resize', onResize);
  };
};

const initMagneticCards = () => {
  document.querySelectorAll('[data-magnetic-card]').forEach((card) => {
    const orbitRoot = card.closest('[data-hero-orbit]');

    if (window.innerWidth < 901) {
      card.style.removeProperty('--orbit-magnetic-transform');
      return;
    }

    const onMove = (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      if (orbitRoot) {
        const scale = siteConfig.motion.heroCardHoverScale;
        card.style.setProperty(
          '--orbit-magnetic-transform',
          `perspective(${siteConfig.motion.magneticPerspective}px) rotateY(${x * siteConfig.motion.magneticRotate}deg) rotateX(${y * -siteConfig.motion.magneticRotate}deg) translateY(-${siteConfig.motion.magneticLift}px) scale(${scale})`
        );
        return;
      }

      card.style.transform = `perspective(${siteConfig.motion.magneticPerspective}px) rotateY(${x * siteConfig.motion.magneticRotate}deg) rotateX(${y * -siteConfig.motion.magneticRotate}deg) translateY(-${siteConfig.motion.magneticLift}px)`;
    };

    const onEnter = () => {
      if (orbitRoot) {
        orbitRoot.classList.add('is-hovering');
        card.classList.add('is-active');
        orbitRoot.style.setProperty('--hero-card-dim-opacity', siteConfig.motion.heroCardDimOpacity);
      }
    };

    const onLeave = () => {
      if (orbitRoot) {
        card.style.removeProperty('--orbit-magnetic-transform');
        orbitRoot.classList.remove('is-hovering');
        card.classList.remove('is-active');
        return;
      }

      card.style.transform = '';
    };

    card.addEventListener('mouseenter', onEnter);
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
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
  initHeroStickyNarrative();
  initVideoHoverPreviews();
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
