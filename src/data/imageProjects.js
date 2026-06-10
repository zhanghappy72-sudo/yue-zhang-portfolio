/**
 * 图片作品数据
 * - 非人像图片列表：nonPortraitImages
 * - 人像分组：portraitGroups
 * - 新增图片、调整分组，优先改这里
 * - 图片页 3D / 无限滚动效果在 src/pages/image.js 和 src/main.js
 */
import { fileUrl } from '../utils/fileUrl.js';

const nonPortraitFiles = [
  '图片1.jpg',
  '图片2.jpg',
  '图片3.jpg',
  '图片4.jpg',
  '图片9.jpg',
  '图片10.JPG',
  '图片11.JPG',
  '图片12.JPG',
  '图片13.JPG',
  '图片14.jpg',
  '图片15.jpg',
  '图片16.jpg',
  '图片17.jpg',
  '图片18.jpg',
  '图片19.jpg',
  '图片20.jpg',
  '图片21.jpg',
  '图片22.jpg',
  '图片23.jpg',
  '图片24.jpg',
  '图片25.jpg',
  '图片26.jpg',
  '图片27.jpg',
  '图片28.jpg',
  '图片29.jpg',
  '图片30.jpg',
  '图片31.jpg',
  '图片32.jpg',
  '图片33.jpg'
];

const makePortraitGroup = (group, files) => ({
  slug: `portrait-group-${group}`,
  title: `Portrait Group ${group}`,
  label: `人像 ${group}`,
  images: files.map((file, index) => ({
    src: fileUrl(`content/图片作品/人像/${group}/${file}`),
    alt: `人像 ${group} - ${index + 1}`
  }))
});

export const imageProjects = {
  nonPortraitImages: nonPortraitFiles.map((file, index) => ({
    src: fileUrl(`content/图片作品/${file}`),
    alt: `图片作品 ${index + 1}`
  })),
  portraitGroups: [
    makePortraitGroup('1', [
      '张悦 (1).jpg',
      '张悦 (2).jpg',
      '张悦 (3).jpg',
      '张悦 (4).jpg',
      '张悦 (5).jpg',
      '张悦 (6).jpg',
      '张悦 (7).jpg',
      '张悦 (8).jpg',
      '张悦 (9).jpg',
      '张悦 (10).jpg',
      '张悦 (11).jpg'
    ]),
    makePortraitGroup('2', ['张悦 (1).jpg', '张悦 (2).jpg', '张悦 (3).jpg', '张悦 (4).jpg', '张悦 (5).jpg']),
    makePortraitGroup('3', ['张悦 (1).jpg', '张悦 (2).jpg', '张悦 (3).jpg', '张悦 (4).jpg']),
    makePortraitGroup('4', ['4.jpg', '4.1.jpg', '4.2.jpg', '4.3.jpg', '4.4.jpg', '4.5.jpg', '4.6.jpg', '4.7.jpg']),
    makePortraitGroup('5', ['555.jpg', '5.1.jpg', '5.2.jpg', '5.3.jpg', '5.4.jpg', '5.5.jpg', '5.6.jpg']),
    makePortraitGroup('6', ['6.1.jpg', '6.2.jpg', '6.3.jpg']),
    makePortraitGroup('7', ['7.1.jpg', '7.2.jpg', '7.3.jpg'])
  ]
};
