/**
 * Image 页面
 * - 非人像 gradient slider 结构在这里
 * - 人像分组展示在这里
 * - 非人像 3D infinite carousel 的实际交互在 src/main.js
 */
import { imageProjects } from '../data/imageProjects.js';

const renderPortraitGroup = (group) => {
  if (group.label !== '人像 2') {
    return `
      <section class="portrait-group">
        <div class="portrait-group-head">
          <small>${group.label}</small>
        </div>
        <div class="portrait-group-grid">
          ${group.images
            .map(
              (image) => `
                <button type="button" class="portrait-tile" data-lightbox="${image.src}" data-alt="${image.alt}" data-magnetic-card>
                  <img src="${image.src}" alt="${image.alt}" loading="lazy" />
                </button>
              `
            )
            .join('')}
        </div>
      </section>
    `;
  }

  return `
    <section class="portrait-group portrait-group-2-refined">
      <div class="portrait-group-head">
        <small>${group.label}</small>
      </div>
      <div class="portrait-group-grid portrait-group-grid-2-refined">
        ${group.images
          .map(
            (image) => `
              <button type="button" class="portrait-tile" data-lightbox="${image.src}" data-alt="${image.alt}" data-magnetic-card>
                <img src="${image.src}" alt="${image.alt}" loading="lazy" />
              </button>
            `
          )
          .join('')}
      </div>
    </section>
  `;
};

export const renderImagePage = () => `
  <section class="page-hero">
    <p class="eyebrow">Image / 图片作品</p>
    <h1>Visual Works<span>gradient carousel and portrait groups</span></h1>
    <p>非人像图片进入 3D infinite carousel；人像按组自然展开，保留全部原始比例。</p>
  </section>

  <section class="section">
    <div class="section-heading">
      <p class="eyebrow">Visual Gallery</p>
      <h2>非人像图片</h2>
    </div>
    <div class="image-gradient-stage" data-image-slider-stage>
      <canvas class="image-gradient-bg" data-image-slider-bg aria-hidden="true"></canvas>
      <div class="image-gradient-cards" data-image-slider-cards aria-label="非人像图片 3D 轮播">
        ${imageProjects.nonPortraitImages
          .map(
            (image) => `
              <button class="image-gradient-card" type="button" data-image-slider-item data-lightbox="${image.src}" data-alt="${image.alt}">
                <img class="image-gradient-card__img" src="${image.src}" alt="${image.alt}" loading="lazy" draggable="false" />
              </button>
            `
          )
          .join('')}
      </div>
      <div class="image-stage-note">
        <span>Drag / Wheel / Hover</span>
        <small>Infinite gradient 3D carousel adapted from gradientslider-main</small>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-heading">
      <p class="eyebrow">Portrait</p>
      <h2>人像组图</h2>
    </div>
    <div class="portrait-group-stack">
      ${imageProjects.portraitGroups.map((group) => renderPortraitGroup(group)).join('')}
    </div>
  </section>
`;
