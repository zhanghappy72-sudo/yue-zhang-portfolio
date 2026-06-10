/**
 * Contact 区只展示当前 visible 的链接
 * - 简历 PDF 路径在这里改
 * - 邮箱在 src/data/siteMeta.js
 */
import { fileUrl } from '../utils/fileUrl.js';

export const contactLinks = [
  {
    label: 'Resume / 简历',
    href: fileUrl('content/张悦-简历 VR.pdf'),
    type: 'document',
    visible: true
  }
];
