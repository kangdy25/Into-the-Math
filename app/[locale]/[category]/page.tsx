import { getMdxMetadata, getHeadingsFromContent } from '@/lib/mdxParsing';
import { getSubjectBySlug } from '@/constants/subject';
import MathPageLayout from '@/components/ui/layout/MathPageLayout';

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
  const metadata = getMdxMetadata(locale, `${category}/index`);
  if (!metadata) {
    return <div>페이지를 찾을 수 없습니다.</div>;
  }

  // metadata.content 확인
  if (!metadata.content) {
    console.log('콘텐츠가 비어있습니다');
    return <div>페이지 콘텐츠를 불러오는데 실패했습니다.</div>;
  }

  let headings = await getHeadingsFromContent(metadata.content);

  return (
    <MathPageLayout
      locale={locale}
      metadata={metadata}
      category={category}
      headings={headings}
    />
  );
}
