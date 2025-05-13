'use client';

import React, { useEffect, useRef, useState } from 'react';

// 다크모드 커스텀 훅
const useDarkMode = (): boolean => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const isDark = () => document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark());

    // 다크모드 클래스 변경을 감지
    const observer = new MutationObserver(() => {
      setIsDarkMode(isDark());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return isDarkMode;
};

// Utterances 댓글 컴포넌트
const Comments = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isDarkMode = useDarkMode();

  // Utterances 스크립트를 동적으로 삽입
  const loadUtterances = () => {
    if (!ref.current) return;

    // 안전하게 기존 노드 제거
    while (ref.current.firstChild) {
      ref.current.removeChild(ref.current.firstChild);
    }

    // Utterances 스크립트 생성
    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.async = true;
    script.setAttribute('repo', 'kangdy25/Into-the-Math');
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('theme', isDarkMode ? 'github-dark' : 'github-light');
    script.setAttribute('label', 'blog-comment');
    script.crossOrigin = 'anonymous';

    ref.current.appendChild(script);
  };

  // DOM이 안정된 후에 실행되도록 setTimeout 사용
  // 한 프레임 뒤로 미뤄서 안전하게 DOM 접근
  useEffect(() => {
    const timeout = setTimeout(() => {
      loadUtterances();
    }, 0);

    return () => clearTimeout(timeout);
  }, [isDarkMode]);

  return <div ref={ref} />;
};

export default Comments;
