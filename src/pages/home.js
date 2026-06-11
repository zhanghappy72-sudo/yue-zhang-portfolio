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

export const renderHomePage = () => {
  const aboutTags = ['Digital Media', 'VR Film', 'Visual Works', 'AIGC', 'Content Strategy'];

  return `
    <section class="hero hero-refined">
      <div class="hero-copy">
        <p class="eyebrow">Portfolio / 作品集</p>
        <h1>${siteMeta.owner}<span>${siteMeta.ownerEnglish}</span></h1>
        <p class="hero-title">${siteMeta.heroTagline}</p>
        <p class="hero-intro">
          聚焦数字媒体、沉浸式叙事、VR 互动、影像创作、AIGC 动画与内容策划，展示故事如何从“被观看”转向“被体验”。
        </p>
        <div class="hero-actions">
          <a class="button" href="/about" data-link>About</a>
        </div>
      </div>
      <div class="hero-orbit hero-orbit-refined" aria-hidden="true">
        ${homeHighlights
          .map((item, index) => {
            const orbit = siteConfig.heroOrbitCards[index] || {};
            return `
              <a
                class="orbit-card orbit-card-${index + 1}"
                href="${item.href}"
                data-link
                data-magnetic-card
                style="
                  --orbit-top:${orbit.top || '0'};
                  --orbit-left:${orbit.left || '0'};
                  --orbit-width:${orbit.width || 'min(286px, 32vw)'};
                  --orbit-z:${orbit.zIndex || 1};
                  --orbit-transform:${orbit.transform || 'none'};
                "
              >
                <small>${item.title}</small>
                <strong>${item.titleZh}</strong>
                <span>${item.description}</span>
              </a>
            `;
          })
          .join('')}
      </div>
    </section>

    <section class="section section-home-about">
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
  `;
};
