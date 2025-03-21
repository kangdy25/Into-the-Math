// lib/mdxParsing.ts

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

type MdxMetadata = {
  slug: string;
  title: string;
  content: string;
  order: number;
  category?: string;
};

const POSTS_DIR = path.join(process.cwd(), 'posts/basic-mathematics');

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

  return {
    slug,
    title: data.title || actualSlug.replace(/-/g, ' '),
    content,
    order: data.order || 999,
    category
  };
}

export function getAllMdxMetadata() {
  const categories: Record<string, any[]> = {};
  
  // 모든 MDX 파일 경로 찾기 (재귀적으로)
  function findMdxFiles(dir: string, basePath: string = ''): string[] {
    const files: string[] = [];
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const itemPath = path.join(dir, item);
      const isDirectory = fs.statSync(itemPath).isDirectory();
      
      if (isDirectory) {
        // 하위 디렉토리 탐색
        const subBasePath = basePath ? `${basePath}/${item}` : item;
        files.push(...findMdxFiles(itemPath, subBasePath));
      } else if (item.endsWith('.mdx')) {
        // MDX 파일 경로 추가
        const slug = path.basename(item, '.mdx');
        const fullSlug = basePath ? `${basePath}/${slug}` : slug;
        files.push(fullSlug);
      }
    });
    
    return files;
  }
  
  // 모든 MDX 파일 찾기
  const mdxFiles = findMdxFiles(POSTS_DIR);
  
  // 각 파일의 메타데이터 얻기
  mdxFiles.forEach(slug => {
    const metadata = getMdxMetadata(slug);
    
    if (metadata) {
      // 카테고리 구성
      const categoryPath = metadata.category || 'uncategorized';
      
      if (!categories[categoryPath]) {
        categories[categoryPath] = [];
      }
      
      categories[categoryPath].push(metadata);
    }
  });
  
  // 각 카테고리 내에서 order 기준으로 정렬
  Object.keys(categories).forEach(category => {
    categories[category].sort((a, b) => a.order - b.order);
  });
  
  return categories;
}

// 특정 경로의 모든 슬러그 가져오기 (동적 라우팅용)
export function getAllSlugs() {
  function findMdxFiles(dir: string, basePath: string = ''): string[] {
    const files: string[] = [];
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const itemPath = path.join(dir, item);
      const isDirectory = fs.statSync(itemPath).isDirectory();
      
      if (isDirectory) {
        // 하위 디렉토리 탐색
        const subBasePath = basePath ? `${basePath}/${item}` : item;
        files.push(...findMdxFiles(itemPath, subBasePath));
      } else if (item.endsWith('.mdx')) {
        // MDX 파일 경로 추가
        const slug = path.basename(item, '.mdx');
        const fullSlug = basePath ? `${basePath}/${slug}` : slug;
        files.push(fullSlug);
      }
    });
    
    return files;
  }
  
  return findMdxFiles(POSTS_DIR);
}