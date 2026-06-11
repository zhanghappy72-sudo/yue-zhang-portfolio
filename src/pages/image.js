/**
 * Image 页面
 * - 非人像长廊结构在这里
 * - 人像分组展示在这里
 * - 惯性 / 无限滚动的实际交互在 src/main.js
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
    <h1>Visual Works<span>3D gallery and portrait groups</span></h1>
    <p>非人像图片进入可拖拽旋转的 3D 环形画廊；人像按组自然展开，保留全部原始比例。</p>
  </section>

  <section class="section">
    <div class="section-heading">
      <p class="eyebrow">Visual Gallery</p>
      <h2>非人像图片</h2>
    </div>
    <div class="image-stage image-stage-sphere" data-image-stage>
      <div class="image-sphere-viewport" data-image-sphere-viewport>
        <div class="image-sphere" data-image-sphere>
          ${imageProjects.nonPortraitImages
          .map(
            (image, index) => `
              <button class="sphere-item sphere-item-${(index % 7) + 1}" type="button" data-lightbox="${image.src}" data-alt="${image.alt}" data-sphere-item data-sphere-index="${index}">
                <img src="${image.src}" alt="${image.alt}" loading="lazy" draggable="false" />
              </button>
            `
          )
          .join('')}
        </div>
      </div>
      <div class="image-rotate-indicator" aria-hidden="true">
        <svg viewBox="0 0 64 64" role="presentation">
          <path d="M35 10c8 1 15 8 16 17" />
          <path d="M46 10h8v8" />
          <path d="M29 54c-8-1-15-8-16-17" />
          <path d="M18 54h-8v-8" />
          <path d="M23 28c0-4 3-7 7-7s7 3 7 7v11" />
          <path d="M30 39V18" />
          <path d="M37 31c1-2 3-3 5-3 3 0 5 2 5 5v9" />
          <path d="M23 32c-1-2-3-3-5-3-3 0-5 2-5 5v8" />
          <path d="M30 48l5 5c3 3 9 3 12 0 3-3 3-8 0-11l-5-5" />
        </svg>
        <span>按住拖动旋转</span>
      </div>
      <div class="image-stage-note">
        <span>Drag / Touch / Hover</span>
        <small>3D rotating gallery inspired by 3Drotation</small>
      </div>
      <div class="image-stage-note image-stage-note-mobile">
        <small>拖拽旋转图片环，点击进入大图预览。</small>
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
