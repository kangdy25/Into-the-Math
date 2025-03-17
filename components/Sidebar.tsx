import Link from 'next/link';
import { getAllMdxMetadata } from '@/lib/mdxParsing';

export default function Sidebar() {
  const pages = getAllMdxMetadata();

  return (
    <aside className="sidebar h-screen w-[200px] border border-red-400">
      <h2 className="font-pretendard-bold">Basic Mathematics</h2>
      <ul>
        {pages.map(({ slug, title }) => (
          <li className="ml-5 py-3 pl-2 border-2" key={slug}>
            <Link href={`/basic-mathematics/${slug}`}>{title}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
