/**
 * 常用可调参数
 * - 首页右侧 hero 卡片位置：heroOrbitCards
 * - 首页 sticky hero 滚动叙事：heroSticky*
 * - 图片页非人像 3D 球形画廊：motion.imageSphere*
 * - 视频页 hover 预览：motion.videoPreview*
 * - 全站磁性悬停强度：motion.magnetic*
 *
 * 这些参数只影响交互与位置，不改变数据内容。
 */
export const siteConfig = {
  heroSticky: {
    // 首页 sticky 区域总高度，控制第一屏滚动叙事长度
    sectionMinHeight: '152vh',
    // 背景层的整体缩放范围
    backgroundScaleStart: 1,
    backgroundScaleEnd: 1.22,
    // 主标题向上移动距离
    titleShiftY: -72,
    // 英文信息淡出速度
    englishFadeStart: 0.08,
    englishFadeEnd: 0.72,
    // 左侧文案整体位移距离
    copyShiftY: -28
  },
  heroOrbitCards: [
    {
      top: '4%',
      left: '9%',
      width: 'min(292px, 32vw)',
      zIndex: 2,
      transform: 'rotateY(9deg) rotateX(-2deg)',
      parallaxX: -28,
      parallaxY: -36,
      depth: 0.92
    },
    {
      top: '17%',
      left: '54%',
      width: 'min(322px, 36vw)',
      zIndex: 3,
      transform: 'translateZ(18px) rotateY(-6deg) rotateX(2deg)',
      parallaxX: 18,
      parallaxY: -54,
      depth: 1.08
    },
    {
      top: '64%',
      left: '57%',
      width: 'min(304px, 34vw)',
      zIndex: 4,
      transform: 'rotateY(-7deg) rotateX(2deg)',
      parallaxX: 26,
      parallaxY: -18,
      depth: 1.04
    },
    {
      top: '54%',
      left: '13%',
      width: 'min(286px, 32vw)',
      zIndex: 1,
      transform: 'rotateY(7deg) rotateX(-1deg)',
      parallaxX: -24,
      parallaxY: -12,
      depth: 0.88
    },
    {
      top: '37%',
      left: '33%',
      width: 'min(304px, 34vw)',
      zIndex: 5,
      transform: 'translateZ(12px) rotateY(4deg) rotateX(-1deg)',
      parallaxX: 0,
      parallaxY: -32,
      depth: 1.12
    },
    {
      top: '82%',
      left: '38%',
      width: 'min(260px, 29vw)',
      zIndex: 3,
      transform: 'rotateY(-5deg) rotateX(2deg)',
      parallaxX: -8,
      parallaxY: 12,
      depth: 0.98
    }
  ],
  motion: {
    // 首页右侧卡片 hover 放大比例
    heroCardHoverScale: 1.06,
    // 首页卡片 hover 时其它卡片的透明度
    heroCardDimOpacity: 0.78,
    // 视频列表 hover 预览时长（秒）
    videoPreviewDuration: 3,
    // 视频列表 hover 放大比例
    videoPreviewHoverScale: 1.045,
    // 非人像图片 3D 球形画廊参数：
    // radiusDesktop / radiusMobile 控制球体或浅球半径
    // dragSensitivity 控制鼠标或触摸拖拽时旋转灵敏度
    // inertiaFriction 控制松手后惯性减速速度
    // maxTiltX 控制上下可倾斜的最大角度
    // scale / opacity / brightness / blur 共同控制前后景深效果
    imageSphereRadiusDesktop: 388,
    imageSphereRadiusMobile: 228,
    imageSphereDragSensitivity: 0.45,
    imageSphereInertiaFriction: 0.952,
    imageSphereMaxTiltX: 22,
    imageSphereDepthScaleNear: 1.12,
    imageSphereDepthScaleFar: 0.3,
    imageSphereOpacityNear: 1,
    imageSphereOpacityFar: 0.08,
    imageSphereBrightnessNear: 1.08,
    imageSphereBrightnessFar: 0.36,
    imageSphereBlurNear: 0,
    imageSphereBlurFar: 2.8,
    imageSphereHoverScale: 1.05,
    imageSphereBaseWidthDesktop: 196,
    imageSphereBaseWidthMobile: 146,
    magneticPerspective: 1200,
    magneticRotate: 8,
    magneticLift: 4
  }
};
