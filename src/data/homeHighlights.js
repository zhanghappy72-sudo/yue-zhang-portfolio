/**
 * 首页右侧 6 张浮动卡片的数据
 * - 改标题 / 路由 / 描述：改这里
 * - 这 6 条的渲染顺序会直接影响首页 hero 右侧卡片内容顺序
 * - 卡片具体位置参数在 src/config/siteConfig.js
 */
export const homeHighlights = [
  {
    title: 'About',
    titleZh: '关于我',
    description: 'Profile / Background / Direction',
    href: '/about',
    type: 'about'
  },
  {
    title: 'Posts',
    titleZh: '推文内容',
    description: 'Content Strategy / WeChat / Editorial Practice',
    href: '/posts',
    type: 'post'
  },
  {
    title: 'VR',
    titleZh: 'VR 项目',
    description: 'Immersive Storytelling / Spatial Experience',
    href: '/vr',
    type: 'vr'
  },
  {
    title: 'Image',
    titleZh: '图片作品',
    description: 'Photography / Portrait / Visual Works',
    href: '/image',
    type: 'image'
  },
  {
    title: 'Video',
    titleZh: '视频作品',
    description: 'Video Works / Trailers / Campaigns',
    href: '/video',
    type: 'video'
  },
  {
    title: 'Contact',
    titleZh: '联系',
    description: 'Email / Resume / Collaboration',
    href: '/#contact',
    type: 'contact'
  }
];
