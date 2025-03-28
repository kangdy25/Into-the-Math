import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

type MdxMetadata = {
  slug: string;
  title: string;
  content: string;
  order: number;
  category?: string;
  displayCategory?: string;
};

const POSTS_DIR = path.join(process.cwd(), 'posts');

// 카테고리 이름 포맷팅
export function formatCategoryName(category: string): string {
  // 폴더 경로에서 각 부분 추출
  const parts = category.split('/');
  
  // 각 부분에 대해 변환 적용
  const formattedParts = parts.map(part => {
    // 숫자_이름 패턴인 경우 (예: 01_Introduction)
    const match = part.match(/^(\d+)_(.+)$/);
    if (match) {
      // 숫자와 이름 사이에 공백 추가
      return `${match[1]}. ${match[2]}`;
    }
    return part;
  });
  
  // 변환된 부분들을 다시 경로 구분자로 결합
  return formattedParts.join('/');
}

// 모든 MDX 파일 경로 찾기 (재귀적으로)
function findMdxFiles(dir: string, basePath: string = '', excludeIndex: boolean = false): string[] {
  const files: string[] = [];
  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
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

// slug를 받아 해당 MDX 파일의 메타데이터와 내용을 반환하는 함수
export function getMdxMetadata(slug: string) {
  // 슬러그가 경로 구분자('/')를 포함할 경우 처리
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    console.error('❌ 파일을 찾을 수 없습니다:', filePath);
    return null;
  }

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
    displayCategory // 포맷된 카테고리 이름 추가
  };
}

export function getAllMdxMetadata() {
  const categories: Record<string, any[]> = {};
  const displayNameMap: Record<string, string> = {}; // 카테고리 표시 이름 매핑 저장
  
  // 모든 MDX 파일 찾기 (index.mdx 제외)
  const mdxFiles = findMdxFiles(POSTS_DIR, '', true);
  
  // 각 파일의 메타데이터 얻기
  mdxFiles.forEach(slug => {
    // index.mdx 파일 제외
    if (slug === 'index') return;
    
    const metadata = getMdxMetadata(slug);
    
    if (metadata) {
      // 카테고리 구성
      const categoryPath = metadata.category || 'uncategorized';
      
      // 표시용 카테고리 이름 저장
      if (!displayNameMap[categoryPath]) {
        displayNameMap[categoryPath] = formatCategoryName(categoryPath);
      }
      
      if (!categories[categoryPath]) {
        categories[categoryPath] = [];
      }
      
      categories[categoryPath].push({
        ...metadata,
        displayCategory: displayNameMap[categoryPath]
      });
    }
  });
  
  // 각 카테고리 내에서 order 기준으로 정렬
  Object.keys(categories).forEach(category => {
    categories[category].sort((a, b) => a.order - b.order);
  });
  
  return { categories, displayNameMap };
}

// 특정 경로의 모든 슬러그 가져오기 (동적 라우팅용)
export function getAllSlugs() {
  // index.mdx 파일도 포함 (excludeIndex = false)
  return findMdxFiles(POSTS_DIR, '', false);
}