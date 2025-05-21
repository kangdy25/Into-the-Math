import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import Header from '@/components/ui/header/Header';
import SidebarWrapper from '@/components/ui/sidebar/SidebarWrapper';
import { useMDXComponents } from '@/mdx-components';
import Comments from '@/components/posts/Comments';
import ClientLayout from './ClientLayout';
import TOC from '../toc/TOC';

interface MathPageLayoutProps {
  pageData: {
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
  pageData,
  category,
  headings,
}: MathPageLayoutProps) {
  if (!pageData) {
    return <div>페이지를 찾을 수 없습니다.</div>;
  }

  return (
    <ClientLayout>
      <Header />
      <SidebarWrapper locale={locale} category={category} />
      <main className="flex flex-1 relative top-[81px] xl:ml-[350px] justify-center">
        <section className="max-w-[1000px] w-full px-6 md:px-16 py-10">
          <h1 className="font-pretendard-extrabold mt-8 mb-16 text-center text-5xl sm:text-6xl">
            {pageData.title ?? '제목 없음'}
          </h1>
          <MDXRemote
            source={pageData.content}
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
          <div id="comments">
            <Comments />
          </div>
        </section>
        <aside className="hidden lg:block w-[350px] sticky top-[100px] h-screen overflow-auto">
          <TOC headings={headings} />
        </aside>
      </main>
    </ClientLayout>
  );
}
