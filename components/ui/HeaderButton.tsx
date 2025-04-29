import React from 'react';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Github, Languages, Moon, Sun } from 'lucide-react'; // lucide-react 아이콘 사용

const HeaderButton = ({ theme, setTheme }: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

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
    <div>
      {/* 홈 버튼 */}
      <div className="flex font-pretendard text-lg gap-4 sm:gap-7 ">
        {/* 번역 버튼 */}
        <div className="relative group">
          <button
            className="cursor-pointer w-full"
            onClick={toggleLanguage}
            aria-label={locale === 'en' ? '한국어로 전환' : 'Switch to English'}
          >
            <Languages />
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
            {theme === 'light' ? <Moon /> : <Sun />}
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
          <button className="w-full cursor-pointer">
            <Github
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

export default HeaderButton;
