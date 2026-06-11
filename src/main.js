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

const initImageGalleryMotion = () => {
  window.__imageGalleryCleanup?.();

  const stage = document.querySelector('[data-image-stage]');
  const track = document.querySelector('[data-gallery-track]');
  const items = [...document.querySelectorAll('[data-gallery-item]')];

  if (!stage || !track || !items.length) {
    window.__imageGalleryCleanup = null;
    return;
  }

  if (window.innerWidth < 901) {
    track.style.transform = '';
    window.__imageGalleryCleanup = null;
    return;
  }

  let current = 0;
  let target = 0;
  let rafId = 0;
  let isPointerDown = false;
  let lastPointerX = 0;
  let maxOffset = 0;
  let loopWidth = 0;
  let loopCopies = 2;

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  const measure = () => {
    maxOffset = Math.max(0, track.scrollWidth - stage.clientWidth);
    loopCopies = Number(track.dataset.loopCopies || 2);
    loopWidth = track.hasAttribute('data-loop-track') ? track.scrollWidth / loopCopies : 0;
    if (track.hasAttribute('data-loop-track') && current === 0 && target === 0) {
      current = loopWidth;
      target = loopWidth;
    }
    current = clamp(current, 0, maxOffset);
    target = clamp(target, 0, maxOffset);
  };

  const paint = () => {
    current += (target - current) * siteConfig.motion.imageGalleryLerp;
    if (Math.abs(target - current) < 0.1) current = target;

    if (track.hasAttribute('data-loop-track') && loopWidth > 0) {
      if (target < 0) target += loopWidth;
      if (target >= loopWidth) target -= loopWidth;
      if (current < 0) current += loopWidth;
      if (current >= loopWidth) current -= loopWidth;
    }

    track.style.transform = `translate3d(${-current}px,0,0)`;

    items.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const viewportCenter = window.innerWidth / 2;
      const itemCenter = rect.left + rect.width / 2;
      const normalized = Math.max(-1, Math.min(1, (itemCenter - viewportCenter) / (viewportCenter * 0.9)));
      const distance = Math.abs(normalized);
      const depth = (1 - distance) * 100;
      const rotateY = normalized * -18;
      const rotateX = (0.5 - distance) * 4;
      const scale = 0.9 + (1 - distance) * 0.14;
      const brightness = 0.72 + (1 - distance) * 0.42;
      const lift = distance * 22;

      item.style.transform = `translate3d(0, ${lift}px, ${depth}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(${scale})`;
      item.style.filter = `brightness(${brightness})`;
    });

    rafId = window.requestAnimationFrame(paint);
  };

  const onWheel = (event) => {
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    event.preventDefault();
    if (track.hasAttribute('data-loop-track') && loopWidth > 0) {
      target += event.deltaY * siteConfig.motion.imageGalleryWheelMultiplier;
      return;
    }
    target = clamp(target + event.deltaY * siteConfig.motion.imageGalleryWheelMultiplier, 0, maxOffset);
  };

  const onPointerDown = (event) => {
    isPointerDown = true;
    lastPointerX = event.clientX;
    stage.classList.add('is-dragging');
  };

  const onPointerMove = (event) => {
    if (!isPointerDown) return;
    const deltaX = event.clientX - lastPointerX;
    lastPointerX = event.clientX;
    if (track.hasAttribute('data-loop-track') && loopWidth > 0) {
      target -= deltaX * siteConfig.motion.imageGalleryDragMultiplier;
      return;
    }
    target = clamp(target - deltaX * siteConfig.motion.imageGalleryDragMultiplier, 0, maxOffset);
  };

  const endPointer = () => {
    isPointerDown = false;
    stage.classList.remove('is-dragging');
  };

  const onResize = () => measure();

  measure();
  paint();
  stage.addEventListener('wheel', onWheel, { passive: false });
  stage.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', endPointer);
  window.addEventListener('resize', onResize);

  window.__imageGalleryCleanup = () => {
    window.cancelAnimationFrame(rafId);
    stage.removeEventListener('wheel', onWheel);
    stage.removeEventListener('pointerdown', onPointerDown);
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', endPointer);
    window.removeEventListener('resize', onResize);
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
