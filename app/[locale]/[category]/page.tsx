import { getSubjectBySlug } from '@/constants/subject';
import MathPageLayout from '@/components/ui/layout/MathPageLayout';
import getHeadingsFromContent from '@/lib/getHeadings';
import { getMdxPageData } from '@/lib/metadata';

export default async function Page({
  params,
}: {
  params: Promise<{ locale: 'en' | 'ko'; category: string }>;
}) {
  const { locale, category } = await params;

  // 카테고리 검증
  const subjectInfo = getSubjectBySlug(category);
  if (!subjectInfo) {
    return <div>존재하지 않는 카테고리입니다.</div>;
  }

  // index.mdx 로드
  const pageData = getMdxPageData(locale, `${category}/index`);

  if (!pageData) {
    return <div>페이지를 찾을 수 없습니다.</div>;
  }

  if (!pageData.content) {
    return <div>페이지 내용이 없습니다.</div>;
  }

  let headings = await getHeadingsFromContent(pageData.content);

  return (
    <MathPageLayout
      locale={locale}
      pageData={pageData}
      category={category}
      headings={headings}
    />
  );
}
