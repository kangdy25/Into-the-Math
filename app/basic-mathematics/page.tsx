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
import Comments from '@/components/Comments';

export default async function Page() {
  // index.mdx 로드
  const metadata = getMdxMetadata('index');
  
  if (!metadata) {
    return <div>소개 페이지를 찾을 수 없습니다.</div>;
  }

  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col flex-1 border-l-2 px-20 py-10">
          <h1 className="font-pretendard-extrabold text-6xl mb-9">
            {metadata.title ?? '기초수학 소개'}
          </h1>
          <MDXRemote
            source={metadata.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkMdxFrontmatter, remarkGfm, remarkMath],
                rehypePlugins: [
                  rehypeKatex,
                  [
                    rehypePrettyCode,
                    {
                      theme: 'one-dark-pro',
                      emptyStyle: false,
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