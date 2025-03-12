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

  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col flex-1 border-2 border-indigo-400 px-20 py-10">
          <Post />
        </div>
        {/* <TOC /> */}
      </div>
    </>
  );
}

export function generateStaticParams() {
  return [
    { slug: 'welcome' },
    { slug: 'hello' },
    { slug: 'introduction-discretemath' },
  ];
}

export const dynamicParams = false;
