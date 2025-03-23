import { getMdxMetadata } from '@/lib/mdxParsing';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { useMDXComponents } from '@/mdx-components';
import Comments from "components/Comments";

type PageParams = {
  slug: string[];
};

export default async function Page({
  params,
}: {
  params: PageParams;
}) {
  // 배열로 된 slug를 문자열로 변환
  const slugPath = (await params).slug.join('/');
  
  const metadata = getMdxMetadata(slugPath);
  if (!metadata) {
    return <div>404 - 페이지를 찾을 수 없습니다.</div>;
  }

  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col flex-1 border-l-2 px-20 py-10">
          <h1 className="font-pretendard-extrabold text-6xl mb-9">
            {metadata.title ?? '제목 없음'}
          </h1>
          <MDXRemote
            source={metadata.content}
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
          <Comments />
        </div>
      </div>
    </>
  );
}

// 가능한 모든 경로 생성 (정적 생성용)
export async function generateStaticParams() {
  const { getAllSlugs } = await import('@/lib/mdxParsing');
  const slugs = getAllSlugs();
  
  return slugs.map(slug => ({
    slug: slug.split('/')
  }));
}