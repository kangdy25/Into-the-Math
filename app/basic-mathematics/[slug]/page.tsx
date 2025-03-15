import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { useMDXComponents } from '@/mdx-components';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
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

    return (
      <>
        <Header />
        <div className="flex">
          <Sidebar />
          <div className="flex flex-col flex-1 border-2 border-indigo-400 px-20 py-10">
            {/* <h1>{data.title ?? '제목 없음'}</h1> */}
            <MDXRemote
              source={content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkMdxFrontmatter, remarkGfm, remarkMath],
                  rehypePlugins: [
                    rehypeKatex, // KaTeX 수식 렌더링
                    [
                      rehypePrettyCode,
                      {
                        // Pretty Code 스타일링
                        theme: 'one-dark-pro', // 하이라이팅 테마 설정
                        emptyStyle: false, // 빈 코드 블록에 대한 스타일 적용 여부
                      },
                    ],
                  ],
                },
              }}
              components={useMDXComponents({})}
            />
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error('🚨 MDX 파싱 중 오류 발생:', error);
    return <div>MDX 파일을 불러오는 중 오류가 발생했습니다.</div>;
  }
}
