import fs from 'fs';
import path from 'path';

// 모든 MDX 파일 경로 찾기 (재귀적으로)
export default function findMdxFiles(
  dir: string,
  basePath: string = '',
  excludeIndex: boolean = false,
): string[] {
  const files: string[] = [];
  const items = fs.readdirSync(dir);

  items.forEach((item) => {
    const itemPath = path.join(dir, item);
    const isDirectory = fs.statSync(itemPath).isDirectory();

    if (isDirectory) {
      // 하위 디렉토리 탐색
      const subBasePath = basePath ? `${basePath}/${item}` : item;
      files.push(...findMdxFiles(itemPath, subBasePath, excludeIndex));
    } else if (item.endsWith('.mdx')) {
      // MDX 파일 경로 추가
      const slug = path.basename(item, '.mdx');

      // index.mdx 파일 제외 옵션 확인
      if (excludeIndex && slug === 'index') {
        return;
      }

      const fullSlug = basePath ? `${basePath}/${slug}` : slug;
      files.push(fullSlug);
    }
  });

  return files;
}
