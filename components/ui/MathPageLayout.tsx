import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import Header from '@/components/ui/Header';
import SidebarWrapper from '@/components/ui/SidebarWrapper';
import { useMDXComponents } from '@/mdx-components';
import Comments from '@/components/posts/Comments';
import ClientLayout from './ClientLayout';

interface MathPageLayoutProps {
  metadata: {
    title?: string;
    content: string;
  } | null;
  category: string;
}

export default function MathPageLayout({
  metadata,
  category,
}: MathPageLayoutProps) {
  if (!metadata) {
    return <div>페이지를 찾을 수 없습니다.</div>;
  }

  return (
    <ClientLayout>
      <Header />
      <SidebarWrapper category={category} />
      <div className="flex flex-1 relative top-[81px] xl:ml-[350px] items-center flex-col">
        <div className="max-w-[1000px] w-full px-6 md:px-20 py-10">
          <h1 className="font-pretendard-extrabold mt-8 mb-16 text-center text-6xl ">
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
    </ClientLayout>
  );
}
