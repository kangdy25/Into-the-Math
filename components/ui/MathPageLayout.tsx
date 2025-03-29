import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import Header from '@/components/ui/Header';
import Sidebar from '@/components/ui/Sidebar';
import { useMDXComponents } from '@/mdx-components';
import Comments from "@/components/posts/Comments";

interface MathPageLayoutProps {
  metadata: {
    title?: string;
    content: string;
  } | null
  category: string;
}

export default function MathPageLayout({ 
  metadata, 
  category 
}: MathPageLayoutProps) {
  if (!metadata) {
    return <div>페이지를 찾을 수 없습니다.</div>;
  }

  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar category={category} />
        <div className="flex flex-1 items-center flex-col">
        <div className="w-[1000px] px-20 py-10">
          <h1 className="font-pretendard-extrabold text-6xl mb-9">
            {metadata.title ?? '제목 없음'}
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
      </div>
    </>
  );
}