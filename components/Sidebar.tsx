import Link from 'next/link';
import { getAllMdxMetadata } from '@/lib/mdxParsing';

export default function Sidebar() {
  const categories = getAllMdxMetadata();

  return (
    <aside className="sidebar h-full w-[350px] pl-16">
      <Link href={'/basic-mathematics'}>
        <h2 className="font-pretendard-bold text-xl leading-[1.5] text-center mt-8 pb-8 whitespace-pre-line hover:text-gray-400 border-b-2">
          기초수학<br/>(Basic Mathematics)
        </h2>
      </Link>
      <ul>
        {Object.entries(categories)
          .sort(([a], [b]) => a.localeCompare(b, 'ko', { numeric: true }))
          .map(([category, pages]) => (
            <li key={category}>
              <h3 className="font-pretendard-medium text-xl my-5 pl-2 pt-3 dark:text-slate-300">{category}</h3>
              <ul>
                {pages.map(({ slug, title }) => (
                  <li
                    key={slug}
                    className="flex justify-between font-pretendard-light py-2 pl-6 border-l-2 my-0.5 hover:text-indigo-400 hover:border-indigo-400"
                  >
                    <Link href={`/basic-mathematics/${slug}`}>{title}</Link>
                    <span className="mr-6">&gt;</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
      </ul>
    </aside>
  );
}
