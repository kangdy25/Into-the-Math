import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { serialize } from 'next-mdx-remote/serialize';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { default: Post } = await import(
    `@/posts/basic-mathematics/${slug}.mdx`
  );
  const filePath = path.join(
    process.cwd(),
    `posts/basic-mathematics/${slug}.mdx`,
  );
  console.log('📂 MDX File Path:', filePath);

  if (!fs.existsSync(filePath)) {
    console.error('❌ 파일을 찾을 수 없습니다:', filePath);
    return <div>404 - 페이지를 찾을 수 없습니다.</div>;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  console.log('📄 MDX File Contents:', fileContents.substring(0, 100));

  try {
    const { content, data } = matter(fileContents);
    console.log('📝 Extracted Frontmatter:', data);
    console.log(
      '📜 Extracted Content (first 100 chars):',
      content.substring(0, 100),
    );
    const mdxSource = await serialize(content, { parseFrontmatter: true });

    return (
      <>
        <Header />
        <div className="flex">
          <Sidebar />
          <div className="flex flex-col flex-1 border-2 border-indigo-400 px-20 py-10">
            <h1>{data.title ?? '제목 없음'}</h1>
            {/* <MDXRemote source={mdxSource} /> */}
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error('🚨 MDX 파싱 중 오류 발생:', error);
    return <div>MDX 파일을 불러오는 중 오류가 발생했습니다.</div>;
  }
}
