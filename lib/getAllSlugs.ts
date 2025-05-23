import path from 'path';
import findMdxFiles from './findMdxFiles';

// 특정 경로의 모든 슬러그 가져오기 (동적 라우팅용)
export function getAllSlugs(locale: string) {
  // index.mdx 파일도 포함 (excludeIndex = false)
  const POSTS_DIR = path.join(process.cwd(), 'posts', locale);
  return findMdxFiles(POSTS_DIR, '', false);
}
