/**
 * VR 项目数据
 * - 主项目文案、海报、trailer、ending、蓝图、资产、下载链接都在这里改
 * - 本地大文件与部署外链的切换由 src/config/mediaManifest.js 统一控制
 */
import { fileUrl } from '../utils/fileUrl.js';
import { resolveMediaSource, resolveRuntimeLink } from '../config/mediaManifest.js';

export const vrProjects = [
  {
    slug: 'dreaming-the-peony-pavilion',
    title: 'Dreaming the Peony Pavilion',
    subtitle: '游园惊梦',
    poster: fileUrl('content/牡丹亭/Poster.jpg'),
    trailer: {
      ...resolveMediaSource({
        key: 'vr.trailer',
        localPath: 'content/牡丹亭/预告片/Group 1 trailer/Group 1 trailer.mp4'
      }),
      poster: fileUrl('content/牡丹亭/预告片/Group 1 trailer/最终最终-封面.jpg')
    },
    overview:
      '以《牡丹亭》为基础，将杜丽娘生死与梦境叙事改写为第一人称沉浸式体验。观众作为杜丽娘的魂魄，在冥府、闺房、花园与梅花观之间，通过物件触发与空间探索逐步拼合记忆。',
    storyStructure: [
      '冥府苏醒与判官宣判，建立命运前提。',
      '三扇门通往闺房、花园、梅花观三个记忆空间。',
      '每个空间以关键物件触发碎片叙事与皮影动画。',
      '九段记忆被激活后回到终章，形成完整叙事闭环。'
    ],
    interactionMethod: [
      '第一人称 VR 视角',
      '双手柄射线交互与 Trigger 触发',
      '物件高亮 / 文本提示 / 场景切换',
      '以空间探索替代传统菜单式剧情推进'
    ],
    responsibility: [
      'Script Writer',
      'Narrative Design',
      'VR Story Structure',
      'Material Coordination'
    ],
    tools: [
      'Unreal Engine 5',
      'Blender',
      'Meta Quest 3',
      'Blueprint',
      'AIGC Animation',
      'CapCut'
    ],
    trailerStills: [
      { src: fileUrl('content/牡丹亭/场景截图/8cce1452f8138b68717ae87842728533.PNG'), alt: '预告片相关场景截图 1' },
      { src: fileUrl('content/牡丹亭/场景截图/93ad300104bfb95792be81904b13ec19.PNG'), alt: '预告片相关场景截图 2' },
      { src: fileUrl('content/牡丹亭/场景截图/a63663fbbdd7832df8fcf331ab03ee13.PNG'), alt: '预告片相关场景截图 3' }
    ],
    aigcFeature: {
      title: 'AIGC Shadow Play Animation',
      src: fileUrl('content/牡丹亭/ending.mp4'),
      description: '该段视频为项目中的 AIGC 生成皮影戏动画，用于将《牡丹亭》的叙事片段转化为更具东方戏曲气质的动态视觉表达。'
    },
    storyboard: [
      {
        src: fileUrl('content/牡丹亭/storytboard有文字版本/1.jpg'),
        alt: 'Storyboard 1'
      },
      {
        src: fileUrl('content/牡丹亭/storytboard有文字版本/4.jpg'),
        alt: 'Storyboard 2'
      },
      {
        src: fileUrl('content/牡丹亭/storytboard有文字版本/7.jpg'),
        alt: 'Storyboard 3'
      }
    ],
    blueprints: [
      {
        src: fileUrl('content/牡丹亭/blueprint部分截图/Trigger点击播放皮影戏视频.PNG'),
        alt: '蓝图逻辑 1'
      },
      {
        src: fileUrl('content/牡丹亭/blueprint部分截图/玩家进入三个场景完之后回到选门关卡会自动播放ending视频.png'),
        alt: '蓝图逻辑 2'
      },
      {
        src: fileUrl('content/牡丹亭/blueprint部分截图/右手射线碰到出现文字提示词.PNG'),
        alt: '蓝图逻辑 3'
      }
    ],
    assets: [
      {
        src: fileUrl('content/牡丹亭/资产截图/图片1.png'),
        alt: '项目资产图 1'
      },
      {
        src: fileUrl('content/牡丹亭/资产截图/图片2.png'),
        alt: '项目资产图 2'
      },
      {
        src: fileUrl('content/牡丹亭/资产截图/图片3.png'),
        alt: '项目资产图 3'
      }
    ],
    download: {
      label: 'Download VR Build',
      ...resolveRuntimeLink({
        key: 'vr.download.zip',
        localPath: 'content/牡丹亭/Package-Dreaming The Peony Pavilion.zip'
      }),
      format: 'ZIP',
      platform: 'Windows',
      note: 'Windows packaged build. Unzip before running. Full runtime files are included in the archive.',
      passcode: 's84v'
    },
    links: [
      {
        label: 'Open Package Folder',
        ...resolveRuntimeLink({
          key: 'vr.package-folder',
          localPath: 'content/牡丹亭/Package-Dreaming The Peony Pavilion/Windows',
          localOnly: true,
          isFolder: true
        })
      },
      {
        label: 'Direct EXE',
        ...resolveRuntimeLink({
          key: 'vr.download.exe',
          localPath: 'content/牡丹亭/Package-Dreaming The Peony Pavilion/Windows/VRstudy.exe'
        })
      }
    ]
  }
];
