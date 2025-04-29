'use client';

import { useState, useEffect } from 'react';
import { blackLogo, whiteLogo } from '@/constants/icons';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react'; // lucide-react 아이콘 사용
import HeaderButton from './HeaderButton';

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
      <HeaderButton theme={theme} setTheme={setTheme} />
    </div>
  );
};

export default Header;
