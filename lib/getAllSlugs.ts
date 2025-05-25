import path from 'path';
import findMdxFiles from './findMdxFiles';

/**
 * 지정된 로케일(locale)의 posts 폴더 내 모든 MDX 파일의 슬러그 배열을 반환합니다.
 * 동적 라우팅 등에 사용됩니다.
 *
 * 예: locale이 'ko'일 경우 → /posts/ko 디렉토리 아래의 모든 MDX 파일을 검색
 *
 * @param locale 다국어 코드 (예: 'en', 'ko')
 * @returns MDX 슬러그 배열 (예: ['intro', 'guide/01_getting-started'])
 */

export function getAllSlugs(locale: string) {
  // 검색 대상 루트 디렉토리 설정 (예: /posts/ko)
  const POSTS_DIR = path.join(process.cwd(), 'posts', locale);

  // index.mdx 포함하여 모든 MDX 파일의 슬러그를 반환
  return findMdxFiles(POSTS_DIR, '', false);
}
