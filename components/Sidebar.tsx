import Link from 'next/link';
import { getAllMdxMetadata } from '@/lib/mdxParsing';

export default function Sidebar() {
  const pages = getAllMdxMetadata();

  return (
    <aside className="sidebar h-full w-[300px] border-b">
      <Link href={'./'}>
      <h2 className="font-pretendard-bold text-2xl text-center my-8 whitespace-pre-line hover:text-gray-400"
      >기초수학<br/>(Basic Mathematics)</h2></Link>
      <ul>
        {pages.map(({ slug, title }) => (
          <li className="font-pretendard py-3 pl-4 border-2 border-b-0 my-0.5 hover:bg-gray-200 hover:dark:bg-gray-800 hover:dark:text-white hover:dark:border-1 hover:dark:border-gray-600" key={slug}>
            <Link href={`/basic-mathematics/${slug}`}>{title}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

