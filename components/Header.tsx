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

const Header = () => {
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
    <div className="w-full h-16  border-b border-gray-700 px-7 py-10  flex items-center justify-between text-black dark:text-white dark:border-gray-400">
      <div className="flex w-100 gap-8 items-center">
        <div className="flex items-center">
          <img
            className="size-14 p-0 m-0"
            src={theme === 'light' ? blackLogo.src : whiteLogo.src}
            alt="logo"
          />
          <h3 className="text-2xl text-gray-700 font-pretendard-bold cursor-pointer dark:text-white">
            Into the Math
          </h3>
        </div>
        <button className="border-1 px-5 py-3 w-40 flex justify-start items-center border-gray-600 dark:border-gray-400 rounded-lg cursor-pointer dark:hover:border-gray-200 ">
          <FontAwesomeIcon className="text-gray-400" icon={faMagnifyingGlass} />
          <span className="mx-3 text-gray-400">검색</span>
        </button>
      </div>

      <div className="flex font-pretendard text-lg gap-7">
        <button
          className="text-slate-800 dark:text-slate-300 cursor-pointer dark:hover:text-white"
          onClick={() => {
            router.push('/');
          }}
        >
          홈
        </button>

        <button className="cursor-pointer">
          <img
            src={translate.src}
            alt="translate"
            className="size-7"
            onClick={() => {}}
          />
        </button>

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

        <button className="text-slate-300 cursor-pointer hover:text-white">
          <img
            src={githubBlack.src}
            alt="github"
            className="size-7 dark:bg-white dark:rounded-full"
            onClick={() => {
              router.push('https://github.com/kangdy25/Into-the-Math');
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default Header;
