import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import formatCategoryName from './formatCategoryName';
import findMdxFiles from './findMdxFiles';

type MdxMetadata = {
  slug: string; // 파일 경로(확장자 제외)
  title: string; // 문서 제목
  content: string; // MDX 본문
  order: number; // 정렬 기준 (frontmatter의 order 필드)
  category?: string; // 카테고리 경로 (폴더 기준)
  displayCategory?: string; // 사용자 표시용 카테고리 이름 (ex: "01_Intro" → "01. Intro")
};

/**
 * 특정 MDX 파일의 slug를 기반으로 메타데이터와 내용을 읽어옵니다.
 *
 * @param locale 로케일 (예: 'ko', 'en')
 * @param slug 파일 경로 (확장자 없이)
 * @returns MdxMetadata 또는 null (파일이 없을 경우)
 */

export function getMdxPageData(
  locale: string,
  slug: string,
): MdxMetadata | null {
  // 파일 경로 조합 (예: /posts/ko/basic-math/integers.mdx)
  const POSTS_DIR = path.join(process.cwd(), 'posts', locale);
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  // 파일 내용 읽고 frontmatter 분리
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(fileContents);

  // slug를 경로로 분할해서 카테고리와 파일명 분리
  const parts = slug.split('/');
  const category = parts.length > 1 ? parts.slice(0, -1).join('/') : '';
  const actualSlug = parts[parts.length - 1];

  // 포맷된 카테고리 이름 생성
  const displayCategory = formatCategoryName(category);

  return {
    slug,
    title: data.title || actualSlug.replace(/-/g, ' '),
    content,
    order: data.order || 999, // order가 없으면 마지막에 정렬되도록
    category,
    displayCategory,
  };
}

/**
 * 모든 MDX 파일의 메타데이터를 읽어 카테고리별로 정리합니다.
 *
 * @param locale 로케일 (예: 'ko', 'en')
 * @returns
 *  - categories: 카테고리별로 그룹화된 MdxMetadata 배열
 *  - displayNameMap: 카테고리 경로 → 표시용 이름 매핑 객체
 */

export function getAllMdxMetadata(locale: string) {
  const categories: Record<string, MdxMetadata[]> = {};
  const displayNameMap: Record<string, string> = {};

  // 모든 MDX 파일 경로 수집 (index.mdx는 제외)
  const POSTS_DIR = path.join(process.cwd(), 'posts', locale);
  const mdxFiles = findMdxFiles(POSTS_DIR, '', true);

  // 각 파일의 메타데이터 얻기
  mdxFiles.forEach((slug) => {
    const pageData = getMdxPageData(locale, slug);
    if (!pageData) return;

    // 카테고리 경로 (없으면 'uncategorized')
    const categoryPath = pageData.category || 'uncategorized';

    // 표시용 카테고리 이름 캐싱
    if (!displayNameMap[categoryPath]) {
      displayNameMap[categoryPath] = formatCategoryName(categoryPath);
    }

    // 카테고리 그룹 초기화
    if (!categories[categoryPath]) {
      categories[categoryPath] = [];
    }

    // 페이지 데이터 추가 (표시용 이름 포함)
    categories[categoryPath].push({
      ...pageData,
      displayCategory: displayNameMap[categoryPath],
    });
  });

  // 각 카테고리 내 문서를 order 기준으로 정렬
  Object.keys(categories).forEach((category) => {
    categories[category].sort((a, b) => a.order - b.order);
  });

  return { categories, displayNameMap };
}
