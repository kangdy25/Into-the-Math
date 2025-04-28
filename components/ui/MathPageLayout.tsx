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
import TOC from './TOC';

interface MathPageLayoutProps {
  metadata: {
    title?: string;
    content: string;
  } | null;
  locale: 'en' | 'ko';
  category: string;
  headings: {
    id: string;
    text: string;
    depth: number;
  }[];
}

export default function MathPageLayout({
  locale,
  metadata,
  category,
  headings,
}: MathPageLayoutProps) {
  if (!metadata) {
    return <div>페이지를 찾을 수 없습니다.</div>;
  }

  return (
    <ClientLayout>
      <Header />
      <SidebarWrapper locale={locale} category={category} />
      <div className="flex flex-1 relative top-[81px] xl:ml-[350px] justify-center">
        <div className="max-w-[1000px] w-full px-6 md:px-16 py-10">
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
        {/* TOC 사이드바 */}
        <aside className="hidden lg:block w-[350px] sticky top-[100px] h-screen overflow-auto px-4">
          <TOC headings={headings} />
        </aside>
      </div>
    </ClientLayout>
  );
}
