'use client';

import React, { useEffect, useRef, useState } from 'react';

const Comments = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // 다크모드 상태 확인 함수
  const checkDarkMode = (): boolean => {
    return document.documentElement.classList.contains('dark');
  };

  // 현재 다크모드 상태 감지
  useEffect(() => {
    // 초기 다크모드 상태 설정
    setIsDarkMode(checkDarkMode());

    // 다크모드 변경 감지
    const observer = new MutationObserver(() => {
      setIsDarkMode(checkDarkMode());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  // utterances 로드
  useEffect(() => {
    if (!ref.current) return;
    
    // 기존 댓글 제거 (utterances의 테마는 동적으로 변경 불가능)
    ref.current.innerHTML = '';
    
    // 새 스크립트 생성
    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.async = true;
    script.setAttribute('repo', 'kangdy25/Into-the-Math');
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('theme', isDarkMode ? 'github-dark' : 'github-light');
    script.setAttribute('label', 'blog-comment');
    
    ref.current.appendChild(script);
  }, [isDarkMode]);

  return <div ref={ref} />;
};

export default Comments;