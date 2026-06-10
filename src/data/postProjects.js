/**
 * 推文 / 内容策划数据
 * - 推文封面、标题、摘要、微信链接都在这里改
 * - 推文页卡片排版在 src/pages/posts.js
 */
import { fileUrl } from '../utils/fileUrl.js';

export const postProjects = [
  {
    slug: 'frozen-breath-wechat-post',
    title: '定格呼吸',
    platform: 'WeChat',
    type: 'Visual Post',
    summary: '公众号推文案例，聚焦视觉表达与内容策划。',
    cover: fileUrl('content/推文/定格呼吸推文封面.jpg'),
    link: 'https://mp.weixin.qq.com/s/pCQJ1ep2GdPwEm2kUd9uZQ',
    status: 'published'
  },
  {
    slug: 'frozen-film-post',
    title: '定格胶片',
    platform: 'WeChat',
    type: 'Visual Column',
    summary: '摄影与视觉栏目推文案例。',
    cover: fileUrl('content/推文/定格胶片推文封面.jpg'),
    link: 'https://mp.weixin.qq.com/s/dLjx0EELw4fXY_AInB16uQ',
    status: 'published'
  },
  {
    slug: 'light-shadow-post',
    title: '光影',
    platform: 'WeChat',
    type: 'Editorial Feature',
    summary: '内容策划与专题包装推文案例。',
    cover: fileUrl('content/推文/光影封面.jpg'),
    link: 'https://mp.weixin.qq.com/s/4LbXaH5ZJCLUZz2NMKznKA',
    status: 'published'
  },
  {
    slug: 'memory-post',
    title: '藏在旧里的回忆',
    platform: 'WeChat',
    type: 'Editorial Story',
    summary: '记忆主题推文案例。',
    cover: fileUrl('content/推文/记忆封面.jpg'),
    link: 'https://mp.weixin.qq.com/s/9YYdPrV2R8890ELiUNojUg',
    status: 'published'
  },
  {
    slug: 'graduation-fashion-post',
    title: '毕业服装展',
    platform: 'WeChat',
    type: 'Event Content',
    summary: '毕业服装展活动推文案例。',
    cover: fileUrl('content/推文/毕业展封面.jpg'),
    link: 'https://mp.weixin.qq.com/s/lj65kG-RIu8NO6KQ1idHrQ',
    status: 'published'
  },
  {
    slug: 'chasing-light-post',
    title: '追光季',
    platform: 'WeChat',
    type: 'Editorial Feature',
    summary: '追光主题视觉推文案例。',
    cover: fileUrl('content/推文/追光记图片.jpg'),
    link: 'https://mp.weixin.qq.com/s/p6-Lrdx5uXIipGfQr7jcgw',
    status: 'published'
  }
];
