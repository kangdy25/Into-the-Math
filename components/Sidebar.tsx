import Link from 'next/link';
import { getAllMdxMetadata } from '@/lib/mdxParsing';

export default function Sidebar() {
  const { categories, displayNameMap } = getAllMdxMetadata();

  return (
    <aside className="sidebar h-full w-[350px] pl-16">
      <Link href={'/basic-mathematics'}>
        <div className='flex flex-col justify-center items-center gap-2 font-pretendard-bold border-b-2 py-8 mt-2 hover:text-indigo-300'>
        <h2 className=" text-2xl">
          기초수학
        </h2>
        <span className='text-lg'>(Basic Mathematics)</span>
        </div>
      </Link>
      <ul>
        {Object.entries(categories)
          .sort(([a], [b]) => a.localeCompare(b, 'ko', { numeric: true }))
          .map(([category, pages]) => (
            <li key={category}>
              {/* 카테고리 이름에 displayNameMap 적용 */}
              <h3 className="font-pretendard-medium text-xl my-5 pl-2 pt-3 dark:text-slate-300">
                {displayNameMap[category] || category}
              </h3>
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