import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

type MdxMetadata = {
  slug: string;
  title: string;
  content: string;
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
    content,
    title: data.title || slug.replace('-', ' '),
  };
}

export function getAllMdxMetadata() {
  const files = fs.readdirSync(POSTS_DIR);

  return files
    .map((file) => {
      const slug = file.replace('.mdx', '');
      return getMdxMetadata(slug);
    })
    .filter((item): item is MdxMetadata => item !== null); // null 값 제거
}
