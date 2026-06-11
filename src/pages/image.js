/**
 * Image 页面
 * - 非人像长廊结构在这里
 * - 人像分组展示在这里
 * - 惯性 / 无限滚动的实际交互在 src/main.js
 */
import { imageProjects } from '../data/imageProjects.js';

const loopImages = [
  ...imageProjects.nonPortraitImages,
  ...imageProjects.nonPortraitImages,
  ...imageProjects.nonPortraitImages
];

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
    <h1>Visual Works<span>moving gallery and portrait groups</span></h1>
    <p>非人像图片进入真正环形的无限移动长廊；人像按组自然展开，保留全部原始比例。</p>
  </section>

  <section class="section">
    <div class="section-heading">
      <p class="eyebrow">Visual Gallery</p>
      <h2>非人像图片</h2>
    </div>
    <div class="image-stage" data-image-stage>
      <div class="image-ribbon-track image-ribbon-track-loop" data-gallery-track data-loop-track data-loop-copies="3">
        ${loopImages
          .map(
            (image, index) => `
              <button class="ribbon-item ribbon-item-${(index % 6) + 1}" type="button" data-lightbox="${image.src}" data-alt="${image.alt}" data-gallery-item>
                <img src="${image.src}" alt="${image.alt}" loading="lazy" />
              </button>
            `
          )
          .join('')}
      </div>
      <div class="image-stage-note">
        <span>Drag / Wheel / Hover</span>
        <small>Infinite loop gallery inspired by picture move and 3Drotation</small>
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
