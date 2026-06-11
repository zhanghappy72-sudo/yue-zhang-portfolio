/**
 * Image 页面
 * - 非人像单张式 3D 环形画廊结构在这里
 * - 人像分组展示在这里
 * - 环形拖拽 / 吸附 / 惯性的实际交互在 src/main.js
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
    <h1>Visual Works<span>3D ring gallery and portrait groups</span></h1>
    <p>非人像图片进入单张式 3D 环形画廊；人像按组自然展开，保留全部原始比例。</p>
  </section>

  <section class="section">
    <div class="section-heading">
      <p class="eyebrow">Visual Gallery</p>
      <h2>非人像图片</h2>
    </div>
    <div class="image-stage image-stage-ring" data-image-stage>
      <div class="image-ring-viewport" data-image-ring-viewport>
        <div class="image-ring-track" data-image-ring-track>
          ${imageProjects.nonPortraitImages
          .map(
            (image, index) => `
              <button class="ring-item ring-item-${(index % 5) + 1}" type="button" data-lightbox="${image.src}" data-alt="${image.alt}" data-ring-item data-ring-index="${index}">
                <img src="${image.src}" alt="${image.alt}" loading="lazy" draggable="false" />
              </button>
            `
          )
          .join('')}
        </div>
      </div>
      <div class="image-ring-indicator" aria-hidden="true">
        <span>按住左右拖拽切换</span>
      </div>
      <div class="image-stage-note">
        <span>Drag / Touch / Hover</span>
        <small>one-item-at-a-time draggable 3D ring carousel</small>
      </div>
      <div class="image-stage-note image-stage-note-mobile">
        <small>拖拽切换图片，点击进入大图预览。</small>
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
