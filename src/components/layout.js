/**
 * 全站公共布局
 * - 顶部导航：logo、导航文字、移动端菜单按钮都在这里
 * - 页脚 Contact 区：邮箱、简历按钮、版权文字都在这里
 * - 如果想改导航顺序，请去 src/data/navigation.js
 * - 如果想改邮箱，请去 src/data/siteMeta.js
 * - 如果想改简历按钮链接，请去 src/data/contactLinks.js
 */
import { navigation } from '../data/navigation.js';
import { siteMeta } from '../data/siteMeta.js';
import { contactLinks } from '../data/contactLinks.js';

const navLinkMarkup = (item, currentPath) => {
  // 这里控制导航高亮规则：当前路由匹配时加 is-current
  const isCurrent =
    item.href !== '#contact' &&
    (item.href === currentPath || (item.href !== '/' && currentPath.startsWith(`${item.href}/`)));
  const href = item.href === '#contact' ? '/#contact' : item.href;

  return `<a class="nav-link${isCurrent ? ' is-current' : ''}" href="${href}" data-link>${item.label}<span>${item.labelZh}</span></a>`;
};

export const renderLayout = (currentPath, content) => {
  const resumeLink = contactLinks.find((item) => item.visible);

  return `
    <div class="site-shell">
      <!-- 顶部导航栏 -->
      <header class="site-header">
        <a class="brand-mark" href="/" aria-label="返回首页" data-link>
          <span>${siteMeta.logo}</span>
          <div>
            <strong>${siteMeta.owner}</strong>
            <small>${siteMeta.ownerEnglish}</small>
          </div>
        </a>
        <button class="menu-toggle" type="button" aria-label="打开导航" aria-expanded="false">
          <span></span><span></span>
        </button>
        <nav class="site-nav" aria-label="主导航">
          ${navigation.map((item) => navLinkMarkup(item, currentPath)).join('')}
        </nav>
      </header>

      <!-- 页面主内容：这里会插入 Home / About / Video / Image / VR / Posts 的内容 -->
      <main id="top">${content}</main>

      <!-- 页脚联系区：如果你以后只想保留邮箱和简历，这里就是对应代码 -->
      <footer class="site-footer" id="contact">
        <div class="footer-copy footer-copy-compact">
          <p class="eyebrow">Contact</p>
          <h2>联系与简历</h2>
          <div class="contact-minimal">
            <div class="contact-line">
              <span>Email</span>
              <strong>${siteMeta.email}</strong>
            </div>
            ${
              resumeLink
                ? `<div class="contact-line">
                    <span>Resume</span>
                    <a class="button button-secondary" href="${resumeLink.href}" target="_blank" rel="noreferrer">Open PDF</a>
                  </div>`
                : ''
            }
          </div>
        </div>
        <div class="footer-note">
          <span>© ${new Date().getFullYear()} Yue Zhang</span>
          <span>Warm sand portfolio system.</span>
        </div>
      </footer>
    </div>
  `;
};
