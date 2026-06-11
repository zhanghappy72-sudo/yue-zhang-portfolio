/**
 * About 页面
 * - 个人介绍、教育背景、技能标签、统计数字都在这里改
 * - 人物图路径使用 assets/yue-portrait.png
 * - 如果你以后要改 About 页文案，这是第一优先文件
 * - 如果只是想换人物图片，请保留这里的 fileUrl(...) 结构，只改图片路径
 */
import { renderStatCards, renderTagList } from '../components/cards.js';
import { fileUrl } from '../utils/fileUrl.js';

const tags = [
  'Digital Media',
  'Immersive Storytelling',
  'VR Film',
  'Unreal Engine 5',
  'Blender',
  'AIGC Animation',
  'Lens-based Media',
  'Content Strategy',
  'Brand Narrative'
];

const skills = [
  'Unreal Engine 5',
  'Blender',
  'Meta Quest',
  'VR Interaction',
  'Blueprint',
  'Premiere',
  'DaVinci Resolve',
  'Photoshop',
  'Illustrator',
  'Content Planning'
];

const stats = [
  { value: '2.85M+', label: '个人 IP 内容总浏览量' },
  { value: '35K+', label: '短视频账号总点赞' },
  { value: '4+', label: '影像与 VR 重点项目已归档' }
];

export const renderAboutPage = () => `
  <!-- About 页首屏：标题、中文介绍、英文简介、人物图 -->
  <section class="page-hero page-hero-about">
    <div class="about-hero-copy">
      <p class="eyebrow">About / 关于我</p>
      <h1>张悦<span>Yue Zhang</span></h1>
      <p>
        我是张悦，一名关注数字媒体、沉浸式叙事与影像表达的创作者。我的创作实践横跨 VR 交互、AIGC 动画、短片影像、品牌叙事与新媒体内容策划，习惯从“故事如何被观看”进一步思考“故事如何被体验”。
      </p>
      <p class="lead-en">
        I am Yue Zhang, a digital media creator working across immersive storytelling, VR interaction, lens-based media, AIGC animation, and content strategy.
      </p>
    </div>
    <div class="about-hero-portrait about-hero-portrait-free">
      <img src="${fileUrl('assets/yue-portrait.png')}" alt="张悦透明人物图" loading="lazy" />
    </div>
  </section>

  <!-- About 内容区：左侧创作方向，右侧教育背景 -->
  <section class="section about-grid">
    <article class="about-panel">
      <p class="eyebrow">Profile</p>
      <h2>创作方向</h2>
      <p>
        我曾参与 VR Film《Dreaming the Peony Pavilion / 游园惊梦》的创作，将传统戏曲《牡丹亭》转化为基于记忆碎片、物件触发与空间探索的第一人称沉浸式体验；也参与过毕业短片、品牌宣传片、校园影像与新媒体内容项目，持续关注传统文化、青年经验、空间记忆与数字媒介的关系。
      </p>
      <ul class="tag-list">${renderTagList(tags)}</ul>
    </article>

    <article class="about-panel">
      <p class="eyebrow">Education</p>
      <h2>教育背景</h2>
      <p><strong>南安普顿大学 / University of Southampton</strong></p>
      <p>数字媒体实践 / Digital Media Practice</p>
      <p>核心课程：协作创意实践、镜头语言与视觉制作、可视化与信息图传播。</p>
      <p>Core coursework: Collaborative Creative Practice / Lens-based and Visual Production / Visualisation and Infographic Communication.</p>
    </article>
  </section>

  <!-- 技能与数据区：标签和统计数字 -->
  <section class="section">
    <div class="section-heading">
      <p class="eyebrow">Capabilities</p>
      <h2>技能与工具</h2>
    </div>
    <ul class="tag-list">${renderTagList(skills)}</ul>
    <div class="stat-grid">${renderStatCards(stats)}</div>
  </section>
`;
