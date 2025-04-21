'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getAllMdxMetadata } from '@/lib/mdxParsing';
import subjects from '@/constants/subject';
import { Menu, X } from 'lucide-react'; // 아이콘을 위해 lucide-react 사용

export default function Sidebar({ category }: { category: string }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { categories, displayNameMap } = getAllMdxMetadata();

  // 현재 카테고리에 해당하는 과목 찾기
  const currentSubject = subjects.find((subject) => subject.slug === category);

  // 현재 카테고리에 속하는 것만 필터링
  const filteredCategories = Object.entries(categories)
    .filter(([key]) => key.startsWith(category))
    .sort(([a], [b]) => a.localeCompare(b, 'ko', { numeric: true }));

  // 화면 크기 감지
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 1400);
      setIsOpen(window.innerWidth > 1400);
    };

    // 초기 로딩 시 체크
    checkScreenSize();

    // 화면 크기가 변경될 때마다 체크
    window.addEventListener('resize', checkScreenSize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // 사이드바 토글 함수
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* 햄버거 메뉴 버튼 (모바일에서만 표시) */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-6 left-6 z-50 bg-white dark:bg-gray-800 p-2 rounded-md shadow-md"
          aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* 사이드바 - 모바일에서는 isOpen 상태에 따라 표시/숨김 */}
      <aside
        className={`sidebar border-r-2 w-[350px] pl-16 transition-all duration-300 ease-in-out ${
          isMobile
            ? `top-0 left-0 bottom-0 z-40 bg-white dark:bg-gray-900 ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
              }`
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
                        <Link
                          href={`/${slug}`}
                          onClick={() => isMobile && setIsOpen(false)}
                        >
                          {title}
                        </Link>
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
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
