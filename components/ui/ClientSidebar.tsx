'use client';

import Link from 'next/link';
import { useEffect } from 'react';

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
  // 모바일에서 사이드바 열리면 배경 스크롤 막기
  useEffect(() => {
    if (isMobile && isSidebarOpen) {
      document.body.style.overflow = 'hidden'; // 배경 스크롤 비활성화
    } else {
      document.body.style.overflow = ''; // 배경 스크롤 복구
    }

    // 컴포넌트 언마운트 시 정리
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobile, isSidebarOpen]);

  return (
    <>
      {/* 사이드바 */}
      <aside
        style={{
          scrollbarColor: ' #777 #333 ',
          scrollbarWidth: 'thin',
        }}
        className={`sidebar fixed top-[81px] h-[calc(100vh-81px)] border-r-2 w-full sm:w-[350px] pl-12 transition-all duration-300 ease-in-out overflow-y-auto ${
          isMobile
            ? `left-0 bottom-0 z-40 bg-white dark:bg-black ${
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
              } `
            : ''
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
            const categoryName =
              displayNameMap[categoryKey]?.split('/').pop() ??
              categoryKey.split('/').pop();

            return (
              <li key={categoryKey}>
                <h3 className="font-pretendard-medium text-xl my-5 pl-2 pt-3 dark:text-slate-300">
                  {categoryName}
                </h3>
                <ul>
                  {pages.map(({ slug, title }) => (
                    <li
                      key={slug}
                      className="flex justify-between font-pretendard-light py-2 pl-6 border-l-2 my-0.5 hover:text-indigo-400 hover:border-indigo-400"
                    >
                      <Link href={`/${slug}`}>{title}</Link>
                      <span className="mr-6">&gt;</span>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* 모바일 오버레이 */}
      {isMobile && isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 top-[81px] opacity-70" />
      )}
    </>
  );
}
