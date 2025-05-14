// components/ui/SidebarWrapper.tsx
import { getAllMdxMetadata } from '@/lib/mdxParsing';
import subjects from '@/constants/subject';
import ClientSidebar from './ClientSidebar';
import { translateNames } from '@/constants/translateNames';

interface SidebarWrapperProps {
  locale: 'en' | 'ko';
  category: string;
  isMobile?: boolean;
  isSidebarOpen?: boolean;
}

export default function SidebarWrapper({
  locale,
  category,
  isMobile,
  isSidebarOpen,
}: SidebarWrapperProps) {
  // 서버 컴포넌트에서 데이터 가져오기
  const { categories, displayNameMap } = getAllMdxMetadata(locale);

  // 현재 카테고리에 해당하는 과목 찾기
  const currentSubject = subjects.find((subject) => subject.slug === category);

  // 현재 카테고리에 속하는 것만 필터링
  const filteredCategories = Object.entries(categories)
    .filter(([key]) => key.startsWith(category))
    .sort(([a], [b]) => a.localeCompare(b, 'ko', { numeric: true }));

  // 데이터를 클라이언트 컴포넌트로 전달
  return (
    <ClientSidebar
      locale={locale}
      category={category}
      currentSubject={currentSubject}
      filteredCategories={filteredCategories}
      translateNames={translateNames}
      displayNameMap={displayNameMap}
      isMobile={isMobile}
      isSidebarOpen={isSidebarOpen}
    />
  );
}
