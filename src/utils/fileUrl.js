/**
 * 资源路径工具
 * - fileUrl(): 网站内部可直接访问的相对路径
 * - folderUrl(): 仅本地 server.js 支持的目录浏览入口
 *
 * 如果以后部署版不再使用本地目录浏览，请只改调用处，不要把绝对路径写回这里。
 */
const encodePath = (value) =>
  `/${value
    .split('/')
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join('/')}`;

export const fileUrl = (value) => encodePath(value);

export const folderUrl = (value) => `/files/${value.split('/').map((segment) => encodeURIComponent(segment)).join('/')}/`;
