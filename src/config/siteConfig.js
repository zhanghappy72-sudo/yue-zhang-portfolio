/**
 * 常用可调参数
 * - 首页右侧 hero 卡片位置：heroOrbitCards
 * - 图片页横向画廊速度 / 阻尼：motion.imageGallery*
 * - 全站磁性悬停强度：motion.magnetic*
 *
 * 这些参数只影响交互与位置，不改变数据内容。
 */
export const siteConfig = {
  heroOrbitCards: [
    {
      top: '4%',
      left: '9%',
      width: 'min(292px, 32vw)',
      zIndex: 2,
      transform: 'rotateY(9deg) rotateX(-2deg)'
    },
    {
      top: '17%',
      left: '54%',
      width: 'min(322px, 36vw)',
      zIndex: 3,
      transform: 'translateZ(18px) rotateY(-6deg) rotateX(2deg)'
    },
    {
      top: '64%',
      left: '57%',
      width: 'min(304px, 34vw)',
      zIndex: 4,
      transform: 'rotateY(-7deg) rotateX(2deg)'
    },
    {
      top: '54%',
      left: '13%',
      width: 'min(286px, 32vw)',
      zIndex: 1,
      transform: 'rotateY(7deg) rotateX(-1deg)'
    },
    {
      top: '37%',
      left: '33%',
      width: 'min(304px, 34vw)',
      zIndex: 5,
      transform: 'translateZ(12px) rotateY(4deg) rotateX(-1deg)'
    },
    {
      top: '82%',
      left: '38%',
      width: 'min(260px, 29vw)',
      zIndex: 3,
      transform: 'rotateY(-5deg) rotateX(2deg)'
    }
  ],
  motion: {
    imageGalleryLerp: 0.09,
    imageGalleryWheelMultiplier: 0.8,
    imageGalleryDragMultiplier: 1.3,
    magneticPerspective: 1200,
    magneticRotate: 8,
    magneticLift: 4
  }
};
