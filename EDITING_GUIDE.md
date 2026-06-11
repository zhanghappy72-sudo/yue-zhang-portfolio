# 作品集修改指南

推荐后续日常编辑直接打开整理后的精简源码副本目录：

```text
Yue Zhang
```

这个目录不包含 `.git`、`dist` 和 `format`，更适合在 VS Code 里长期维护。

这份文档面向后续在 VS Code 中继续维护这个作品集的人。  
目标是让你不用重新理解整个项目结构，也能快速找到“该改哪里”。

## 1. 如何打开和本地预览

### 在 VS Code 中打开

1. 打开 VS Code
2. 选择 `File -> Open Folder`
3. 选择当前项目根目录 `Portfolio website`

### 本地预览

在项目根目录终端运行：

```bash
npm install
npm start
```

浏览器打开：

```text
http://127.0.0.1:4173
```

如果想边改边自动重启本地服务：

```bash
npm run dev
```

## 2. 这个项目的结构怎么理解

- `index.html`
  - 网站入口壳文件，只负责挂载 `#app`
- `src/main.js`
  - 真正的前端入口，负责路由和页面初始化
- `src/pages/`
  - 每个页面的结构
- `src/data/`
  - 页面实际使用的内容数据
- `src/config/`
  - 可调参数、运行模式、大媒体外链
- `src/styles/`
  - 视觉样式和设计 tokens
- `assets/`
  - 站点直接使用的小资源，例如头像、封面图
- `content/`
  - 正式内容素材目录
- `scripts/build.mjs`
  - 生成 `dist/` 的部署构建脚本
- `server.js`
  - 本地预览服务

## 3. 每个页面该改哪些文件

### 首页 Home

- `src/pages/home.js`
  - 首页 Hero 标题、副标题、按钮、About 预览文案
- `src/data/homeHighlights.js`
  - 右侧浮动卡片的标题、顺序、链接
- `src/config/siteConfig.js`
  - 右侧浮动卡片位置、交互强度

### About 页面

- `src/pages/about.js`
  - About 文案、教育背景、技能、统计数字
- `src/data/siteMeta.js`
  - 姓名、英文名、首页副标题、邮箱

### Video 页面

- `src/data/videoProjectSource.js`
  - 每个视频的标题、封面、主视频、简介、外链、下方详情图片
- `src/pages/video.js`
  - 视频列表页和详情页结构

### Image 页面

- `src/data/imageProjects.js`
  - 非人像图片、人像分组
- `src/pages/image.js`
  - 图片页结构
- `src/main.js`
  - 非人像无限滚动、磁性 3D hover 等交互

### VR 页面

- `src/data/vrProjects.js`
  - VR 项目文字、trailer、ending、Storyboard、Blueprint、Assets、下载区
- `src/pages/vr.js`
  - VR 列表页和详情页结构
- `src/config/mediaManifest.js`
  - VR 大视频、ZIP、EXE 的部署外链

### Posts 页面

- `src/data/postProjects.js`
  - 推文标题、封面图、摘要、链接
- `src/pages/posts.js`
  - 推文展示结构

### Contact / 页脚

- `src/data/siteMeta.js`
  - 邮箱
- `src/data/contactLinks.js`
  - 简历 PDF 链接
- `src/components/layout.js`
  - 页脚 Contact 区结构

## 4. 怎么改文字、图片、视频和链接

### 改首页文字

改：

- `src/pages/home.js`
- `src/data/siteMeta.js`

### 改 About 文案

改：

- `src/pages/about.js`

### 改个人照片

当前人物图使用：

```text
assets/yue-portrait.png
```

替换同名文件，或者改这些文件里的路径：

- `src/pages/home.js`
- `src/pages/about.js`

### 改简历 PDF

当前简历使用：

```text
content/张悦-简历 VR.pdf
```

如果改文件名，还要同步修改：

- `src/data/contactLinks.js`

### 改视频封面、主视频、详情图片

改：

- `src/data/videoProjectSource.js`

每个视频项目常见字段：

- `cover`
  - 视频封面
- `media`
  - 主视频
- `gallery`
  - 主视频下方的 3 张详情图片
- `links`
  - 新片场等外部链接

### 改图片作品

改：

- `src/data/imageProjects.js`

### 改推文链接

改：

- `src/data/postProjects.js`

## 5. 如何新增视频、图片组和推文

### 新增一个视频项目

1. 把封面、剧照、视频文件放进 `content/脚本、视频作品/你的项目文件夹`
2. 打开 `src/data/videoProjectSource.js`
3. 复制一个已有项目对象，改：
   - `slug`
   - `title`
   - `subtitle`
   - `cover`
   - `media`
   - `gallery`
   - `links`

### 新增一个非人像图片

1. 把图片放进 `content/图片作品/`
2. 在 `src/data/imageProjects.js` 的非人像数组里补文件名

### 新增一个人像组

1. 在 `content/图片作品/人像/` 下新建一个文件夹
2. 放入对应组图
3. 在 `src/data/imageProjects.js` 中新增一个分组对象

### 新增一篇推文

1. 把封面图放进 `content/推文/`
2. 在 `src/data/postProjects.js` 新增一条对象
3. 补：
   - `title`
   - `cover`
   - `summary`
   - `link`

## 6. 如何修改 VR 项目素材

VR 项目主要改这两个文件：

- `src/data/vrProjects.js`
- `src/config/mediaManifest.js`

其中：

- `vrProjects.js`
  - 改文字、trailer stills、ending、Storyboard、Blueprint、Assets、下载文案
- `mediaManifest.js`
  - 改部署版的大媒体外链，例如：
    - VR ZIP
    - VR EXE
    - 大视频外链

## 7. 如何修改颜色、字体和动画

### 颜色、圆角、阴影、基础视觉参数

改：

- `src/styles/tokens.css`

比如：

- `--bg`
- `--ink`
- `--radius-lg`
- `--shadow`

### 页面布局、间距、卡片样式

改：

- `src/styles/base.css`

### 首页浮动卡片位置、无限滚动速度、3D 强度

改：

- `src/config/siteConfig.js`

重点参数：

- `heroOrbitCards`
- `motion.imageGalleryLerp`
- `motion.imageGalleryWheelMultiplier`
- `motion.magneticRotate`
- `motion.magneticLift`

## 8. 如何重新部署

### 先本地构建

```bash
npm run build
```

构建结果在：

```text
dist/
```

### 如果是 Vercel

每次改完后：

1. 提交代码到 GitHub
2. 打开 Vercel 项目
3. 触发新的 Deploy，或等待 GitHub 自动触发

Vercel 配置值：

- Framework Preset: `Other`
- Build Command: `npm run build`
- Output Directory: `dist`

## 9. 大文件怎么处理

大视频、VR ZIP、EXE 不建议直接上传 GitHub 常规仓库。  
当前项目使用：

- `src/config/mediaManifest.js`

来管理部署版外链。

处理方法：

1. 本地完整版继续把大文件放在 `content/` 下
2. 部署版把大文件上传到外部存储
3. 在 `mediaManifest.js` 里把 `deployUrl` 改成外部链接

例如：

- 视频外链
- 百度网盘 ZIP
- 单独 EXE 下载页

## 10. 修改后怎么检查

建议每次改完都至少做这三步：

```bash
npm start
npm run build
npm run preview:dist
```

然后检查：

- 首页是否正常
- 视频、图片、VR、推文是否都能打开
- 简历 PDF 是否可访问
- 详情页图片是否丢失
- 路由刷新是否正常
