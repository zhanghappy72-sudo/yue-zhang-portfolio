# 张悦个人作品集源码说明

这是张悦（Yue Zhang）的个人作品集网站源码。  
当前版本保留了现有网页视觉、排版、交互与内容结构，同时补齐了本地编辑、GitHub 上传、Vercel 部署前需要的工程整理。

## 1. 项目结构

项目根目录主要包含：

- `index.html`
  - 站点入口 HTML
- `server.js`
  - 本地预览服务
- `src/`
  - 所有页面、组件、样式、数据、运行逻辑
- `assets/`
  - 站点直接使用的小型资源，例如头像、视频封面图
- `content/`
  - 正式内容素材目录，包含图片、简历、视频相关封面与剧照、VR 资料等
- `format/`
  - 参考资料，不参与正式部署构建
- `scripts/build.mjs`
  - 构建 `dist` 的脚本
- `vercel.json`
  - Vercel 的 SPA rewrite 配置

## 2. 如何在 VS Code 打开

1. 打开 VS Code
2. 选择 `File -> Open Folder`
3. 打开当前项目根目录 `Portfolio website`

## 3. 安装依赖

当前项目没有额外 npm 依赖，但仍建议先执行一次：

```bash
npm install
```

这样会生成 `package-lock.json`，便于后续上传 GitHub。

## 4. 本地预览

### 预览当前“本地完整版”

```bash
npm start
```

或开发模式：

```bash
npm run dev
```

打开：

```text
http://127.0.0.1:4173
```

### 预览构建后的部署版本

```bash
npm run build
npm run preview:dist
```

## 5. 以后最常修改哪些文件

### 首页文字和右侧浮动卡片

- `src/pages/home.js`
  - 首页 hero 文案
  - 首页 About 预览文案
- `src/data/homeHighlights.js`
  - 首页右侧卡片内容顺序、标题、链接
- `src/config/siteConfig.js`
  - 首页右侧卡片位置

### About 页面

- `src/pages/about.js`
  - About 文案、教育背景、技能、数字
- `src/data/siteMeta.js`
  - 名字、英文名、邮箱、首页主副标题

### Video 视频作品

- `src/data/videoProjectSource.js`
  - 每个视频项目的标题、年份、角色、简介、封面、剧照、外链
- `src/data/videoProjects.js`
  - 视频展示层数据整合
- `src/pages/video.js`
  - 视频列表页、详情页结构

### Image 图片作品

- `src/data/imageProjects.js`
  - 非人像图片、人像分组
- `src/pages/image.js`
  - 图片页结构
- `src/main.js`
  - 非人像长廊的惯性 / 无限滚动逻辑

### VR 项目

- `src/data/vrProjects.js`
  - VR 项目详情、trailer、ending、蓝图、资产、下载区
- `src/pages/vr.js`
  - VR 列表页和详情页结构
- `src/config/mediaManifest.js`
  - VR 大视频、ZIP、EXE 的部署外链

### Posts 推文

- `src/data/postProjects.js`
  - 推文标题、封面、摘要、微信链接
- `src/pages/posts.js`
  - 推文卡片展示结构

### Contact 联系方式

- `src/data/siteMeta.js`
  - 邮箱
- `src/data/contactLinks.js`
  - 简历 PDF 路径

## 6. 如何修改颜色、字体、圆角、阴影、间距、动画速度

### 颜色 / 圆角 / 阴影 / 版心宽度

- `src/styles/tokens.css`

例如：

- `--bg`：主背景色
- `--ink`：主文字色
- `--radius-lg`：大卡片圆角
- `--shadow`：卡片阴影
- `--content-width`：页面最大宽度

### 页面排版 / 卡片位置 / 间距 / 页面级动画样式

- `src/styles/base.css`

### 首页右侧 hero 卡片位置

- `src/config/siteConfig.js`
  - `heroOrbitCards`

### 图片页 / hover / 磁性效果 / 画廊速度

- `src/config/siteConfig.js`
  - `motion.imageGalleryLerp`
  - `motion.imageGalleryWheelMultiplier`
  - `motion.imageGalleryDragMultiplier`
  - `motion.magneticPerspective`
  - `motion.magneticRotate`
  - `motion.magneticLift`

## 7. 如何新增内容

### 新增视频作品

1. 把封面、剧照放到 `content/脚本、视频作品/项目文件夹`
2. 如果是本地完整版需要的视频文件，也放在对应目录
3. 在 `src/data/videoProjectSource.js` 新增一条项目对象
4. 如果视频太大，不适合 GitHub / Vercel：
   - 保留本地文件
   - 把部署版外链填到 `src/config/mediaManifest.js`

### 新增图片作品

1. 非人像图片：
   - 放进 `content/图片作品/`
   - 在 `src/data/imageProjects.js` 的 `nonPortraitFiles` 里追加文件名
2. 人像图片：
   - 放进 `content/图片作品/人像/组号/`
   - 在 `src/data/imageProjects.js` 对应分组追加文件名

### 新增推文

1. 把封面图放进 `content/推文/`
2. 在 `src/data/postProjects.js` 新增一条对象
3. 补充：
   - `title`
   - `cover`
   - `summary`
   - `link`

### 修改 VR 项目素材

- 主数据文件：`src/data/vrProjects.js`
- 超大资源部署外链：`src/config/mediaManifest.js`

常改项：

- Trailer
- Ending 视频
- Storyboard
- Blueprint
- Assets
- ZIP / EXE 下载链接

## 8. 如何替换简历 PDF

1. 用新的 PDF 替换：

```text
content/张悦-简历 VR.pdf
```

或新增一个新的 PDF 文件

2. 然后在：

```text
src/data/contactLinks.js
```

里修改 `href`

## 9. 超大媒体外链配置

部署版为了适配 GitHub 和 Vercel，超大媒体不再依赖仓库内本地大文件，而是走：

- `src/config/mediaManifest.js`

这里集中维护：

- 大视频外链
- VR trailer 外链
- VR ZIP 下载外链
- EXE 下载外链
- 本地专用资源标记

如果某条外链还没填：

- 本地完整版仍可用
- 部署版会降级成“外部链接待补充”按钮或占位

## 9.1 后续怎么加入这几个大文件

这是你后面最常用的工作流。

### 情况 A：你只是想本地继续用这些大文件

直接把文件放在原来的 `content/` 路径里即可，例如：

- `content/脚本、视频作品/找春天视频/找春天.mp4`
- `content/牡丹亭/Package-Dreaming The Peony Pavilion.zip`

本地完整版预览时会继续直接读取这些文件，不需要改部署配置。

### 情况 B：你想让 GitHub / Vercel 部署版也能访问这些大文件

不要把这些大文件直接提交到 GitHub 常规仓库。正确做法是：

1. 先把大文件上传到外部存储
   - SharePoint / OneDrive
   - 阿里云 OSS
   - 腾讯云 COS
   - Cloudflare R2
   - 你自己的 CDN / 网盘直链
2. 拿到公开可访问的分享链接或直链
3. 打开：

```text
src/config/mediaManifest.js
```

4. 把对应条目的 `deployUrl` 填进去

### 你当前还缺的 3 个外链

```js
'video.jook-sing-noodles'
'vr.download.zip'
'vr.download.exe'
```

现在已补齐其中 2 个：

- `video.jook-sing-noodles`
  - 新片场链接已接入
- `vr.download.zip`
  - 百度网盘链接已接入
  - 提取码：`s84v`

当前仍未补的是：

- `vr.download.exe`

### 示例 1：给“竹升面”视频补线上链接

把：

```js
'video.jook-sing-noodles': {
  mode: 'external-link',
  deployUrl: '',
  label: '外部视频链接待补充 / Link to be added'
}
```

改成：

```js
'video.jook-sing-noodles': {
  mode: 'external-link',
  deployUrl: 'https://your-video-host.example.com/jook-sing-noodles',
  label: '外部观看 / Watch Externally'
}
```

### 示例 2：给 VR ZIP 补下载链接

把：

```js
'vr.download.zip': {
  mode: 'external-link',
  deployUrl: '',
  label: 'VR ZIP 链接待补充 / ZIP link to be added'
}
```

改成：

```js
'vr.download.zip': {
  mode: 'external-link',
  deployUrl: 'https://your-storage.example.com/Package-Dreaming-The-Peony-Pavilion.zip',
  label: 'Download VR Build'
}
```

### 示例 3：给 VR EXE 补链接

如果你想给用户一个单独 EXE 下载页或直链，就改：

```js
'vr.download.exe': {
  mode: 'external-link',
  deployUrl: 'https://your-storage.example.com/VRstudy.exe',
  label: 'Direct EXE'
}
```

如果你没有单独的 EXE 外链，也可以先留空，网站会自动显示为待补充状态。

### 改完之后做什么

每次补完大文件外链后，执行：

```bash
npm run build
```

然后检查：

```text
dist/build-report.json
```

如果 `missingExternalMedia` 里已经没有对应项，就说明部署版已经能识别这条外链了。

## 10. 构建项目

```bash
npm run build
```

构建完成后会生成：

```text
dist/
```

构建逻辑：

- 复制 `index.html / src / assets`
- 复制 `content` 中适合部署的小资源
- 自动排除大视频 / ZIP / EXE / 本地 VR 打包目录
- 生成 `dist/build-report.json`

## 11. 如何部署到 Vercel

### Vercel 推荐配置

- Build Command:

```bash
npm run build
```

- Output Directory:

```text
dist
```

### 路由说明

项目是 SPA，已经提供：

- `vercel.json`

用于把多页面路由重写回 `index.html`

## 12. GitHub 上传前注意事项

### 不应该上传的内容

- `node_modules`
- `.DS_Store`
- `dist`
- `.vercel`
- 本地完整版大视频
- VR 打包目录 / ZIP / EXE

### 上传前建议检查

1. 先执行：

```bash
npm run build
```

2. 再查看：

```text
dist/build-report.json
```

3. 确认没有把超大文件加入 Git 暂存区

## 13. GitHub 与 Vercel 最终配置

### GitHub

仓库建议：

- Repository name: `yue-zhang-portfolio`
- Visibility: `public`

如果你已经在 GitHub 网页创建好空仓库，本地推送流程是：

```bash
git init
git add .
git commit -m "chore: prepare deployable portfolio source"
git branch -M main
git remote add origin <你的 GitHub 仓库地址>
git push -u origin main
```

### Vercel

导入 GitHub 仓库后使用：

- Framework Preset: `Other`
- Build Command: `npm run build`
- Output Directory: `dist`

如果部署后路由刷新正常，说明：

- `vercel.json` 的 rewrite 已生效
- 当前 SPA 配置可用

`.gitignore` 已经排除了：

- `node_modules`
- `dist`
- `.vercel`
- `.DS_Store`
- Office 临时文件
- 本地完整版超大视频
- VR ZIP / EXE / Windows 打包目录

### 需要注意

GitHub 常规仓库不适合存放：

- 超过 `100 MiB` 的单文件
- 体积巨大的本地视频素材
- `2.5G` 的 VR ZIP

因此当前推荐方式是：

- GitHub 仓库只上传源码、小型图片、封面、PDF、样式、数据、构建脚本、README
- 大视频与 VR 交付物走 `src/config/mediaManifest.js` 里的外部链接

## 13. 当前结论

### 现在可以做什么

- 可以在 VS Code 里直接继续改
- 可以本地完整预览
- 可以构建 `dist`
- 可以把项目整理成适合上传 GitHub 的源码版本
- 可以准备 Vercel 部署结构

### 仍需你补充的内容

如果你希望线上版本也完整播放 / 下载所有大媒体，需要继续补这些外链：

- 超大视频的线上观看地址
- `VR ZIP` 的线上下载地址
- `VR EXE` 的线上下载地址（如果需要）

这些外链都统一改这里：

```text
src/config/mediaManifest.js
```
