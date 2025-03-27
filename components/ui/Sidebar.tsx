import Link from 'next/link';
import { getAllMdxMetadata } from '@/lib/mdxParsing';
import subjects from '@/constants/subject';

export default function Sidebar({ category }: { category: string }) {
  const { categories, displayNameMap } = getAllMdxMetadata();

  // 현재 카테고리에 해당하는 과목 찾기
  const currentSubject: any = subjects.find(subject => subject.slug === category);

  // 현재 카테고리에 속하는 것만 필터링
  const filteredCategories = Object.entries(categories)
    .filter(([key]) => key.startsWith(category)) // category가 포함된 항목만 가져옴
    .sort(([a], [b]) => a.localeCompare(b, 'ko', { numeric: true }));

  return (
    <aside className="sidebar h-full w-[350px] pl-16">
      <Link href={`/${category}`}>
        <div className='flex flex-col justify-center items-center gap-2 font-pretendard-bold border-b-2 py-8 mt-2 hover:text-indigo-300'>
          <h2 className="text-2xl">{currentSubject?.name}</h2>
          <span className='text-lg'>({currentSubject?.eng})</span>
        </div>
      </Link>
      <ul>
        {filteredCategories.map(([categoryKey, pages]) => {
          // 카테고리명에서 마지막 부분(01. Introduction)만 추출
          const categoryName = displayNameMap[categoryKey]?.split('/').pop() ?? categoryKey.split('/').pop();

          return (
          <li key={categoryKey}>
            <h3 className="font-pretendard-medium text-xl my-5 pl-2 pt-3 dark:text-slate-300">
              {categoryName}
            </h3>
            <ul>
              {pages.map(({ slug, title }) => {
                
                return (
                <li
                  key={slug}
                  className="flex justify-between font-pretendard-light py-2 pl-6 border-l-2 my-0.5 hover:text-indigo-400 hover:border-indigo-400"
                >
                  <Link href={`/${slug}`}>{title}</Link>
                  <span className="mr-6">&gt;</span>
                </li>
              )}
              )}
            </ul>
          </li>
        )})}
      </ul>
    </aside>
  );
}
