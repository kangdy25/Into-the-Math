'use client';

import React, { useState, useEffect, ReactElement } from 'react';

// 레이아웃 자식 컴포넌트에 전달할 props 타입 정의
export interface LayoutChildProps {
  isMobile: boolean;
  isSidebarOpen: boolean;
  toggleSidebar?: () => void;
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth <= 1280;
      setIsMobile(mobile);
      // 모바일 화면일 때 사이드바 자동으로 닫기
      setIsSidebarOpen(!mobile);
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
    headerWithProps = React.cloneElement(
      firstChild as ReactElement<Partial<LayoutChildProps>>,
      {
        isMobile,
        isSidebarOpen,
        toggleSidebar,
      },
    );
  }

  // 나머지 컴포넌트들에게도 필요한 props 전달
  const contentWithProps = React.Children.map(
    childrenArray.slice(1),
    (child) => {
      if (React.isValidElement(child) && typeof child.type !== 'string') {
        return React.cloneElement(
          child as ReactElement<Partial<LayoutChildProps>>,
          {
            isMobile,
            isSidebarOpen,
          },
        );
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
