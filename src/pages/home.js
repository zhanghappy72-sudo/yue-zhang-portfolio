/**
 * 首页入口
 * - 左侧 hero 文案在这里改
 * - 右侧 6 张浮动卡片的数据来自 src/data/homeHighlights.js
 * - 右侧浮动卡片的位置参数来自 src/config/siteConfig.js
 * - About 预览文案和人物图也在本文件
 */
import { homeHighlights } from '../data/homeHighlights.js';
import { siteMeta } from '../data/siteMeta.js';
import { fileUrl } from '../utils/fileUrl.js';
import { siteConfig } from '../config/siteConfig.js';
import { videoProjects } from '../data/videoProjects.js';
import { imageProjects } from '../data/imageProjects.js';
import { vrProjects } from '../data/vrProjects.js';
import { postProjects } from '../data/postProjects.js';

export const renderHomePage = () => {
  const aboutTags = ['Digital Media', 'VR Film', 'Visual Works', 'AIGC', 'Content Strategy'];
  const sectionVisuals = {
    about: fileUrl('assets/yue-portrait.png'),
    video: videoProjects[0]?.cover || '',
    image: imageProjects.nonPortraitImages[4]?.src || imageProjects.nonPortraitImages[0]?.src || '',
    vr: vrProjects[0]?.trailerStills?.[1]?.src || vrProjects[0]?.poster || '',
    post: postProjects[0]?.cover || '',
    contact: fileUrl('assets/yue-portrait.png')
  };

  return `
    <div class="home-space-page">
      <section
        class="hero-sticky-shell hero-space-shell"
        data-hero-sticky-shell
        style="--hero-sticky-height:${siteConfig.homeScene.stickyHeight};"
      >
        <div class="hero-sticky-track" data-hero-sticky-track>
          <div class="hero-bg-stack hero-bg-stack-space" aria-hidden="true">
            <div class="hero-bg-layer hero-bg-layer-base" data-hero-bg-layer="base"></div>
            <div class="hero-bg-layer hero-bg-layer-rose" data-hero-bg-layer="rose"></div>
            <div class="hero-bg-layer hero-bg-layer-bloom" data-hero-bg-layer="bloom"></div>
            <div class="hero-bg-layer hero-bg-layer-shadow" data-hero-bg-layer="shadow"></div>
            <div class="hero-grain-layer" data-hero-bg-layer="grain"></div>
          </div>
          <section class="hero hero-space-stage" data-hero-sticky-stage data-home-space-stage>
            <div class="hero-space-copy" data-hero-copy>
              <p class="eyebrow">Portfolio / 作品集</p>
              <span class="hero-space-kicker" data-hero-english>Portfolio</span>
              <h1 class="hero-space-title" data-hero-title>${siteMeta.owner}<span>${siteMeta.ownerEnglish}</span></h1>
              <p class="hero-title hero-space-subtitle" data-hero-subtitle>${siteMeta.heroTagline}</p>
              <p class="hero-intro hero-space-intro" data-hero-intro>
                聚焦数字媒体、沉浸式叙事、VR 互动、影像创作、AIGC 动画与内容策划，展示故事如何从“被观看”转向“被体验”。
              </p>
              <div class="hero-actions hero-space-actions" data-hero-actions>
                <a class="button" href="/about" data-link>About</a>
              </div>
            </div>

            <div class="hero-space-scene" data-home-scene>
              <div class="hero-space-atmosphere" aria-hidden="true">
                <span class="hero-space-orb hero-space-orb-1"></span>
                <span class="hero-space-orb hero-space-orb-2"></span>
                <span class="hero-space-orb hero-space-orb-3"></span>
              </div>

              <div class="hero-person-stage" data-hero-person-stage>
                <div class="hero-person-beam" aria-hidden="true"></div>
                <figure class="hero-person-figure" data-hero-person>
                  <img class="hero-person-shadow" src="${fileUrl('assets/yue-portrait.png')}" alt="" aria-hidden="true" loading="lazy" />
                  <img class="hero-person-line" src="${fileUrl('assets/yue-portrait.png')}" alt="张悦抽象人物轮廓" loading="lazy" />
                  <span class="hero-person-face-mask" aria-hidden="true"></span>
                </figure>
              </div>

              <div class="hero-orbit hero-space-orbit" data-hero-orbit>
                ${homeHighlights
                  .map((item, index) => {
                    const orbit = siteConfig.heroOrbitCards[index] || {};
                    const visual = sectionVisuals[item.type];
                    return `
                      <a
                        class="orbit-card orbit-card-${index + 1} scene-entry"
                        href="${item.href}"
                        data-link
                        data-magnetic-card
                        data-hero-card
                        data-cursor-label="${item.type === 'about' ? 'VIEW' : 'ENTER'}"
                        style="
                          --orbit-top:${orbit.top || '0'};
                          --orbit-left:${orbit.left || '0'};
                          --orbit-width:${orbit.width || 'min(286px, 32vw)'};
                          --orbit-z:${orbit.zIndex || 1};
                          --orbit-transform:${orbit.transform || 'none'};
                          --orbit-parallax-x:${orbit.parallaxX || 0}px;
                          --orbit-parallax-y:${orbit.parallaxY || 0}px;
                          --orbit-depth:${orbit.depth || 1};
                          --orbit-spread-x:${orbit.spreadX || 0}px;
                          --orbit-spread-y:${orbit.spreadY || 0}px;
                        "
                      >
                        <div class="scene-entry-visual ${visual ? '' : 'is-abstract'}" aria-hidden="true">
                          ${
                            visual
                              ? `<img src="${visual}" alt="" loading="lazy" />`
                              : `<span class="scene-entry-abstract-shape"></span>`
                          }
                        </div>
                        <div class="scene-entry-copy">
                          <small>${item.title}</small>
                          <strong>${item.titleZh}</strong>
                          <span>${item.description}</span>
                        </div>
                      </a>
                    `;
                  })
                  .join('')}
              </div>
            </div>
          </section>
        </div>
        <div class="hero-sticky-exit" aria-hidden="true"></div>
      </section>

      <section class="section section-home-about section-home-about-space" data-home-about>
        <div class="section-heading">
          <p class="eyebrow">About / 关于我</p>
          <h2>让故事从观看转向体验</h2>
        </div>
        <div class="home-about-grid">
          <div class="home-about-copy">
            <p>
              我是张悦，一名关注数字媒体、沉浸式叙事与影像表达的创作者。我的创作实践横跨 VR 交互、AIGC 动画、短片影像、品牌叙事与新媒体内容策划，习惯从“故事如何被观看”进一步思考“故事如何被体验”。
            </p>
            <p>
              我曾参与 VR Film《Dreaming the Peony Pavilion / 游园惊梦》的创作，也持续在品牌传播、校园影像、视觉作品和内容运营中探索传统文化、青年经验与数字媒介之间的连接方式。
            </p>
            <div class="home-about-tags">
              ${aboutTags.map((tag) => `<span class="tag-chip">${tag}</span>`).join('')}
            </div>
            <div class="hero-actions">
              <a class="button" href="/about" data-link>Read About</a>
            </div>
          </div>
          <div class="home-about-portrait home-about-portrait-free">
            <img src="${fileUrl('assets/yue-portrait.png')}" alt="张悦个人照片" loading="lazy" />
          </div>
        </div>
      </section>
    </div>
  `;
};
