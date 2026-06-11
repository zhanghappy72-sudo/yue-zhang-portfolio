/**
 * 常用可调参数
 * - 首页右侧 hero 卡片位置：heroOrbitCards
 * - Image 非人像 gradient slider 参数：motion.imageSlider*
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
    /**
     * Image 非人像 gradient slider
     * - friction: 惯性衰减速度，越接近 1 越滑
     * - wheelSensitivity: 鼠标滚轮对水平速度的影响
     * - dragSensitivity: 松手后拖拽速度转换成惯性的倍率
     * - maxRotation: 卡片左右旋转最大角度
     * - maxDepth: 卡片向后退入空间的最大深度
     * - minScale / scaleRange: 远景最小尺寸与前后景尺寸差
     * - gap: 相邻卡片的水平步长
     * - blurStrength: 后景卡片的最大模糊强度
     * - bgLightnessBias / bgSaturationBias: canvas 渐变明度与饱和度偏置
     */
    imageSliderFriction: 0.92,
    imageSliderWheelSensitivity: 0.95,
    imageSliderDragSensitivity: 0.92,
    imageSliderMaxRotation: 34,
    imageSliderMaxDepth: 460,
    imageSliderMinScale: 0.58,
    imageSliderScaleRange: 0.5,
    imageSliderGap: 0.88,
    imageSliderBlurStrength: 7.5,
    imageSliderBgLightnessBias: 1.02,
    imageSliderBgSaturationBias: 0.82,

    /**
     * 站内通用磁性 hover
     * - perspective: 鼠标悬停时卡片景深
     * - rotate: 最大倾斜角度
     * - lift: 最大上浮距离
     */
    magneticPerspective: 1200,
    magneticRotate: 8,
    magneticLift: 4
  }
};
