/**
 * VR 页面
 * - VR 列表页和详情页都在这里
 * - 项目文字、trailer、ending、蓝图、资产、下载链接来自 src/data/vrProjects.js
 * - 部署版如没有本地大文件，会自动降级为封面 + 外部按钮，而不是直接报错
 */
import { vrProjects } from '../data/vrProjects.js';

const vrProject = vrProjects[0];

const renderImageGrid = (items, className = 'vr-gallery-grid-free') => `
  <div class="${className}">
    ${items
      .map(
        (image) => `
          <button class="gallery-item gallery-item-free" type="button" data-lightbox="${image.src}" data-alt="${image.alt}" data-magnetic-card>
            <img src="${image.src}" alt="${image.alt}" loading="lazy" />
          </button>
        `
      )
      .join('')}
  </div>
`;

export const renderVrPage = () => `
  <section class="page-hero page-hero-vr page-hero-vr-soft">
    <p class="eyebrow">VR / 沉浸式项目</p>
    <h1>${vrProject.subtitle}<span>${vrProject.title}</span></h1>
    <p>${vrProject.overview}</p>
    <a class="button" href="/vr/${vrProject.slug}" data-link>Open Full Case</a>
  </section>

  <section class="section vr-card-overview">
    <article class="vr-summary-card vr-summary-card-soft">
      <img src="${vrProject.poster}" alt="游园惊梦海报" loading="lazy" />
      <div>
        <small>Focus Project</small>
        <strong>Dreaming the Peony Pavilion</strong>
        <p>包含预告片、AIGC 皮影戏动画、场景体验图、蓝图与资产，以及完整 Windows ZIP 下载入口。</p>
      </div>
    </article>
  </section>
`;

export const renderVrDetailPage = (project) => `
  <section class="page-hero page-hero-vr page-hero-vr-soft">
    <p class="eyebrow">VR Detail</p>
    <h1>${project.subtitle}<span>${project.title}</span></h1>
    <p>${project.overview}</p>
    <a class="button button-secondary" href="/vr" data-link>Back to VR</a>
  </section>

  <section class="section detail-layout detail-layout-vr-left">
    <div class="detail-main detail-main-vr-left">
      <section class="vr-case-block vr-case-block-trailer">
        <div class="section-heading">
          <p class="eyebrow">Trailer</p>
          <h2>预告片主区</h2>
        </div>
        ${
          project.trailer.type === 'local-file'
            ? `<video class="detail-video detail-video-vr detail-video-vr-hero" controls preload="metadata" poster="${project.trailer.poster}" aria-label="游园惊梦预告片">
                <source src="${project.trailer.src}" type="video/mp4" />
              </video>`
            : `
              <div class="detail-image detail-image-external detail-video-vr-hero">
                <img class="detail-image" src="${project.trailer.poster}" alt="游园惊梦预告片封面" loading="lazy" />
              </div>
            `
        }
        ${
          project.trailer.type === 'external-link'
            ? `<div class="detail-links detail-links-inline"><a class="button" href="${project.trailer.href}" target="_blank" rel="noreferrer">${project.trailer.note || 'Open Trailer'}</a></div>`
            : project.trailer.type === 'unavailable'
              ? `<p class="detail-note">${project.trailer.note || 'Trailer link to be added'}</p>`
              : ''
        }
        <div class="vr-trailer-strip">
          ${project.trailerStills
            .map(
              (image) => `
                <button class="gallery-item gallery-item-free vr-trailer-thumb" type="button" data-lightbox="${image.src}" data-alt="${image.alt}">
                  <img src="${image.src}" alt="${image.alt}" loading="lazy" />
                </button>
              `
            )
            .join('')}
        </div>
      </section>

      <section class="vr-case-block">
        <div class="section-heading">
          <p class="eyebrow">AIGC Animation</p>
          <h2>AIGC 皮影戏动画区</h2>
        </div>
        <article class="vr-aigc-feature">
          <video class="detail-video detail-video-vr" controls preload="metadata" aria-label="${project.aigcFeature.title}">
            <source src="${project.aigcFeature.src}" type="video/mp4" />
          </video>
          <p>${project.aigcFeature.description}</p>
        </article>
      </section>

      <section class="vr-case-block">
        <div class="section-heading">
          <p class="eyebrow">Interactive Gallery</p>
          <h2>图片交互展示区</h2>
        </div>
        <div class="vr-category-stack">
          <section class="vr-category-block">
            <h3>Storyboard</h3>
            ${renderImageGrid(project.storyboard, 'vr-gallery-grid-free vr-gallery-grid-3d')}
          </section>
          <section class="vr-category-block">
            <h3>Blueprint</h3>
            ${renderImageGrid(project.blueprints, 'vr-gallery-grid-free vr-gallery-grid-3d')}
          </section>
          <section class="vr-category-block">
            <h3>Assets</h3>
            ${renderImageGrid(project.assets, 'vr-gallery-grid-free vr-gallery-grid-3d')}
          </section>
        </div>
      </section>
    </div>

    <aside class="detail-side detail-side-dark detail-side-vr-soft">
        <div class="meta-block">
          <span>Story Structure</span>
          <ul>${project.storyStructure.map((item) => `<li>${item}</li>`).join('')}</ul>
        </div>
        <div class="meta-block">
          <span>Interaction</span>
          <ul>${project.interactionMethod.map((item) => `<li>${item}</li>`).join('')}</ul>
        </div>
        <div class="meta-block">
          <span>My Role</span>
          <p>${project.responsibility.join(' / ')}</p>
        </div>
        <div class="meta-block">
          <span>Tools</span>
          <p>${project.tools.join(' / ')}</p>
        </div>
        <div class="download-panel">
          <strong>${project.download.label}</strong>
          ${
            project.download.visible && project.download.href
              ? `<a class="button" href="${project.download.href}" ${project.download.href.startsWith('http') ? 'target="_blank" rel="noreferrer"' : 'download'}>${project.download.label}</a>`
              : `<span class="button button-disabled">${project.download.note}</span>`
          }
          ${project.download.passcode ? `<p>提取码：${project.download.passcode}</p>` : ''}
          <p>${project.download.note}</p>
        </div>
        <div class="detail-links">
          ${project.links
            .filter((link) => link.visible !== false)
            .map((link) => {
              const external = link.href.startsWith('http');
              return `<a class="button button-secondary" href="${link.href}" ${
                external ? 'target="_blank" rel="noreferrer"' : ''
              }>${link.label}</a>`;
            })
            .join('')}
        </div>
      </aside>
  </section>
`;
