'use client';

import { useEffect, useState } from 'react';
import { Heading } from '@/lib/mdxParsing';
import Link from 'next/link';
import TOCButton from './TOCButton';

type TOCProps = {
  headings: Heading[];
};

export default function TOC({ headings }: TOCProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const offsets = headings.map((heading) => {
        const el = document.getElementById(heading.id);
        if (!el) return { id: heading.id, top: Infinity };
        return { id: heading.id, top: el.getBoundingClientRect().top };
      });

      // 화면 최상단과 가장 가까운 heading 찾기
      const active = offsets
        .filter((o) => o.top <= 100) // 100px 위에 있는 것들 중
        .sort((a, b) => b.top - a.top)[0]; // 가장 가까운 거

      if (active) {
        setActiveId(active.id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 초기화

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headings]);

  // 링크 클릭 시 스크롤 처리를 위한 함수
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // 요소의 위치 계산
      const yOffset = -80; // 헤더 높이 + 여유 공간에 따라 조정
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      // 스크롤 적용
      window.scrollTo({
        top: y,
        behavior: 'smooth',
      });

      // URL 해시 업데이트
      window.history.pushState(null, '', `#${id}`);

      // 활성 ID 업데이트
      setActiveId(id);
    }
  };

  return (
    <div className="flex flex-col relative mt-10">
      <nav className="sticky top-16 p-4 border-l-2 dark:border-l dark:border-slate-800">
        <p className="text-lg font-pretendard-bold mb-4">On this page</p>
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={`${
                heading.depth === 1 ? '' : 'ml-4'
              } transition-all duration-200`}
            >
              <Link
                href={`#${heading.id}`}
                onClick={(e) => handleLinkClick(e, heading.id)}
                className={`text-sm font-pretendard-light hover:text-indigo-400 cursor-pointer ${
                  activeId === heading.id
                    ? 'text-indigo-400 font-bold'
                    : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                {heading.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <TOCButton />
    </div>
  );
}
