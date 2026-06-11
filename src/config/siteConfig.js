/**
 * 常用可调参数
 * - 首页 2.5D / 3D 沉浸场景：homeScene / heroOrbitCards
 * - 图片页非人像单张式 3D 环形画廊：motion.imageRing*
 * - 视频页 hover 预览：motion.videoPreview*
 * - 全站磁性悬停强度：motion.magnetic*
 *
 * 这些参数只影响交互与位置，不改变数据内容。
 */
export const siteConfig = {
  homeScene: {
    // 首页 sticky 区域总高度，控制第一屏滚动叙事长度
    stickyHeight: '158vh',
    // 背景层从初始到滚动结尾的缩放范围
    backgroundScaleStart: 1,
    backgroundScaleEnd: 1.2,
    // 背景颗粒、暗角和暖光强度
    grainOpacity: 0.1,
    vignetteOpacity: 0.34,
    glowOpacity: 0.2,
    // 鼠标视差灵敏度与最大旋转角度
    mouseSensitivityX: 18,
    mouseSensitivityY: 12,
    maxRotateX: 5.5,
    maxRotateY: 8,
    // 滚动时镜头推进和文案位移
    titleShiftY: -76,
    subheadShiftY: -44,
    copyShiftY: -36,
    englishFadeStart: 0.06,
    englishFadeEnd: 0.62,
    // 中央人物景深和透明度控制
    figureScaleEnd: 1.14,
    figureDepth: 40,
    figureOpacity: 0.84,
    figureLineOpacity: 0.92,
    // 首页卡片 hover 放大比例和滚动时分离距离
    cardHoverScale: 1.06,
    cardSpreadX: 42,
    cardSpreadY: 26
  },
  heroOrbitCards: [
    {
      top: '8%',
      left: '8%',
      width: 'min(250px, 26vw)',
      zIndex: 2,
      transform: 'rotateY(8deg) rotateX(-2deg) rotateZ(-1.5deg)',
      parallaxX: -26,
      parallaxY: -24,
      depth: 0.88,
      spreadX: -42,
      spreadY: -18
    },
    {
      top: '12%',
      left: '68%',
      width: 'min(272px, 29vw)',
      zIndex: 5,
      transform: 'translateZ(24px) rotateY(-7deg) rotateX(1deg) rotateZ(1deg)',
      parallaxX: 30,
      parallaxY: -28,
      depth: 1.08,
      spreadX: 44,
      spreadY: -14
    },
    {
      top: '58%',
      left: '70%',
      width: 'min(270px, 29vw)',
      zIndex: 4,
      transform: 'rotateY(-8deg) rotateX(2deg) rotateZ(0.6deg)',
      parallaxX: 26,
      parallaxY: 8,
      depth: 0.98,
      spreadX: 40,
      spreadY: 12
    },
    {
      top: '56%',
      left: '2%',
      width: 'min(264px, 28vw)',
      zIndex: 1,
      transform: 'rotateY(7deg) rotateX(-1deg) rotateZ(-1deg)',
      parallaxX: -22,
      parallaxY: 6,
      depth: 0.82,
      spreadX: -36,
      spreadY: 8
    },
    {
      top: '30%',
      left: '60%',
      width: 'min(292px, 31vw)',
      zIndex: 6,
      transform: 'translateZ(18px) rotateY(-3deg) rotateX(-1deg)',
      parallaxX: 14,
      parallaxY: -10,
      depth: 1.12,
      spreadX: 26,
      spreadY: -6
    },
    {
      top: '78%',
      left: '36%',
      width: 'min(250px, 27vw)',
      zIndex: 3,
      transform: 'rotateY(-4deg) rotateX(2deg) rotateZ(0.8deg)',
      parallaxX: -8,
      parallaxY: 12,
      depth: 0.92,
      spreadX: -8,
      spreadY: 16
    }
  ],
  motion: {
    // 首页右侧入口 hover 放大比例
    heroCardHoverScale: 1.06,
    // 首页 hover 当前入口时其它入口的透明度
    heroCardDimOpacity: 0.74,
    // 视频列表 hover 预览时长（秒）
    videoPreviewDuration: 3,
    // 视频列表 hover 放大比例
    videoPreviewHoverScale: 1.045,
    // 非人像图片 3D 单张式环形画廊参数：
    // radiusDesktop / radiusMobile 控制环形半径
    // spacing 控制相邻图片之间的视觉间距
    // dragSensitivity 控制鼠标或触摸拖拽时旋转灵敏度
    // inertiaFriction 控制松手后惯性减速速度
    // snapStrength 控制松手后回吸到最近一张的力度
    // maxTiltX 控制上下可倾斜的最大角度
    // scale / opacity / brightness / blur 共同控制前后景深效果
    imageRingRadiusDesktop: 436,
    imageRingRadiusMobile: 216,
    imageRingSpacing: 1,
    imageRingDragSensitivity: 0.0036,
    imageRingInertiaFriction: 0.92,
    imageRingSnapStrength: 0.1,
    imageRingMaxTiltX: 8,
    imageRingDepthScaleNear: 1.08,
    imageRingDepthScaleFar: 0.58,
    imageRingOpacityNear: 1,
    imageRingOpacityFar: 0.12,
    imageRingBrightnessNear: 1.06,
    imageRingBrightnessFar: 0.48,
    imageRingBlurNear: 0,
    imageRingBlurFar: 2.2,
    imageRingHoverScale: 1.03,
    imageRingBaseWidthDesktop: 360,
    imageRingBaseWidthMobile: 250,
    magneticPerspective: 1200,
    magneticRotate: 8,
    magneticLift: 4
  }
};
