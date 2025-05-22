import ClientSidebar from './ClientSidebar';
import { getAllMdxMetadata } from '@/lib/mdxParsing';
import subjects from '@/constants/subject';
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
  const { categories, displayNameMap } = getAllMdxMetadata(locale);

  // 현재 카테고리에 해당하는 과목 찾기
  const currentSubject = subjects.find((subject) => subject.slug === category);

  // 현재 카테고리에 속하는 것만 필터링
  const filteredCategories = Object.entries(categories)
    .filter(([key]) => key.startsWith(category))
    .sort(([a], [b]) => a.localeCompare(b, 'ko', { numeric: true }));

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
