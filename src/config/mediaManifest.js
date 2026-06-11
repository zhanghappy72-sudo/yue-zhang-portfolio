import { fileUrl, folderUrl } from '../utils/fileUrl.js';
import { isDeployRuntime } from './runtime.js';

/**
 * 超大媒体配置中心
 *
 * 什么时候改这里：
 * - 需要把本地大视频换成线上外链
 * - 需要替换 VR ZIP / EXE 的下载地址
 * - 需要确认哪些资源只在本地完整版展示
 *
 * mode 说明：
 * - copy: 本地和部署都直接使用项目内文件
 * - external-link: 部署版不直接嵌入媒体，而是跳外链观看 / 下载
 * - local-only: 仅本地完整版可见，部署版自动隐藏
 *
 * 后续如何加入大文件：
 * 1. 本地完整版：
 *    - 把大视频 / ZIP / EXE 继续放在 content/ 对应目录里
 *    - 页面本地预览时会继续直接读取这些本地文件
 * 2. GitHub / Vercel 部署版：
 *    - 不把这些 >100MB 的文件提交到 GitHub 常规仓库
 *    - 先把文件上传到外部存储（SharePoint / OneDrive / 阿里云 OSS / 腾讯云 COS / Cloudflare R2 / 个人 CDN）
 *    - 然后把 deployUrl 改成那个可公开访问的直链或分享链接
 * 3. 封面图 / 剧照 / 缩略图：
 *    - 继续保留在项目内，这些文件是可以随站点一起部署的
 */
export const mediaManifest = {
  'video.where-spring-is-found': {
    mode: 'external-link',
    deployUrl: 'https://www.xinpianchang.com/a13512907?channel=copyLink&from=webShare',
    label: '外部观看 / Watch Externally'
  },
  'video.our-game-our-youth': {
    mode: 'external-link',
    deployUrl: 'https://www.xinpianchang.com/a13512914?channel=copyLink&from=webShare',
    label: '外部观看 / Watch Externally'
  },
  'video.china-unicom-thousands-of-knots': {
    mode: 'external-link',
    deployUrl: 'https://www.xinpianchang.com/a13335414?from=UserProfile',
    label: '外部观看 / Watch Externally'
  },
  'video.wahaha-coffee-positioning': {
    mode: 'external-link',
    deployUrl: 'https://www.xinpianchang.com/a13335446?from=UserProfile',
    label: '外部观看 / Watch Externally'
  },
  'video.shuanglu-battery': {
    mode: 'external-link',
    deployUrl: 'https://www.xinpianchang.com/a13335480',
    label: '外部观看 / Watch Externally'
  },
  'video.jingtian-record-love': {
    mode: 'external-link',
    deployUrl: 'https://www.xinpianchang.com/a13335644?from=UserProfile',
    label: '外部观看 / Watch Externally'
  },
  'video.bishengyuan-evergreen': {
    mode: 'external-link',
    deployUrl: 'https://www.xinpianchang.com/a13335612?from=UserProfile',
    label: '外部观看 / Watch Externally'
  },
  'video.yinlu-soymilk': {
    mode: 'external-link',
    deployUrl: 'https://www.xinpianchang.com/a13335637?from=UserProfile',
    label: '外部观看 / Watch Externally'
  },
  'video.anti-fraud-within-fraud': {
    mode: 'external-link',
    deployUrl: 'https://www.xinpianchang.com/a13335631?token=1jBNl02NAKxP3L01a814oraR&from=UserProfile',
    label: '外部观看 / Watch Externally'
  },
  'video.fantasia-of-fish': {
    mode: 'external-link',
    deployUrl: 'https://www.xinpianchang.com/a13335606?from=UserProfile',
    label: '外部观看 / Watch Externally'
  },
  'video.jook-sing-noodles': {
    mode: 'external-link',
    deployUrl: 'https://www.xinpianchang.com/a13714039?from=webShare&channel=copyLink',
    label: '外部观看 / Watch Externally'
  },
  'vr.trailer': {
    mode: 'external-link',
    deployUrl: '',
    label: '预告片链接待更新 / Trailer link to be updated'
  },
  'vr.download.zip': {
    mode: 'external-link',
    deployUrl: 'https://pan.baidu.com/s/12wLenzkc40gaCCnd61DgZA',
    label: '下载 VR ZIP / Download VR ZIP'
  },
  'vr.download.exe': {
    mode: 'external-link',
    deployUrl: '',
    label: 'VR EXE 链接待补充 / EXE link to be added'
  },
  'vr.package-folder': {
    mode: 'local-only',
    label: '仅本地可查看 / Local only'
  }
};

/**
 * 你以后最常补的就是这 3 个缺失项：
 * - video.jook-sing-noodles : 竹升面视频外链
 * - vr.download.zip         : VR 打包 ZIP 下载链接
 * - vr.download.exe         : 单独 EXE 或单独下载页链接
 *
 * 示例：
 * 'vr.download.zip': {
 *   mode: 'external-link',
 *   deployUrl: 'https://your-storage.example.com/Package-Dreaming-The-Peony-Pavilion.zip',
 *   label: 'Download VR Build'
 * }
 */

/**
 * build 时会把这里列出的轻量运行素材复制进 dist。
 * 目前只把网站真实引用、且体积适合静态部署的本地媒体保留在部署产物中。
 */
export const deployCopyAllowlist = ['content/牡丹亭/ending.mp4'];

export const normalizeRelativePath = (relativePath) => relativePath.replaceAll('\\', '/');

export const getMissingExternalMedia = () =>
  Object.entries(mediaManifest)
    .filter(([, entry]) => entry.mode === 'external-link' && !entry.deployUrl)
    .map(([key]) => key);

export const resolveMediaSource = ({ key, localPath, fallbackHref = '' }) => {
  const entry = mediaManifest[key];

  if (!isDeployRuntime || !entry || entry.mode === 'copy') {
    return {
      type: 'local-file',
      src: fileUrl(localPath),
      href: fileUrl(localPath),
      note: ''
    };
  }

  if (entry.mode === 'external-link') {
    if (entry.deployUrl) {
      return {
        type: 'external-link',
        src: '',
        href: entry.deployUrl,
        note: entry.label || ''
      };
    }

    return {
      type: 'unavailable',
      src: '',
      href: fallbackHref,
      note: entry.label || '外部媒体链接待补充'
    };
  }

  return {
    type: 'local-file',
    src: fileUrl(localPath),
    href: fileUrl(localPath),
    note: ''
  };
};

export const resolveRuntimeLink = ({ key, localPath, fallbackHref = '', localOnly = false, isFolder = false }) => {
  const entry = mediaManifest[key];

  if (!isDeployRuntime) {
    if (isFolder) {
      return { href: folderUrl(localPath), visible: true, note: entry?.label || '' };
    }

    return { href: fileUrl(localPath), visible: true, note: entry?.label || '' };
  }

  if (localOnly || entry?.mode === 'local-only') {
    return { href: '', visible: false, note: entry?.label || '仅本地完整版可用' };
  }

  if (entry?.deployUrl) {
    return { href: entry.deployUrl, visible: true, note: entry.label || '' };
  }

  if (fallbackHref) {
    return { href: fallbackHref, visible: true, note: entry?.label || '' };
  }

  return { href: '', visible: false, note: entry?.label || '链接待补充' };
};
