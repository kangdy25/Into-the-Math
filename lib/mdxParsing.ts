import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

type MdxMetadata = {
  slug: string;
  title: string;
  content: string;
  category: string;
  subCategory?: string;
  order: number;
};

const POSTS_DIR = path.join(process.cwd(), 'posts/basic-mathematics');

export function getMdxMetadata(slug: string) {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    console.error('❌ 파일을 찾을 수 없습니다:', filePath);
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(fileContents);

  return {
    slug,
    title: data.title || slug.replace('-', ' '),
    content,
    category: data.category || '기타',
    subCategory: data.subCategory || null,
    order: data.order || 999, 
  };
}

export function getAllMdxMetadata() {
  const files = fs.readdirSync(POSTS_DIR);

  const mdxData = files
    .map((file) => {
      const slug = file.replace('.mdx', '');
      return getMdxMetadata(slug);
    })
    .filter(Boolean) ; // null 값 제거

   // 📌 계층 구조 생성
   const categories: Record<string, Record<string, MdxMetadata[]>> = {};

   mdxData.forEach(({ category, subCategory, ...rest } : any) => {
     if (!categories[category]) {
       categories[category] = {};
     }
     if (subCategory) {
       if (!categories[category][subCategory]) {
         categories[category][subCategory] = [];
       }
       categories[category][subCategory].push({ category, subCategory, ...rest });
     } else {
       if (!categories[category]['_']) {
         categories[category]['_'] = [];
       }
       categories[category]['_'].push({ category, subCategory, ...rest });
     }
   });
 
   // 📌 정렬: order 순으로 정렬
   Object.keys(categories).forEach((category) => {
     Object.keys(categories[category]).forEach((subCategory) => {
       categories[category][subCategory].sort((a, b) => a.order - b.order);
     });
   });
 
   return categories;
}
