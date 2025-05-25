import fs from 'fs';
import path from 'path';

/**
 * 주어진 디렉토리에서 .mdx 파일을 재귀적으로 찾아 슬러그 배열로 반환합니다.
 *
 * @param dir 검색할 디렉토리 경로 (절대 또는 상대 경로)
 * @param basePath 내부에서 사용할 슬러그용 상대 경로 (재귀 호출에 사용)
 * @param excludeIndex true일 경우 index.mdx 파일을 결과에서 제외
 * @returns MDX 슬러그 문자열 배열 (예: ['guide/intro', 'about/team'])
 */

export default function findMdxFiles(
  dir: string,
  basePath: string = '',
  excludeIndex: boolean = false,
): string[] {
  const files: string[] = [];
  const items = fs.readdirSync(dir); // 현재 디렉토리의 항목 읽기

  items.forEach((item) => {
    const itemPath = path.join(dir, item);
    const isDirectory = fs.statSync(itemPath).isDirectory();

    if (isDirectory) {
      // 폴더인 경우: 하위 디렉토리를 재귀적으로 탐색
      const subBasePath = basePath ? `${basePath}/${item}` : item;
      files.push(...findMdxFiles(itemPath, subBasePath, excludeIndex));
    } else if (item.endsWith('.mdx')) {
      const slug = path.basename(item, '.mdx');

      // index.mdx는 조건에 따라 제외
      if (excludeIndex && slug === 'index') {
        return;
      }

      // basePath와 조합하여 fullSlug 생성
      const fullSlug = basePath ? `${basePath}/${slug}` : slug;
      files.push(fullSlug);
    }
  });

  return files;
}
