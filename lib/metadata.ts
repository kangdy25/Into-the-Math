import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import formatCategoryName from './formatCategoryName';
import findMdxFiles from './findMdxFiles';

type MdxMetadata = {
  slug: string;
  title: string;
  content: string;
  order: number;
  category?: string;
  displayCategory?: string;
};

// slug를 받아 단일 MDX 파일의 메타데이터와 내용을 반환하는 함수
export function getMdxPageData(
  locale: string,
  slug: string,
): MdxMetadata | null {
  // 슬러그가 경로 구분자('/')를 포함할 경우 처리
  const POSTS_DIR = path.join(process.cwd(), 'posts', locale);
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(fileContents);

  // 카테고리 추출 (슬러그에서 마지막 부분을 제외한 부분)
  const parts = slug.split('/');
  const category = parts.length > 1 ? parts.slice(0, -1).join('/') : '';
  const actualSlug = parts[parts.length - 1];

  // 포맷된 카테고리 이름 생성
  const displayCategory = formatCategoryName(category);

  return {
    slug,
    title: data.title || actualSlug.replace(/-/g, ' '),
    content,
    order: data.order || 999,
    category,
    displayCategory,
  };
}

// 모든 MDX 파일의 메타데이터를 카테고리 별로 모아서 정리하는 함수
export function getAllMdxMetadata(locale: string) {
  const categories: Record<string, MdxMetadata[]> = {};
  const displayNameMap: Record<string, string> = {};

  // 모든 MDX 파일 찾기 (index.mdx 제외)
  const POSTS_DIR = path.join(process.cwd(), 'posts', locale);
  const mdxFiles = findMdxFiles(POSTS_DIR, '', true);

  // 각 파일의 메타데이터 얻기
  mdxFiles.forEach((slug) => {
    const pageData = getMdxPageData(locale, slug);
    if (!pageData) return;

    // 카테고리 구성
    const categoryPath = pageData.category || 'uncategorized';

    // 표시용 카테고리 이름 저장
    if (!displayNameMap[categoryPath]) {
      displayNameMap[categoryPath] = formatCategoryName(categoryPath);
    }

    // 해당 카테고리에 대한 배열이 없으면 초기화
    if (!categories[categoryPath]) {
      categories[categoryPath] = [];
    }

    // 해당 카테고리에 현재 페이지 데이터를 추가
    categories[categoryPath].push({
      ...pageData,
      displayCategory: displayNameMap[categoryPath],
    });
  });

  // 각 카테고리 내에서 order 기준으로 정렬
  Object.keys(categories).forEach((category) => {
    categories[category].sort((a, b) => a.order - b.order);
  });

  return { categories, displayNameMap };
}
