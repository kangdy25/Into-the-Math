'use client';

import Link from 'next/link';

interface ClientSidebarProps {
  category: string;
  currentSubject: any;
  filteredCategories: [string, any[]][];
  displayNameMap: Record<string, string>;
  isMobile?: boolean;
  isSidebarOpen?: boolean;
}

export default function ClientSidebar({
  category,
  currentSubject,
  filteredCategories,
  displayNameMap,
  isMobile = false,
  isSidebarOpen = true,
}: ClientSidebarProps) {
  return (
    <>
      {/* 사이드바 - 모바일에서는 isSidebarOpen 상태에 따라 표시/숨김 */}
      <aside
        className={`sidebar fixed top-[81px] z-10 h-full border-r-2 w-full sm:w-[350px] pl-12 transition-all duration-300 ease-in-out ${
          isMobile
            ? `fixed left-0 bottom-0 z-40 bg-white dark:bg-black ${
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
              } `
            : ' '
        }`}
      >
        <Link href={`/${category}`}>
          <div className="flex flex-col justify-center items-center gap-2 font-pretendard-bold border-b-2 py-8 mt-2 hover:text-indigo-300">
            <h2 className="text-2xl">{currentSubject?.name}</h2>
            <span className="text-lg">({currentSubject?.eng})</span>
          </div>
        </Link>
        <ul>
          {filteredCategories.map(([categoryKey, pages]) => {
            // 카테고리명에서 마지막 부분만 추출
            const categoryName =
              displayNameMap[categoryKey]?.split('/').pop() ??
              categoryKey.split('/').pop();

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
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* 모바일에서 사이드바가 열렸을 때 배경 오버레이 */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 top-[81px] opacity-70"
          onClick={() => {
            // 클릭 이벤트 무시 (상위 컴포넌트에서 처리)
          }}
        />
      )}
    </>
  );
}
