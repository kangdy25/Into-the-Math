// "Header.tsx"
'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import {
  githubBlack,
  blackLogo,
  whiteLogo,
  translate,
} from '@/constants/icons';
import { useRouter } from 'next/navigation';
import { sun, moon } from '@/constants/icons';
import { Menu, X } from 'lucide-react'; // lucide-react 아이콘 사용

interface HeaderProps {
  isMobile?: boolean;
  isSidebarOpen?: boolean;
  toggleSidebar?: () => void;
}

const Header = ({ isMobile, isSidebarOpen, toggleSidebar }: HeaderProps) => {
  const router = useRouter();

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

  return (
    <div className="fixed top-0 left-0 bg-white dark:bg-black z-10 w-full h-16 border-b border-gray-700 px-7 py-10 flex items-center justify-between text-black dark:text-white dark:border-gray-400">
      <div className="flex gap-4 items-center">
        {/* 햄버거 버튼 - 모바일에서만 표시 */}
        {isMobile && toggleSidebar && (
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
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
            className="size-14 p-0 m-0"
            src={theme === 'light' ? blackLogo.src : whiteLogo.src}
            alt="logo"
          />
          <h3
            className="text-2xl text-gray-700 font-pretendard-bold cursor-pointer dark:text-white"
            onClick={() => {
              router.push('/');
            }}
          >
            Into the Math
          </h3>
        </div>

        {/* 검색 버튼 */}
        <button className="border-1 px-5 py-3 w-40 flex justify-start items-center border-gray-600 dark:border-gray-400 rounded-lg cursor-pointer dark:hover:border-gray-200">
          <FontAwesomeIcon className="text-gray-400" icon={faMagnifyingGlass} />
          <span className="mx-3 text-gray-400">검색</span>
        </button>
      </div>

      {/* 홈 버튼 */}
      <div className="flex font-pretendard text-lg gap-7">
        <button
          className="text-slate-800 dark:text-slate-300 cursor-pointer dark:hover:text-white"
          onClick={() => {
            router.push('/');
          }}
        >
          홈
        </button>

        {/* 번역 버튼 */}
        <button className="cursor-pointer">
          <img
            src={translate.src}
            alt="translate"
            className="size-7"
            onClick={() => {}}
          />
        </button>

        {/* 다크모드 버튼 */}
        <button
          onClick={toggleTheme}
          className="p-2 text-xl rounded-full cursor-pointer dark:bg-gray-800 transition"
        >
          {theme === 'light' ? (
            <img className="size-7" src={moon.src} alt="Moon" />
          ) : (
            <img className="size-7" src={sun.src} alt="Sun" />
          )}
        </button>

        {/* Github 버튼 */}
        <button className="text-slate-300 cursor-pointer hover:text-white">
          <img
            src={githubBlack.src}
            alt="github"
            className="size-7 dark:bg-white dark:rounded-full"
            onClick={() => {
              window.open('https://github.com/kangdy25/Into-the-Math');
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default Header;
