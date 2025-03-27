'use client';

import React, { useEffect, useRef } from 'react';

const Comments = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || ref.current.children.length > 0) return; // 중복 삽입 방지

    const isDarkMode = document.documentElement.classList.contains('dark');
    const theme = isDarkMode ? 'github-dark' : 'github-light';

    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.async = true;
    script.setAttribute('repo', 'kangdy25/Into-the-Math');
    script.setAttribute('issue-term', 'title');
    script.setAttribute('theme', theme);
    script.setAttribute('label', 'blog-comment');

    ref.current.appendChild(script);

    // 다크 모드 변경 감지
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark');
      const newTheme = isDark ? 'github-dark' : 'github-light';

      const iframe = ref.current?.querySelector('iframe');
      if (iframe) {
        iframe.contentWindow?.postMessage(
          { type: 'set-theme', theme: newTheme },
          'https://utteranc.es'
        );
      }
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  return <div ref={ref}></div>;
};

export default Comments;
