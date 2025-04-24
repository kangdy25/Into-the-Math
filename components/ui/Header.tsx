'use client';

import { useState, useEffect } from 'react';
import {
  githubBlack,
  blackLogo,
  whiteLogo,
  translate,
} from '@/constants/icons';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { sun, moon } from '@/constants/icons';
import { Menu, X } from 'lucide-react'; // lucide-react 아이콘 사용

interface HeaderProps {
  isMobile?: boolean;
  isSidebarOpen?: boolean;
  toggleSidebar?: () => void;
}

const Header = ({ isMobile, isSidebarOpen, toggleSidebar }: HeaderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  // 헤더에서 사용할 다크모드 구현
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);
    document.documentElement.classList.add(storedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newTheme);
  };

  // 언어 전환 함수
  const toggleLanguage = () => {
    // 현재 locale이 'en'이면 'ko'로, 'ko'면 'en'으로 전환
    const newLocale = locale === 'en' ? 'ko' : 'en';

    // 로컬 스토리지에 선택한 언어 저장
    localStorage.setItem('language', newLocale);

    // 현재 경로에서 locale 부분만 변경하여 새 URL로 이동
    // URL 구조가 /[locale]/[...rest] 형태인 경우 적용
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    const newPath = `/${newLocale}${pathWithoutLocale || ''}`;

    router.push(newPath);
  };

  return (
    <div className="fixed top-0 left-0 bg-white dark:bg-black z-10 w-full h-16 border-b border-gray-700 px-7 py-10 flex items-center justify-between text-black dark:text-white dark:border-gray-400">
      <div className="flex gap-1 sm:gap-4 items-center">
        {/* 햄버거 버튼 - 모바일에서만 표시 */}
        {isMobile && toggleSidebar && (
          <button
            onClick={toggleSidebar}
            className=" rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label={isSidebarOpen ? '사이드바 닫기' : '사이드바 열기'}
          >
            {isSidebarOpen ? (
              <X size={24} className="text-gray-700 dark:text-gray-300" />
            ) : (
              <Menu size={24} className="text-gray-700 dark:text-gray-300" />
            )}
          </button>
        )}
        {/* Logo */}
        <div className="flex items-center">
          <img
            className="size-12 sm:size-14 p-0 m-0"
            src={theme === 'light' ? blackLogo.src : whiteLogo.src}
            alt="logo"
          />
          <h3
            className="text-xl sm:text-2xl text-gray-700 font-pretendard-bold cursor-pointer dark:text-white"
            onClick={() => {
              router.push('/');
            }}
          >
            Into the Math
          </h3>
        </div>
      </div>

      {/* 홈 버튼 */}
      <div className="flex font-pretendard text-lg gap-4 sm:gap-7 ">
        {/* 번역 버튼 */}
        <div className="relative group">
          <button
            className="cursor-pointer w-full"
            onClick={toggleLanguage}
            aria-label={locale === 'en' ? '한국어로 전환' : 'Switch to English'}
          >
            <img src={translate.src} alt="translate" className="size-7" />
          </button>
          <span className="absolute w-auto min-w-max left-1/2 -translate-x-1/2 top-full mt-2 hidden group-hover:block rounded bg-gray-800 text-white text-xs px-2 py-1 z-20">
            {locale === 'en' ? '한국어로 전환' : 'Switch to English'}
          </span>
        </div>

        {/* 다크모드 버튼 */}
        <div className="relative group">
          <button
            onClick={toggleTheme}
            className="text-xl w-full rounded-full cursor-pointer dark:bg-gray-800 transition"
          >
            {theme === 'light' ? (
              <img className="size-7" src={moon.src} alt="Moon" />
            ) : (
              <img className="size-7" src={sun.src} alt="Sun" />
            )}
          </button>
          <span className="absolute w-auto min-w-max left-1/2 -translate-x-1/2 top-full mt-2 hidden group-hover:block rounded bg-gray-800 text-white text-xs px-2 py-1 z-20">
            {locale === 'en'
              ? theme === 'light'
                ? 'Dark Mode'
                : 'Light Mode'
              : theme === 'light'
              ? '다크 모드'
              : '라이트 모드'}
          </span>
        </div>

        {/* Github 버튼 */}
        <div className="relative hidden sm:block group">
          <button className="text-slate-300 w-full cursor-pointer hover:text-white">
            <img
              src={githubBlack.src}
              alt="github"
              className="size-7 dark:bg-white dark:rounded-full"
              onClick={() => {
                window.open('https://github.com/kangdy25/Into-the-Math');
              }}
            />
          </button>
          <span className="absolute w-auto min-w-max left-1/2 -translate-x-1/2 top-full mt-2 hidden group-hover:block rounded bg-gray-800 text-white text-xs px-2 py-1 z-20">
            {locale === 'en' ? 'Visit to Github' : 'Github 방문하기'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
