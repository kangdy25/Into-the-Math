'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { StaticImageData } from 'next/image';

interface PageMeta {
  slug: string;
  title: string;
}

interface Subject {
  name: string;
  eng: string;
  path: string;
  slug: string;
  icon: StaticImageData;
  descriptionKo: string;
  descriptionEng: string;
}

interface ClientSidebarProps {
  locale: 'en' | 'ko';
  category: string;
  currentSubject?: Subject;
  filteredCategories: [string, PageMeta[]][];
  displayNameMap: Record<string, string>;
  translateNames: Record<string, { en: string; ko: string }>;
  isMobile?: boolean;
  isSidebarOpen?: boolean;
}

// 모바일에서 사이드바 열리면 배경 스크롤 막기
function useBodyScrollLock(lock: boolean) {
  useEffect(() => {
    document.body.style.overflow = lock ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [lock]);
}

export default function ClientSidebar({
  locale,
  category,
  currentSubject,
  filteredCategories,
  displayNameMap,
  translateNames,
  isMobile = false,
  isSidebarOpen = true,
}: ClientSidebarProps) {
  const shouldLockScroll = isMobile && isSidebarOpen;
  useBodyScrollLock(shouldLockScroll);

  const getTranslatedCategoryName = (key: string) => {
    const fallback =
      key
        .split('/')
        .pop()
        ?.replace(/\.mdx$/, '') ?? '';
    const displayName = displayNameMap[key]?.split('/').pop() ?? fallback;
    return translateNames[displayName]?.[locale] ?? displayName;
  };

  return (
    <>
      <aside
        style={{
          scrollbarColor: ' #777 #333 ',
          scrollbarWidth: 'thin',
        }}
        className={`sidebar fixed top-[81px] h-[calc(100vh-81px)] border-r-2 w-full sm:w-[350px] pl-12 transition-all duration-300 ease-in-out overflow-y-auto ${
          isMobile
            ? `left-0 bottom-0 z-40 bg-white dark:bg-black ${
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
              }`
            : ''
        }`}
      >
        <Link href={`/${category}`}>
          <div className="flex flex-col justify-center items-center gap-2 font-pretendard-bold border-b-2 py-8 mt-2 hover:text-indigo-300">
            <h2 className={`${locale === 'en' ? 'text-2xl' : 'text-3xl'}`}>
              {locale === 'en' ? currentSubject?.eng : currentSubject?.name}
            </h2>
            <span
              className={`text-lg ${locale === 'en' ? 'hidden ' : 'block'}`}
            >
              ({currentSubject?.eng})
            </span>
          </div>
        </Link>

        <ul>
          {filteredCategories.map(([categoryKey, pages]) => (
            <li key={categoryKey}>
              <h3 className="font-pretendard-medium text-xl my-5 pl-2 pt-3 dark:text-slate-300">
                {getTranslatedCategoryName(categoryKey)}
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
          ))}
        </ul>
      </aside>

      {isMobile && isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 top-[81px] opacity-70" />
      )}
    </>
  );
}
