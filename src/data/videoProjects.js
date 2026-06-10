/**
 * 视频展示层数据
 * - 详情页字段整合在这里输出给页面
 * - 如果想统一给所有视频推导工具标签或默认字段，就改这里
 */
import { videoProjectSource } from './videoProjectSource.js';

const inferTools = (category) => {
  if (category.includes('广告') || category.includes('宣传') || category.includes('品牌')) {
    return ['策划', '拍摄', '剪辑', '品牌叙事'];
  }

  return ['策划', '拍摄', '剪辑'];
};

export const videoProjects = videoProjectSource.map((item) => ({
  ...item,
  cover: item.cover || item.media.poster || '',
  tools: inferTools(item.category),
  keywords: item.keywords || []
}));
