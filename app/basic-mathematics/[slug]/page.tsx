import Header from '@/components/Header';
import IKnow from '@/components/IKnow';
import Sidebar from '@/components/Sidebar';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { default: Post } = await import(
    `@/content/basic-mathematics/${slug}.mdx`
  );

  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col flex-1 border-2 border-indigo-400">
          <Post />

          <IKnow />
        </div>
        {/* <TOC /> */}
      </div>
    </>
  );
}

export function generateStaticParams() {
  return [{ slug: 'welcome' }, { slug: 'function' }];
}

export const dynamicParams = false;
