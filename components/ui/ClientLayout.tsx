'use client';

import React, { useState, useEffect } from 'react';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth <= 1400;
      setIsMobile(mobile);

      // 모바일 화면일 때 사이드바 자동으로 닫기
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // 사이드바 토글 함수
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const childrenArray = React.Children.toArray(children);

  // 첫 번째 자식이 유효한 React 요소인지 확인
  const firstChild = childrenArray[0];
  let headerWithProps = firstChild;

  if (React.isValidElement(firstChild) && typeof firstChild.type !== 'string') {
    // 사용자 정의 컴포넌트인 경우에만 props 전달
    headerWithProps = React.cloneElement(firstChild, {
      isMobile,
      isSidebarOpen,
      toggleSidebar,
    } as any);
  }

  // 나머지 컴포넌트들에게도 필요한 props 전달
  const contentWithProps = React.Children.map(
    childrenArray.slice(1),
    (child) => {
      if (React.isValidElement(child) && typeof child.type !== 'string') {
        // 사용자 정의 컴포넌트인 경우에만 props 전달
        return React.cloneElement(child, {
          isMobile,
          isSidebarOpen,
        } as any);
      }
      return child; // DOM 요소는 그대로 반환
    },
  );

  return (
    <>
      {headerWithProps}
      <div className="flex">{contentWithProps}</div>
    </>
  );
}
