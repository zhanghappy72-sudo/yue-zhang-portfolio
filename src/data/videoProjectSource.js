/**
 * 视频作品数据源
 * - 新增 / 删除视频作品：改这个文件
 * - 封面图 / 剧照路径：改 cover、gallery
 * - 标题 / 简介 / 角色 / 外链：改每条对象
 * - 本地大视频与部署外链的切换：由 src/config/mediaManifest.js 控制
 */
import { fileUrl } from '../utils/fileUrl.js';
import { resolveMediaSource } from '../config/mediaManifest.js';

const placeholderSummary = '主策划、拍摄、剪辑 / Details to be added';
const placeholderRole = '主策划、拍摄、剪辑 / Role to be added';
const createMedia = (key, localSrc, poster, externalFallback = '') => ({
  ...resolveMediaSource({ key, localPath: localSrc, fallbackHref: externalFallback }),
  poster: fileUrl(poster)
});

export const videoProjectSource = [
  {
    slug: 'where-spring-is-found',
    title: 'Where Spring Is Found',
    subtitle: '找春天',
    year: '2025',
    category: '毕业季宣传片',
    role: '主策划、拍摄、剪辑',
    summary:
      '《找春天》讲述了两位主人公在毕业前夕，意外收到一封神秘来信和一个宝箱，他们将根据信中线索一同开展一场“寻找春天花瓣”的冒险旅程。他们在寻找的过程中，重走了大学四年来熟悉的角落，也重新拾起了青春中最珍贵的回忆。',
    keywords: ['Graduation', 'Youth', 'Memory'],
    cover: fileUrl('content/脚本、视频作品/找春天视频/找春天封面.jpg'),
    media: createMedia(
      'video.where-spring-is-found',
      'content/脚本、视频作品/找春天视频/找春天.mp4',
      'content/脚本、视频作品/找春天视频/找春天封面.jpg',
      'https://www.xinpianchang.com/a13512907?channel=copyLink&from=webShare'
    ),
    gallery: [
      { src: fileUrl('content/脚本、视频作品/找春天视频/找春天剧照/AHW_5386.jpg'), alt: '找春天剧照 1' },
      { src: fileUrl('content/脚本、视频作品/找春天视频/找春天剧照/IMG_8129.jpg'), alt: '找春天剧照 2' },
      { src: fileUrl('content/脚本、视频作品/找春天视频/找春天剧照/IMG_8242.jpg'), alt: '找春天剧照 3' }
    ],
    links: [{ label: '新片场', href: 'https://www.xinpianchang.com/a13512907?channel=copyLink&from=webShare' }],
    status: 'published'
  },
  {
    slug: 'our-game-our-youth',
    title: 'Our Game, Our Youth',
    subtitle: '就这 Young 玩',
    year: '2025',
    category: '毕业季宣传片',
    role: '主策划、拍摄、剪辑',
    summary:
      '该片以环形叙事串联青春故事，用人物弧线传递“多元人生选择”的主题。短片通过游戏、学习、画画、运动、播音等不同生活状态，表现每个人都在以自己的方式坚守热爱、追逐目标。',
    keywords: ['Youth', 'Play', 'Campus'],
    cover: fileUrl('content/脚本、视频作品/就这Young玩视频/就这young玩封面.JPG'),
    media: createMedia(
      'video.our-game-our-youth',
      'content/脚本、视频作品/就这Young玩视频/就这Young玩.mp4',
      'content/脚本、视频作品/就这Young玩视频/就这young玩封面.JPG',
      'https://www.xinpianchang.com/a13512914?channel=copyLink&from=webShare'
    ),
    gallery: [
      { src: fileUrl('content/脚本、视频作品/就这Young玩视频/玩 剧照/DSCF7830.jpg'), alt: '就这 Young 玩剧照 1' },
      { src: fileUrl('content/脚本、视频作品/就这Young玩视频/玩 剧照/DSCF7868.jpg'), alt: '就这 Young 玩剧照 2' },
      { src: fileUrl('content/脚本、视频作品/就这Young玩视频/玩 剧照/IMG_1584.JPG'), alt: '就这 Young 玩剧照 3' }
    ],
    links: [{ label: '新片场', href: 'https://www.xinpianchang.com/a13512914?channel=copyLink&from=webShare' }],
    status: 'published'
  },
  {
    slug: 'china-unicom-thousands-of-knots',
    title: 'China Unicom: thousands of knots, layers of interdependence',
    subtitle: '中国联通：千千成结，层层相依',
    year: '2024',
    category: '品牌宣传片',
    role: '主策划、拍摄、剪辑',
    summary:
      '作品以中国联通中国结 logo 为参考，将其拆分为箭头、无限、爱心三种品牌图形，并分别联系说书、香牌、围巾等意象，表现联通温暖、共创、创新与智慧的品牌形象。',
    keywords: ['Brand', 'Narrative', 'Identity'],
    cover: fileUrl('content/脚本、视频作品/中国联通“千千成结，层层相依”视频/中国联通封面.JPG'),
    media: createMedia(
      'video.china-unicom-thousands-of-knots',
      'content/脚本、视频作品/中国联通“千千成结，层层相依”视频/中国联通.mp4',
      'content/脚本、视频作品/中国联通“千千成结，层层相依”视频/中国联通封面.JPG',
      'https://www.xinpianchang.com/a13335414?from=UserProfile'
    ),
    gallery: [
      { src: fileUrl('content/脚本、视频作品/中国联通“千千成结，层层相依”视频/联通1.jpg'), alt: '中国联通剧照 1' },
      { src: fileUrl('content/脚本、视频作品/中国联通“千千成结，层层相依”视频/联通2.jpg'), alt: '中国联通剧照 2' },
      { src: fileUrl('content/脚本、视频作品/中国联通“千千成结，层层相依”视频/联通3.jpg'), alt: '中国联通剧照 3' }
    ],
    links: [{ label: '新片场', href: 'https://www.xinpianchang.com/a13335414?from=UserProfile' }],
    status: 'published'
  },
  {
    slug: 'wahaha-coffee-positioning',
    title: 'Wahaha: Taste the coffee, enjoy the life',
    subtitle: '娃哈哈：品咖味，享咖位',
    year: '2023',
    category: '广告片',
    role: '主策划、拍摄、剪辑',
    summary:
      '围绕咖位的产品定位、品质格调与“大咖之选”的调性构思广告拍摄思路，将咖啡制作过程与原材料质感结合，通过慢放和细节镜头传达高品质生活方式。',
    keywords: ['Coffee', 'Lifestyle', 'Brand'],
    cover: fileUrl('content/脚本、视频作品/娃哈哈“品咖味，享咖位”视频/咖位封面.png'),
    media: createMedia(
      'video.wahaha-coffee-positioning',
      'content/脚本、视频作品/娃哈哈“品咖味，享咖位”视频/2、娃哈哈咖位广告.mp4',
      'content/脚本、视频作品/娃哈哈“品咖味，享咖位”视频/咖位封面.png',
      'https://www.xinpianchang.com/a13335446?from=UserProfile'
    ),
    gallery: [
      { src: fileUrl('content/脚本、视频作品/娃哈哈“品咖味，享咖位”视频/wahaha1.png'), alt: '娃哈哈剧照 1' },
      { src: fileUrl('content/脚本、视频作品/娃哈哈“品咖味，享咖位”视频/wahaha2.png'), alt: '娃哈哈剧照 2' },
      { src: fileUrl('content/脚本、视频作品/娃哈哈“品咖味，享咖位”视频/wahaha3.png'), alt: '娃哈哈剧照 3' }
    ],
    links: [{ label: '新片场', href: 'https://www.xinpianchang.com/a13335446?from=UserProfile' }],
    status: 'published'
  },
  {
    slug: 'shuanglu-battery',
    title: 'Choose Shuanglu, Stay Unstuck',
    subtitle: '双鹿电池：无忧无碌，就选双鹿',
    year: '2024',
    category: '广告片',
    role: '主策划、拍摄、剪辑',
    summary:
      '围绕双鹿电池的产品特性制作三个喜剧小片场，以剃须刀、手电筒、拍立得三种日常尴尬情境，突出续航强、容量大、防漏液等产品优势。',
    keywords: ['Comedy', 'Battery', 'Product'],
    cover: fileUrl('assets/video-posters/双鹿电池.mp4.png'),
    media: createMedia(
      'video.shuanglu-battery',
      'content/脚本、视频作品/双鹿电池“无忧无碌，就选双鹿”视频/双鹿电池.mp4',
      'assets/video-posters/双鹿电池.mp4.png',
      'https://www.xinpianchang.com/a13335480'
    ),
    gallery: [
      { src: fileUrl('content/脚本、视频作品/双鹿电池“无忧无碌，就选双鹿”视频/电池1.jpg'), alt: '双鹿电池剧照 1' },
      { src: fileUrl('content/脚本、视频作品/双鹿电池“无忧无碌，就选双鹿”视频/电池2.jpg'), alt: '双鹿电池剧照 2' },
      { src: fileUrl('content/脚本、视频作品/双鹿电池“无忧无碌，就选双鹿”视频/电池3.jpg'), alt: '双鹿电池剧照 3' }
    ],
    links: [{ label: '新片场', href: 'https://www.xinpianchang.com/a13335480' }],
    status: 'published'
  },
  {
    slug: 'jingtian-record-love',
    title: 'Jingtian: Record love, accompany forward',
    subtitle: '景田：记录热爱，陪伴前行',
    year: '2024',
    category: '广告片',
    role: placeholderRole,
    summary: placeholderSummary,
    keywords: ['Passion', 'Companion', 'Campaign'],
    cover: fileUrl('content/脚本、视频作品/景田“记录热爱，陪伴前行”视频/景田封面.JPG'),
    media: createMedia(
      'video.jingtian-record-love',
      'content/脚本、视频作品/景田“记录热爱，陪伴前行”视频/景田，记录热爱，陪伴前行.mp4',
      'content/脚本、视频作品/景田“记录热爱，陪伴前行”视频/景田封面.JPG',
      'https://www.xinpianchang.com/a13335644?from=UserProfile'
    ),
    gallery: [
      { src: fileUrl('content/脚本、视频作品/景田“记录热爱，陪伴前行”视频/jt 1.png'), alt: '景田剧照 1' },
      { src: fileUrl('content/脚本、视频作品/景田“记录热爱，陪伴前行”视频/jt 2.png'), alt: '景田剧照 2' },
      { src: fileUrl('content/脚本、视频作品/景田“记录热爱，陪伴前行”视频/jt 3.png'), alt: '景田剧照 3' }
    ],
    links: [{ label: '新片场', href: 'https://www.xinpianchang.com/a13335644?from=UserProfile' }],
    status: 'published'
  },
  {
    slug: 'bishengyuan-evergreen',
    title: 'Bishengyuan: Always drink evergreen, live evergreen',
    subtitle: '碧生源：常饮常菁，身材常青',
    year: '2022',
    category: '广告片',
    role: placeholderRole,
    summary: placeholderSummary,
    keywords: ['Tea', 'Wellness', 'Lifestyle'],
    cover: fileUrl('content/脚本、视频作品/碧生源“常饮常菁，身材常青”视频/碧生源封面.png'),
    media: createMedia(
      'video.bishengyuan-evergreen',
      'content/脚本、视频作品/碧生源“常饮常菁，身材常青”视频/1、碧生源广告.mp4',
      'content/脚本、视频作品/碧生源“常饮常菁，身材常青”视频/碧生源封面.png',
      'https://www.xinpianchang.com/a13335612?from=UserProfile'
    ),
    gallery: [
      { src: fileUrl('content/脚本、视频作品/碧生源“常饮常菁，身材常青”视频/bsy1.png'), alt: '碧生源剧照 1' },
      { src: fileUrl('content/脚本、视频作品/碧生源“常饮常菁，身材常青”视频/bsy2.png'), alt: '碧生源剧照 2' },
      { src: fileUrl('content/脚本、视频作品/碧生源“常饮常菁，身材常青”视频/bsy3.png'), alt: '碧生源剧照 3' }
    ],
    links: [{ label: '新片场', href: 'https://www.xinpianchang.com/a13335612?from=UserProfile' }],
    status: 'published'
  },
  {
    slug: 'yinlu-soymilk',
    title: 'Yinlu plant broken wall soy milk',
    subtitle: '银鹭植物：破壁生活，ai在自然',
    year: '2024',
    category: '广告片',
    role: placeholderRole,
    summary: placeholderSummary,
    keywords: ['AI', 'Nature', 'Soymilk'],
    cover: fileUrl('content/脚本、视频作品/银鹭植物“破壁生活，ai在自然”视频/破壁豆奶封面.png'),
    media: createMedia(
      'video.yinlu-soymilk',
      'content/脚本、视频作品/银鹭植物“破壁生活，ai在自然”视频/银鹭植物破壁豆奶.mp4',
      'content/脚本、视频作品/银鹭植物“破壁生活，ai在自然”视频/破壁豆奶封面.png',
      'https://www.xinpianchang.com/a13335637?from=UserProfile'
    ),
    gallery: [
      { src: fileUrl('content/脚本、视频作品/银鹭植物“破壁生活，ai在自然”视频/dounai 1.png'), alt: '银鹭植物剧照 1' },
      { src: fileUrl('content/脚本、视频作品/银鹭植物“破壁生活，ai在自然”视频/dounai 2.png'), alt: '银鹭植物剧照 2' },
      { src: fileUrl('content/脚本、视频作品/银鹭植物“破壁生活，ai在自然”视频/dounai 3.png'), alt: '银鹭植物剧照 3' }
    ],
    links: [{ label: '新片场', href: 'https://www.xinpianchang.com/a13335637?from=UserProfile' }],
    status: 'published'
  },
  {
    slug: 'anti-fraud-within-fraud',
    title: 'Anti-Fraud Promotional Video',
    subtitle: '防诈骗：诈中“诈”',
    year: '2023',
    category: '宣传片',
    role: placeholderRole,
    summary: placeholderSummary,
    keywords: ['Awareness', 'Campaign', 'Fraud'],
    cover: fileUrl('content/脚本、视频作品/防诈骗“诈中‘诈’”视频/诈中诈封面.png'),
    media: createMedia(
      'video.anti-fraud-within-fraud',
      'content/脚本、视频作品/防诈骗“诈中‘诈’”视频/防诈骗 诈中“诈”.mp4',
      'content/脚本、视频作品/防诈骗“诈中‘诈’”视频/诈中诈封面.png',
      'https://www.xinpianchang.com/a13335631?token=1jBNl02NAKxP3L01a814oraR&from=UserProfile'
    ),
    gallery: [
      { src: fileUrl('content/脚本、视频作品/防诈骗“诈中‘诈’”视频/诈骗1.png'), alt: '反诈剧照 1' },
      { src: fileUrl('content/脚本、视频作品/防诈骗“诈中‘诈’”视频/诈骗2.png'), alt: '反诈剧照 2' },
      { src: fileUrl('content/脚本、视频作品/防诈骗“诈中‘诈’”视频/诈骗3.png'), alt: '反诈剧照 3' }
    ],
    links: [{ label: '新片场', href: 'https://www.xinpianchang.com/a13335631?token=1jBNl02NAKxP3L01a814oraR&from=UserProfile' }],
    status: 'published'
  },
  {
    slug: 'fantasia-of-fish',
    title: 'Fantasia of Fish',
    subtitle: '鱼的幻想曲',
    year: '2023',
    category: '创作片',
    role: placeholderRole,
    summary: placeholderSummary,
    keywords: ['Fantasy', 'Experimental', 'Fish'],
    cover: fileUrl('content/脚本、视频作品/鱼的幻想曲视频/鱼的幻想曲封面.JPG'),
    media: createMedia(
      'video.fantasia-of-fish',
      'content/脚本、视频作品/鱼的幻想曲视频/鱼的幻想曲.mp4',
      'content/脚本、视频作品/鱼的幻想曲视频/鱼的幻想曲封面.JPG',
      'https://www.xinpianchang.com/a13335606?from=UserProfile'
    ),
    gallery: [
      { src: fileUrl('content/脚本、视频作品/鱼的幻想曲视频/fish 1.png'), alt: '鱼的幻想曲剧照 1' },
      { src: fileUrl('content/脚本、视频作品/鱼的幻想曲视频/fish 2.png'), alt: '鱼的幻想曲剧照 2' },
      { src: fileUrl('content/脚本、视频作品/鱼的幻想曲视频/fish 3.png'), alt: '鱼的幻想曲剧照 3' }
    ],
    links: [{ label: '新片场', href: 'https://www.xinpianchang.com/a13335606?from=UserProfile' }],
    status: 'published'
  },
  {
    slug: 'jook-sing-noodles',
    title: 'Jook-sing noodles',
    subtitle: '舌尖美食：竹升面',
    year: '2022',
    category: 'Video Work',
    role: placeholderRole,
    summary: placeholderSummary,
    keywords: ['Food', 'Craft', 'Documentary'],
    cover: fileUrl('content/脚本、视频作品/舌尖美食-竹升面/竹升面封面.png'),
    media: createMedia(
      'video.jook-sing-noodles',
      'content/脚本、视频作品/舌尖美食+竹升面Jook-sing noodles.mp4',
      'content/脚本、视频作品/舌尖美食-竹升面/竹升面封面.png'
    ),
    gallery: [
      { src: fileUrl('content/脚本、视频作品/舌尖美食-竹升面/noodle1.png'), alt: '竹升面剧照 1' },
      { src: fileUrl('content/脚本、视频作品/舌尖美食-竹升面/noodle2.png'), alt: '竹升面剧照 2' },
      { src: fileUrl('content/脚本、视频作品/舌尖美食-竹升面/noodle3.png'), alt: '竹升面剧照 3' }
    ],
    links: [{ label: '新片场', href: 'https://www.xinpianchang.com/a13714039?from=webShare&channel=copyLink' }],
    status: 'published'
  }
];
