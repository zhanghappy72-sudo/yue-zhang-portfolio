/**
 * Video 页面
 * - 列表页卡片排版在这里
 * - 每个视频的封面、简介、角色、外链数据来自 src/data/videoProjectSource.js
 * - 如果部署版改为外部观看，本文件会自动把主视频切成封面 + 按钮，不影响本地完整版
 */
import { videoProjects } from '../data/videoProjects.js';
import { siteConfig } from '../config/siteConfig.js';

const renderDetailGallery = (gallery) => {
  const slots = [...gallery];
  while (slots.length < 3) {
    slots.push(null);
  }

  return `
    <div class="gallery-grid gallery-grid-fixed">
      ${slots
        .slice(0, 3)
        .map((image, index) =>
          image
            ? `
              <button class="gallery-item" type="button" data-lightbox="${image.src}" data-alt="${image.alt}">
                <img src="${image.src}" alt="${image.alt}" loading="lazy" />
              </button>
            `
            : `
              <div class="gallery-item gallery-item-placeholder" aria-label="图片占位 ${index + 1}">
                <span>Image Placeholder ${index + 1}</span>
              </div>
            `
        )
        .join('')}
    </div>
  `;
};

export const renderVideoPage = () => `
  <section class="page-hero page-hero-dark page-hero-video-cinema">
    <p class="eyebrow">Video / 视频作品</p>
    <h1>Video Works<span>floating cover cards</span></h1>
    <p>列表页只保留封面与短信息，完整简介、链接和播放内容放到详情页中阅读。</p>
  </section>

  <section class="section section-video-cinema" style="--video-preview-hover-scale:${siteConfig.motion.videoPreviewHoverScale};">
    <div class="video-cloud video-cloud-covers video-cloud-hover-focus video-cloud-preview" data-video-cloud>
      ${videoProjects
        .map(
          (item, index) => `
            <a
              class="video-bubble video-cover-card video-cover-card-refined ${item.status === 'coming-soon' ? 'is-muted' : ''}"
              href="/video/${item.slug}"
              data-link
              data-video-preview-card
              data-video-preview-type="${item.media.type}"
              data-video-preview-src="${item.media.type === 'local-file' ? item.media.src : ''}"
              data-video-preview-poster="${item.cover || ''}"
              aria-label="${item.subtitle}"
              style="--bubble-index:${index}"
            >
              <div class="video-cover-shell video-cover-shell-wide">
                ${
                  item.cover
                    ? `<img src="${item.cover}" alt="${item.subtitle}封面" loading="lazy" class="video-cover-image" />`
                    : `<div class="video-cover-placeholder">${item.subtitle}</div>`
                }
                ${
                  item.media.type === 'local-file'
                    ? `<video class="video-cover-preview" muted playsinline preload="metadata" aria-hidden="true"></video>`
                    : ''
                }
                <div class="video-cover-veil" aria-hidden="true"></div>
              </div>
              <div class="video-cover-copy">
                <small>${item.category}</small>
                <strong>${item.subtitle}</strong>
                <span>${item.title}</span>
              </div>
              <div class="video-meta-lines">
                <p>${item.year} / ${item.role}</p>
                <p>${item.keywords.slice(0, 3).join(' / ')}</p>
              </div>
            </a>
          `
        )
        .join('')}
    </div>
  </section>
`;

export const renderVideoDetailPage = (project) => `
  <section class="page-hero page-hero-compact">
    <p class="eyebrow">Video Detail</p>
    <h1>${project.subtitle}<span>${project.title}</span></h1>
    <p>${project.summary}</p>
    <a class="button button-secondary" href="/video" data-link>Back to Video</a>
  </section>

  <section class="section detail-layout">
    <div class="detail-main">
      ${
        project.media.type === 'local-file'
          ? `<video class="detail-video" controls preload="metadata" ${project.media.poster ? `poster="${project.media.poster}"` : ''} aria-label="${project.subtitle}视频播放器">
              <source src="${project.media.src}" type="video/mp4" />
            </video>`
          : project.media.type === 'external-link'
            ? `
              <div class="detail-image detail-image-external">
                <img class="detail-image" src="${project.cover}" alt="${project.subtitle}封面" loading="lazy" />
              </div>
            `
            : project.cover
              ? `<img class="detail-image" src="${project.cover}" alt="${project.subtitle}封面" loading="lazy" />`
              : `<div class="detail-image detail-image-placeholder">暂无封面，已保留详情结构位</div>`
      }
      ${
        project.media.type === 'external-link'
          ? `
            <div class="detail-links detail-links-inline">
              <a class="button" href="${project.media.href}" target="_blank" rel="noreferrer">${project.media.note || 'Open External Video'}</a>
            </div>
          `
          : project.media.type === 'unavailable'
            ? `
              <div class="detail-links detail-links-inline">
                <span class="button button-disabled">${project.media.note || 'External media to be added'}</span>
              </div>
            `
          : project.cover
              ? ''
              : ''
      }
      ${renderDetailGallery(project.gallery)}
    </div>
    <aside class="detail-side">
      <div class="meta-block">
        <span>Year</span>
        <strong>${project.year}</strong>
      </div>
      <div class="meta-block">
        <span>Category</span>
        <strong>${project.category}</strong>
      </div>
      <div class="meta-block">
        <span>Role</span>
        <strong>${project.role}</strong>
      </div>
      <div class="meta-block">
        <span>Keywords</span>
        <p>${project.keywords.join(' / ') || 'Details to be added'}</p>
      </div>
      <div class="meta-block">
        <span>Tools</span>
        <p>${project.tools.join(' / ')}</p>
      </div>
      <div class="meta-block">
        <span>Summary</span>
        <p>${project.summary}</p>
      </div>
      <div class="detail-links">
        ${
          project.links.length
            ? project.links
                .map((link) =>
                  link.href
                    ? `<a class="button" href="${link.href}" target="_blank" rel="noreferrer">${link.label}</a>`
                    : `<span class="button button-disabled">${link.label}</span>`
                )
                .join('')
            : `<span class="button button-disabled">External link coming soon</span>`
        }
      </div>
    </aside>
  </section>
`;
