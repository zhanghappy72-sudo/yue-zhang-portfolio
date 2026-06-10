/**
 * Runtime mode guide
 * - local: 本地完整版，优先读取项目内的大视频 / ZIP / EXE。
 * - deploy: 线上部署版，优先读取外部媒体链接，避免依赖本地大文件。
 *
 * 如需手动覆盖，可在页面最前面挂：
 * window.__PORTFOLIO_RUNTIME__ = { mode: 'local' | 'deploy' }
 */
const LOCAL_HOSTS = new Set(['127.0.0.1', 'localhost']);

export const detectRuntimeMode = () => {
  const override = globalThis?.__PORTFOLIO_RUNTIME__?.mode;
  if (override === 'local' || override === 'deploy') {
    return override;
  }

  if (typeof window === 'undefined') {
    return 'local';
  }

  return LOCAL_HOSTS.has(window.location.hostname) ? 'local' : 'deploy';
};

export const runtimeMode = detectRuntimeMode();
export const isDeployRuntime = runtimeMode === 'deploy';
