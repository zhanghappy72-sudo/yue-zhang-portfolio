/**
 * 常用可调参数
 * - 首页右侧 hero 卡片位置：heroOrbitCards
 * - 图片页横向画廊速度 / 阻尼：motion.imageGallery*
 * - 全站磁性悬停强度：motion.magnetic*
 *
 * 这些参数只影响交互与位置，不改变数据内容。
 * 如果你想“改动页面手感但不改内容”，优先来这个文件。
 */
export const siteConfig = {
  /**
   * 首页 Hero 右侧 6 张浮动卡片的位置参数
   * - top / left：控制卡片在右侧区域里的坐标
   * - width：控制卡片宽度
   * - zIndex：控制前后遮挡层级
   * - transform：控制初始轻微倾斜角度
   */
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
     * Image 非人像滚轴
     * - lerp：越小越稳、越慢；越大越跟手
     * - wheelMultiplier：鼠标滚轮推进速度
     * - dragMultiplier：鼠标拖拽推动速度
     */
    imageGalleryLerp: 0.09,
    imageGalleryWheelMultiplier: 0.8,
    imageGalleryDragMultiplier: 1.3,

    /**
     * 全站磁性悬停效果
     * - perspective：景深距离
     * - rotate：最大旋转角度
     * - lift：悬停时向上抬起的像素值
     */
    magneticPerspective: 1200,
    magneticRotate: 8,
    magneticLift: 4
  }
};
