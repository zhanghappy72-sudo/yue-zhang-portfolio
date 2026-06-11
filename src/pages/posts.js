/**
 * Posts 页面
 * - 推文卡片展示在这里
 * - 数据来源是 src/data/postProjects.js
 * - 如果想换推文封面、标题、摘要或微信链接，请直接改 src/data/postProjects.js
 */
import { postProjects } from '../data/postProjects.js';

export const renderPostsPage = () => `
  <!-- 推文页首屏 -->
  <section class="page-hero">
    <p class="eyebrow">Posts / 推文与内容策划</p>
    <h1>Content Strategy<span>editorial cards and platform practice</span></h1>
    <p>基于真实推文链接与封面图展示内容策划案例，文字信息直接收纳在卡片中。</p>
  </section>

  <!-- 推文卡片区：封面、平台、标题、摘要都来自 postProjects 数据 -->
  <section class="section">
    <div class="posts-grid posts-cloud posts-cloud-refined">
      ${postProjects
        .map(
          (post, index) => `
            <a class="post-card post-float-card post-float-card-refined ${post.status === 'coming-soon' ? 'is-muted' : ''}" href="${post.link}" target="_blank" rel="noreferrer" style="--bubble-index:${index}">
              <div class="post-card-media">
                <img src="${post.cover}" alt="${post.title}" loading="lazy" />
              </div>
              <div class="post-copy">
                <small>${post.platform}</small>
                <strong>${post.title}</strong>
                <span>${post.type}</span>
                <p class="post-summary">${post.summary}</p>
              </div>
            </a>
          `
        )
        .join('')}
    </div>
  </section>
`;
