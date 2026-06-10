import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { deployCopyAllowlist, getMissingExternalMedia } from '../src/config/mediaManifest.js';

/**
 * 部署构建脚本
 * - 生成可上线的 dist/
 * - 排除不适合上传 GitHub / Vercel 的超大媒体
 * - 检查源码中是否残留本地绝对路径
 * - 生成 build-report.json，方便上线前核对缺失外链和大文件
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

const EXCLUDED_DIRS = new Set(['.git', '.agents', '.codex', 'dist', 'node_modules', 'format']);
const EXCLUDED_SUFFIXES = ['.mp4', '.mov', '.zip', '.exe', '.bat', '.docx', '.pptx', '.heic'];
const ALWAYS_COPY_FILES = new Set(['index.html']);
const REQUIRED_ROOT_DIRS = ['src', 'assets', 'content'];
const ABSOLUTE_PATH_MARKERS = ['/Users/', 'C:\\Users\\'];

const isExcludedFile = (relativePath) => EXCLUDED_SUFFIXES.some((suffix) => relativePath.toLowerCase().endsWith(suffix));

const isTempFile = (name) => name.startsWith('~$') || name.startsWith('.~') || name === '.DS_Store';

const ensureDir = async (target) => {
  await fs.mkdir(target, { recursive: true });
};

const copyFile = async (source, destination) => {
  await ensureDir(path.dirname(destination));
  await fs.copyFile(source, destination);
};

const copyTree = async (sourceDir, destinationDir, relativePrefix = '') => {
  const entries = await fs.readdir(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    if (isTempFile(entry.name)) continue;

    const sourcePath = path.join(sourceDir, entry.name);
    const relativePath = path.join(relativePrefix, entry.name);
    const destinationPath = path.join(destinationDir, entry.name);

    if (entry.isDirectory()) {
      if (EXCLUDED_DIRS.has(entry.name)) continue;
      await ensureDir(destinationPath);
      await copyTree(sourcePath, destinationPath, relativePath);
      continue;
    }

    if (isExcludedFile(relativePath) && !deployCopyAllowlist.includes(relativePath)) {
      continue;
    }

    await copyFile(sourcePath, destinationPath);
  }
};

const scanForAbsolutePaths = async (pathsToCheck) => {
  const matches = [];
  const inspectFile = async (filePath) => {
    const extension = path.extname(filePath).toLowerCase();
    if (!['.js', '.css', '.html', '.json', '.md'].includes(extension)) return;
    const content = await fs.readFile(filePath, 'utf8');
    if (ABSOLUTE_PATH_MARKERS.some((marker) => content.includes(marker))) {
      matches.push(path.relative(rootDir, filePath));
    }
  };

  const visit = async (currentDir) => {
    const currentStats = await fs.stat(currentDir);
    if (currentStats.isFile()) {
      await inspectFile(currentDir);
      return;
    }

    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (EXCLUDED_DIRS.has(entry.name)) continue;
        await visit(path.join(currentDir, entry.name));
        continue;
      }
      await inspectFile(path.join(currentDir, entry.name));
    }
  };

  for (const target of pathsToCheck) {
    await visit(target);
  }
  return matches;
};

const listLargeFiles = async (dir, limitBytes = 100 * 1024 * 1024) => {
  const largeFiles = [];
  const visit = async (currentDir) => {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const entryPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        if (EXCLUDED_DIRS.has(entry.name)) continue;
        await visit(entryPath);
        continue;
      }
      const stats = await fs.stat(entryPath);
      if (stats.size > limitBytes) {
        largeFiles.push({
          file: path.relative(rootDir, entryPath),
          sizeMB: Number((stats.size / 1024 / 1024).toFixed(1))
        });
      }
    }
  };

  await visit(dir);
  return largeFiles;
};

const main = async () => {
  const missingDirs = [];
  for (const dirName of REQUIRED_ROOT_DIRS) {
    try {
      await fs.access(path.join(rootDir, dirName));
    } catch {
      missingDirs.push(dirName);
    }
  }

  if (missingDirs.length) {
    throw new Error(`缺少必要目录: ${missingDirs.join(', ')}`);
  }

  const absolutePathMatches = await scanForAbsolutePaths([
    path.join(rootDir, 'src'),
    path.join(rootDir, 'index.html'),
    path.join(rootDir, 'server.js')
  ].filter(Boolean).map((entry) => entry));
  if (absolutePathMatches.length) {
    throw new Error(`代码中仍存在本地绝对路径引用: ${absolutePathMatches.join(', ')}`);
  }

  await fs.rm(distDir, { recursive: true, force: true });
  await ensureDir(distDir);

  for (const file of ALWAYS_COPY_FILES) {
    await copyFile(path.join(rootDir, file), path.join(distDir, file));
  }

  await copyTree(path.join(rootDir, 'src'), path.join(distDir, 'src'));
  await copyTree(path.join(rootDir, 'assets'), path.join(distDir, 'assets'));
  await copyTree(path.join(rootDir, 'content'), path.join(distDir, 'content'));

  const missingExternalMedia = getMissingExternalMedia();
  const largeFiles = await listLargeFiles(rootDir);

  const report = {
    generatedAt: new Date().toISOString(),
    missingExternalMedia,
    largeFiles
  };

  await fs.writeFile(path.join(distDir, 'build-report.json'), JSON.stringify(report, null, 2), 'utf8');

  console.log('Build finished: dist/');
  if (missingExternalMedia.length) {
    console.warn('\n[build warning] 这些外链媒体还未补齐，部署版相关功能会降级为占位或外部按钮：');
    missingExternalMedia.forEach((item) => console.warn(`- ${item}`));
  }

  if (largeFiles.length) {
    console.warn('\n[build report] 当前项目中仍存在不适合常规 GitHub 仓库上传的大文件：');
    largeFiles.forEach((item) => console.warn(`- ${item.file} (${item.sizeMB} MB)`));
  }
};

main().catch((error) => {
  console.error(`Build failed: ${error.message}`);
  process.exitCode = 1;
});
